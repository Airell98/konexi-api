import {
  Controller,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  HttpException,
  HttpStatus,
  Post,
  HttpCode,
  UseInterceptors,
  UseGuards,
  Put,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../libs/decorators/current-user.decorator';
import { UserDocument } from '../users/schemas/user.schema';
import { AuthGuard } from '../auth/auth.guard';
import {
  CreatePostDto,
  CreatePostResponseDto,
  UpdatePostResponseDto,
} from './dtos/create-post.dto';
import {
  CreateCommentDto,
  CreateCommentResponseDto,
} from './dtos/create-comment.dto';
import { PostsService } from './posts.service';
import { PostOwnerGuard } from './post-owner.guard';

import { generateCommonApiResponse } from '../libs/http/helpers';
import { IsValidObjectId } from '../libs/decorators/is-valid-object-id.decorator';
import { ERROR_MESSAGES, API_PARAMS } from '../constants';
import { IsValidRequestBody } from '../libs/decorators/is-valid-request-body.decorator';
import {
  GetCommentsDto,
  GetCommentsResponseDto,
} from './dtos/get-comments.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetOnePostResponseDto } from './dtos/get-one-post.dto';
import { DeletePostResponseDto } from './dtos/delete-post.dto';
import { GiveLikeToPostResponseDto } from './dtos/give-like-to-post.dto';
import { IsValidRequestQuery } from '../libs/decorators/is-valid-request-query.decorator';
import { DeleteCommentResponseDto } from './dtos/delete-comment.dto';
import { UnlikePostResponseDto } from './dtos/unlike-post.dto';
import { SearchPostsDto, SearchPostsResponseDto } from './dtos/search-post.dto';
import { CurrentUserPostsDto } from './dtos/current-user-post.dto';
import { GetUserPostsDto } from './dtos/get-user-post.dto';

@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post('/current-user')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CurrentUserPostsDto,
    description: 'Request body to fetch posts of the current signed in user',
  })
  @ApiResponse({
    type: SearchPostsResponseDto,
    status: HttpStatus.OK,
  })
  async currentUserPosts(
    @IsValidRequestBody(CurrentUserPostsDto)
    currentUserPostsDto: CurrentUserPostsDto,
    @CurrentUser() user: Partial<UserDocument>,
  ) {
    const posts = await this.postService.getUserPosts(
      currentUserPostsDto.page,
      currentUserPostsDto.perPage,
      user._id.toString(),
    );

    return generateCommonApiResponse<typeof posts>({
      statusCode: HttpStatus.OK,
      message: 'Posts fetched successfully',
      data: posts,
    });
  }

  @Post('/user')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: GetUserPostsDto,
    description: 'Request body to fetch posts of a user',
  })
  @ApiResponse({
    type: SearchPostsResponseDto,
    status: HttpStatus.OK,
  })
  async getUserPosts(
    @IsValidRequestBody(GetUserPostsDto)
    getUserPostsDto: GetUserPostsDto,
  ) {
    const posts = await this.postService.getUserPosts(
      getUserPostsDto.page,
      getUserPostsDto.perPage,
      getUserPostsDto.userId,
    );

    return generateCommonApiResponse<typeof posts>({
      statusCode: HttpStatus.OK,
      message: 'Posts fetched successfully',
      data: posts,
    });
  }

  @Post('/search')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: SearchPostsDto,
    description: 'Request body to search posts',
  })
  @ApiResponse({
    type: SearchPostsResponseDto,
    status: HttpStatus.OK,
  })
  async searchPosts(
    @IsValidRequestBody(SearchPostsDto) searchPostsDto: SearchPostsDto,
  ) {
    const posts = await this.postService.searchPosts(
      searchPostsDto.page,
      searchPostsDto.perPage,
      searchPostsDto.keyword,
    );

    return generateCommonApiResponse<typeof posts>({
      statusCode: HttpStatus.OK,
      message: 'Posts fetched successfully',
      data: posts,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('imageFile'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Request body to create a new post',
    type: CreatePostDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreatePostResponseDto,
  })
  async createNewPost(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({ fileType: /.(jpg|jpeg|png)$/ }),
          //notes: maxSize represents byte unit
          new MaxFileSizeValidator({ maxSize: 1000000 * 10 }), // 10mb
        ],
        exceptionFactory: () => {
          throw new HttpException(
            ERROR_MESSAGES.INVALID_IMAGE_FILE,
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    )
    imageFile: Express.Multer.File,
    @IsValidRequestBody(CreatePostDto) createPostDto: CreatePostDto,
    @CurrentUser() user: Partial<UserDocument>,
  ) {
    const newPost = await this.postService.createNewPost(
      createPostDto,
      imageFile,
      user,
    );

    return generateCommonApiResponse<typeof newPost>({
      statusCode: HttpStatus.CREATED,
      message: 'Post created successfully',
      data: newPost,
    });
  }

  @Get(`/:${API_PARAMS.POST_ID}`)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetOnePostResponseDto,
  })
  @ApiParam({
    type: 'string',
    name: API_PARAMS.POST_ID,
    description: 'Id of the post we want to fetch',
  })
  async getOnePost(@IsValidObjectId(API_PARAMS.POST_ID) postId: string) {
    const post = await this.postService.getSinglePost(postId);

    return generateCommonApiResponse<typeof post>({
      statusCode: HttpStatus.OK,
      message: 'Post fetched successfully',
      data: post,
    });
  }

  @Delete(`/:${API_PARAMS.POST_ID}`)
  @UseGuards(PostOwnerGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: DeletePostResponseDto,
  })
  @ApiParam({
    type: 'string',
    name: 'postId',
    description: 'Id of the post we want to delete',
  })
  async deletePost(@IsValidObjectId(API_PARAMS.POST_ID) postId: string) {
    await this.postService.deletePost(postId);

    return generateCommonApiResponse({
      statusCode: HttpStatus.OK,
      message: 'Post deleted successfully',
      data: null,
    });
  }

  @Put(`/:${API_PARAMS.POST_ID}`)
  @UseGuards(PostOwnerGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePostDto,
    description: 'Request body to update the post',
  })
  @ApiParam({
    description: 'Id of the post we want to update',
    type: 'string',
    name: API_PARAMS.POST_ID,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdatePostResponseDto,
  })
  @UseInterceptors(FileInterceptor('imageFile'))
  async updatePost(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: /.(jpg|jpeg|png)$/ }),
          //notes: maxSize represents byte unit
          new MaxFileSizeValidator({ maxSize: 1000000 * 10 }), // 10mb
        ],
        exceptionFactory: () => {
          throw new HttpException(
            ERROR_MESSAGES.INVALID_IMAGE_FILE,
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    )
    imageFile: Express.Multer.File,
    @IsValidObjectId(API_PARAMS.POST_ID) postId: string,
    @IsValidRequestBody(CreatePostDto) createPostDto: CreatePostDto,
  ) {
    const updatedPost = await this.postService.updatePost(
      postId,
      createPostDto,
      imageFile,
    );

    return generateCommonApiResponse<typeof updatedPost>({
      statusCode: HttpStatus.OK,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  }

  @Patch(`/like/:${API_PARAMS.POST_ID}`)
  @ApiResponse({
    status: HttpStatus.OK,
    type: GiveLikeToPostResponseDto,
  })
  @ApiParam({
    type: 'string',
    name: API_PARAMS.POST_ID,
    description: 'Id of the post we want to like',
  })
  async giveLikeToPost(
    @IsValidObjectId(API_PARAMS.POST_ID) postId: string,
    @CurrentUser() user: Partial<UserDocument>,
  ) {
    const likedPost = await this.postService.giveLikeToPost(
      postId,
      user._id.toString(),
    );

    return generateCommonApiResponse<typeof likedPost>({
      statusCode: HttpStatus.OK,
      message: 'Post liked successfully',
      data: likedPost,
    });
  }

  @Patch(`/unlike/:${API_PARAMS.POST_ID}`)
  @ApiParam({
    name: API_PARAMS.POST_ID,
    type: 'string',
    description: 'Id of the post we want to unlike',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UnlikePostResponseDto,
  })
  async unlikePost(
    @IsValidObjectId(API_PARAMS.POST_ID) postId: string,
    @CurrentUser() user: Partial<UserDocument>,
  ) {
    const unlikedPost = await this.postService.unlikePost(
      postId,
      user._id.toString(),
    );

    return generateCommonApiResponse<typeof unlikedPost>({
      statusCode: HttpStatus.OK,
      message: 'Post unliked successfully',
      data: unlikedPost,
    });
  }

  @Delete(`/comments/:${API_PARAMS.POST_ID}/:${API_PARAMS.COMMENT_ID}`)
  @ApiParam({
    name: API_PARAMS.COMMENT_ID,
    type: 'string',
    description: 'Id of the comment we want to delete',
  })
  @ApiParam({
    name: API_PARAMS.POST_ID,
    type: 'string',
    description: 'Id of the post that holds the comment data',
  })
  @ApiResponse({
    type: DeleteCommentResponseDto,
    status: HttpStatus.OK,
  })
  async deleteCommentOnPost(
    @IsValidObjectId(API_PARAMS.POST_ID) postId: string,
    @IsValidObjectId('commentId') commentId: string,

    @CurrentUser() user: Partial<UserDocument>,
  ) {
    await this.postService.deleteCommentOnPost(
      commentId,
      postId,
      user._id.toString(),
    );

    return generateCommonApiResponse({
      statusCode: HttpStatus.OK,
      message: 'Comment deleted succesfully',
      data: null,
    });
  }

  @Get(`/comments/:${API_PARAMS.POST_ID}`)
  @ApiParam({
    type: 'string',
    name: API_PARAMS.POST_ID,
    description: 'Id of the post we want to get comments from',
  })
  @ApiQuery({
    type: GetCommentsDto,
    description: 'Request query to get comments from a post',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetCommentsResponseDto,
  })
  async getCommentsOnPost(
    @IsValidObjectId(API_PARAMS.POST_ID) postId: string,
    @IsValidRequestQuery(GetCommentsDto) getCommentsDto: GetCommentsDto,
  ) {
    const comments = await this.postService.getComments(
      postId,
      Number(getCommentsDto.page),
      Number(getCommentsDto.perPage),
    );

    return generateCommonApiResponse<typeof comments>({
      statusCode: HttpStatus.OK,
      message: 'Comments fetched succesfully',
      data: comments,
    });
  }

  @Post(`/comments/:${API_PARAMS.POST_ID}`)
  @ApiParam({
    type: 'string',
    name: API_PARAMS.POST_ID,
    description: 'Id of the post we want to comment',
  })
  @ApiBody({
    type: CreateCommentDto,
    description: 'Request body to create the comment for a post',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateCommentResponseDto,
  })
  async createCommentForPost(
    @IsValidObjectId(API_PARAMS.POST_ID) postId: string,
    @IsValidRequestBody(CreateCommentDto) createCommentDto: CreateCommentDto,

    @CurrentUser() user: Partial<UserDocument>,
  ) {
    const newComment = await this.postService.createCommentForPost(
      user._id.toString(),
      postId,
      createCommentDto.text,
    );

    return generateCommonApiResponse<typeof newComment>({
      statusCode: HttpStatus.OK,
      message: 'Comment created succesfully',
      data: newComment,
    });
  }
}
