import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';

import { Post } from './schemas/post.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { MediasService } from '../medias/medias.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ERROR_MESSAGES } from '../constants';
import { CommentDocument } from './schemas/comment.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
    private mediaService: MediasService,
  ) {}

  async getComments(postId: string, page: number, perPage: number) {
    if (Number(page) < 1) {
      throw new HttpException(
        'Page cannot be less than 1',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Number(perPage) > 10) {
      throw new HttpException(
        ERROR_MESSAGES.MAX_NUMBER('Per page', 10),
        HttpStatus.BAD_REQUEST,
      );
    }

    const post = await this.postModel
      .findById(postId)
      .lean()
      .populate('comments.author', '_id username name profileImage')
      .exec();

    if (!post) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const commentCount = post.comments.length;
    const totalPages = Math.ceil(commentCount / perPage);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedComments = post.comments.slice(startIndex, endIndex);

    const result = [];

    for (const comment of paginatedComments) {
      const eachComment = {
        _id: (comment as CommentDocument)._id,
        author: {
          _id: (comment.author as UserDocument)._id,
          username: comment.author.username,
          name: comment.author.username,
          profileImage: comment.author.profileImage,
        },
        text: comment.text,
        createdAt: comment.createdAt,
      };
      if (comment.author.profileImage) {
        const imageUrl = await this.mediaService.getFileUrl(
          comment.author.profileImage,
        );

        eachComment.author.profileImage = imageUrl;
      }

      result.push(eachComment);
    }

    return {
      totalComments: commentCount,
      totalPages: totalPages,
      currentPage: page,
      perPage: perPage,
      comments: result,
    };
  }

  async deleteCommentOnPost(commentId: string, postId: string, userId: string) {
    const post = await this.postModel
      .findOne({
        _id: postId,
        comments: { $elemMatch: { _id: commentId } },
      })
      .exec();

    if (!post) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const currentComment = post.comments.find(
      (comment: CommentDocument) => comment._id.toString() === commentId,
    );

    if (currentComment) {
      if ((currentComment as CommentDocument).author.toString() !== userId) {
        throw new HttpException(
          ERROR_MESSAGES.FORBIDDEN_MODIY,
          HttpStatus.FORBIDDEN,
        );
      }

      await this.postModel.findByIdAndUpdate(postId, {
        updatedAt: new Date(),
        $pull: {
          comments: { _id: commentId },
        },
      });
    }
  }

  async createCommentForPost(userId: string, postId: string, text: string) {
    const post = await this.postModel.findById(postId).exec();

    const user = await this.userModel.findById(userId).exec();

    if (!post || !user) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const commentPayload = {
      author: {
        _id: userId,
      },
      text: text,
      createdAt: new Date(),
    };

    await this.postModel.findByIdAndUpdate(postId, {
      updatedAt: new Date(),
      $push: {
        comments: commentPayload,
      },
    });

    return {
      author: {
        _id: user._id,
        username: user.username,
        name: user.name,
      },
      text: text,
      createdAt: commentPayload.createdAt,
    };
  }

  async unlikePost(postId: string, userId: string) {
    const post = await this.postModel.findById(postId).exec();

    if (!post) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const isLiked = post.likes.some(
      (value: any) => value.toString() === userId,
    );

    if (!isLiked) {
      throw new HttpException(
        ERROR_MESSAGES.UNLIKE_UNLIKED_POST,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.postModel.findByIdAndUpdate(postId, {
      updatedAt: new Date(),
      $pull: {
        likes: new Types.ObjectId(userId),
      },
    });

    const currentTotalLikes =
      post.likes.length === 0 ? 0 : post.likes.length - 1;

    return {
      currentTotalLikes: currentTotalLikes,
    };
  }

  async giveLikeToPost(postId: string, userId: string) {
    const post = await this.postModel.findById(postId).exec();

    if (!post) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const isLiked = post.likes.some(
      (value: UserDocument) => value.toString() === userId,
    );

    if (isLiked) {
      throw new HttpException(
        ERROR_MESSAGES.LIKE_POST_TWICE,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.postModel.findByIdAndUpdate(postId, {
      updatedAt: new Date(),
      $push: { likes: new Types.ObjectId(userId) },
    });

    return {
      currentTotalLikes: post.likes.length + 1,
    };
  }

  async getPostById(_id: string) {
    const post = await this.postModel.findById(_id).populate('author', '_id');

    if (!post) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return post;
  }

  async deletePost(postId: string) {
    const post = await this.getPostById(postId);

    await this.mediaService.deleteFile(post.imageName);

    await this.postModel.findByIdAndRemove({ _id: postId }).exec();
  }

  async updatePost(
    postId: string,
    createPostDto: CreatePostDto,

    imageFile?: Express.Multer.File,
  ) {
    const post = await this.getPostById(postId);

    let imageUrl = '';

    const updatePostPayload: {
      updatedAt: Date;
      caption?: string;
      imageName?: string;
    } = {
      updatedAt: new Date(),
      caption: createPostDto?.caption ?? post.caption,
      imageName: post.imageName,
    };

    if (imageFile) {
      if (post.imageName) {
        await this.mediaService.deleteFile(post.imageName);
      }

      const fileName = imageFile.originalname;
      const fileBuffer = imageFile.buffer;
      const fileMimeType = imageFile.mimetype;

      const newImageName = await this.mediaService.uploadFile(
        fileName,
        fileBuffer,
        fileMimeType,
      );

      imageUrl = await this.mediaService.getFileUrl(newImageName);

      updatePostPayload.imageName = newImageName;
    } else {
      if (post.imageName) {
        imageUrl = await this.mediaService.getFileUrl(post.imageName);
      }
    }

    const updatedPost = await this.postModel.findByIdAndUpdate(
      postId,
      updatePostPayload,
      {
        new: true,
      },
    );

    return {
      imageUrl: imageUrl,
      caption: updatedPost.caption,
      updatedAt: updatedPost.updatedAt,
    };
  }

  async createNewPost(
    createPostDto: CreatePostDto,
    imageFile: Express.Multer.File,
    author: Partial<UserDocument>,
  ) {
    const fileName = imageFile.originalname;
    const fileBuffer = imageFile.buffer;
    const fileMimeType = imageFile.mimetype;

    const newImageName = await this.mediaService.uploadFile(
      fileName,
      fileBuffer,
      fileMimeType,
    );

    const imageUrl = await this.mediaService.getFileUrl(newImageName);

    const newPostPayload: Partial<Post> = {
      caption: createPostDto?.caption,
      imageName: newImageName,
      author: author,
    };

    const newPost = await this.postModel.create(newPostPayload);

    return {
      imageUrl: imageUrl,
      caption: newPost.caption,
      createdAt: newPost.createdAt,
    };
  }

  private async mapPostsUsers(
    posts: (FlattenMaps<Post> & {
      _id: Types.ObjectId;
    })[],
  ) {
    const result: Array<{
      _id: string;
      caption: string;
      totalLikes: number;
      totalComments: number;
      imageUrl: string;
      createdAt: string;
      author: {
        _id: string;
        username: string;
        profileImage: string;
      };
    }> = [];

    for (const p of posts) {
      const data = {
        _id: p._id.toString(),
        caption: p.caption,
        totalLikes: p.likes.length,
        totalComments: p.comments.length,
        imageUrl: '',
        createdAt: p.createdAt.toISOString(),
        author: {
          _id: (p.author as UserDocument)._id.toString(),
          username: p.author.username,
          profileImage: p.author.profileImage,
        },
      };

      if (p.imageName) {
        const postImageUrl = await this.mediaService.getFileUrl(p.imageName);

        data.imageUrl = postImageUrl;
      }

      if (p.author.profileImage) {
        const profileImageUrl = await this.mediaService.getFileUrl(
          p.author.profileImage,
        );
        data.author.profileImage = profileImageUrl;
      }

      result.push(data);
    }

    return result;
  }

  async getSinglePost(postId: string) {
    const post = await this.postModel
      .findById(postId)
      .populate('author', '_id username profileImage')
      .lean()
      .exec();

    const data = {
      _id: post._id,
      caption: post.caption,
      totalLikes: post.likes.length,
      totalComments: post.comments.length,
      imageUrl: '',
      createdAt: post.createdAt,
      author: {
        _id: (post.author as UserDocument)._id,
        username: post.author.username,
        profileImage: post.author.profileImage,
      },
    };

    if (post.imageName) {
      const postImageUrl = await this.mediaService.getFileUrl(post.imageName);

      data.imageUrl = postImageUrl;
    }

    if (post.author.profileImage) {
      const profileImageUrl = await this.mediaService.getFileUrl(
        post.author.profileImage,
      );
      data.author.profileImage = profileImageUrl;
    }

    return data;
  }

  async getUserPosts(page: number, perPage: number, userId: string) {
    const query = {
      author: userId,
    };

    const options = {
      sort: { createdAt: -1 },
      skip: (page - 1) * perPage,
      limit: perPage,
    };
    const posts = await this.postModel
      .find(query, {}, options)
      .populate('author', '_id username profileImage')
      .lean()
      .exec();

    const result = await this.mapPostsUsers(posts);

    const totalPosts = await this.postModel.countDocuments(query).exec();

    return {
      totalPosts: totalPosts,
      currentPage: page,
      perPage: perPage,
      posts: result,
    };
  }

  async searchPosts(page: number, perPage: number, keyword: string) {
    const query = {
      caption: { $regex: new RegExp(keyword, 'i') },
    };

    const options = {
      sort: { createdAt: -1 },
      skip: (page - 1) * perPage,
      limit: perPage,
    };
    const posts = await this.postModel
      .find(query, {}, options)

      .populate('author', '_id username profileImage')
      .lean()
      .exec();

    const result = await this.mapPostsUsers(posts);

    const totalPosts = await this.postModel.countDocuments(query).exec();

    const totalPages = Math.ceil(totalPosts / perPage);

    return {
      totalPosts: totalPosts,
      currentPage: page,
      perPage: perPage,
      totalPages: totalPages,
      posts: result,
    };
  }
}
