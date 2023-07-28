import {
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { CurrentUser } from '../libs/decorators/current-user.decorator';
import { generateCommonApiResponse } from '../libs/http/helpers';
import { AuthGuard } from '../auth/auth.guard';
import { IsValidRequestBody } from '../libs/decorators/is-valid-request-body.decorator';
import { FollowUserDto, FollowUserResponseDto } from './dtos/follow-user.dto';
import {
  UnfollowUserDto,
  UnfollowUserResponseDto,
} from './dtos/unfollow-user.dto';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import {
  CurrentUserFollowerDto,
  CurrentUserFollowersResponseDto,
} from './dtos/current-user-follower.dto';
import {
  GetUserFollowersDto,
  GetUserFollowersResponseDto,
} from './dtos/get-user-follower.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserFollowingResponseDto } from './dtos/get-user-following.dto';
import { CurrentUserFollowingResponseDto } from './dtos/current-user-following.dto';
import {
  SearchUsersDto,
  SearchUsersResponseDto,
} from './dtos/search-users.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/search')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBody({
    type: SearchUsersDto,
    description: 'Request body to search for users by name or username',
  })
  @ApiResponse({
    type: SearchUsersResponseDto,
    status: HttpStatus.OK,
  })
  async searchUsers(
    @IsValidRequestBody(SearchUsersDto) searchUsersDto: SearchUsersDto,
  ) {
    const users = await this.userService.searchUsers(
      searchUsersDto.page,
      searchUsersDto.perPage,
      searchUsersDto.name,
    );

    return generateCommonApiResponse({
      statusCode: HttpStatus.OK,
      message: `Users fetch successfully`,
      data: users,
    });
  }

  @Post('/followers')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBody({
    type: GetUserFollowersDto,
    description: 'Request body to get the follower data from a user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserFollowersResponseDto,
  })
  async getUserFollowers(
    @IsValidRequestBody(GetUserFollowersDto)
    getUserFollowersDto: GetUserFollowersDto,
  ) {
    const followers = await this.userService.getFollowers(
      getUserFollowersDto.userId,
      getUserFollowersDto.page,
      getUserFollowersDto.perPage,
    );

    return generateCommonApiResponse<typeof followers>({
      statusCode: HttpStatus.OK,
      message: `Followers fetch successfully`,
      data: followers,
    });
  }

  @Post('/following')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBody({
    type: GetUserFollowersDto,
    description: 'Request body to get the following data from a user',
  })
  @ApiResponse({
    type: GetUserFollowingResponseDto,
    status: HttpStatus.OK,
  })
  async getUserFollowing(
    @IsValidRequestBody(GetUserFollowersDto)
    getUserFollowingDto: GetUserFollowersDto,
  ) {
    const following = await this.userService.getFollowing(
      getUserFollowingDto.userId,
      getUserFollowingDto.page,
      getUserFollowingDto.perPage,
    );

    return generateCommonApiResponse<typeof following>({
      statusCode: HttpStatus.OK,
      message: `Following fetch successfully`,
      data: following,
    });
  }

  @Post('/current-user-following')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBody({
    type: CurrentUserFollowerDto,
    description:
      'Request body to get the following data of the current signed in user',
  })
  @ApiResponse({
    type: CurrentUserFollowingResponseDto,
    status: HttpStatus.OK,
  })
  async currentUserFollowing(
    @IsValidRequestBody(CurrentUserFollowerDto)
    currentUserFollwingDto: CurrentUserFollowerDto,
    @CurrentUser() user: Partial<UserDocument>,
  ) {
    const following = await this.userService.getFollowing(
      user._id.toString(),
      currentUserFollwingDto.page,
      currentUserFollwingDto.perPage,
    );

    return generateCommonApiResponse<typeof following>({
      statusCode: HttpStatus.OK,
      message: `Following fetch successfully`,
      data: following,
    });
  }

  @Post('/current-user-followers')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBody({
    type: CurrentUserFollowerDto,
    description:
      'Request body to get the followers of the current signed in user',
  })
  @ApiResponse({
    type: CurrentUserFollowersResponseDto,
    status: HttpStatus.OK,
  })
  async currentUserFollowers(
    @IsValidRequestBody(CurrentUserFollowerDto)
    currentUserFollowerDto: CurrentUserFollowerDto,
    @CurrentUser() user: Partial<UserDocument>,
  ) {
    const followers = await this.userService.getFollowers(
      user._id.toString(),
      currentUserFollowerDto.page,
      currentUserFollowerDto.perPage,
    );

    return generateCommonApiResponse<typeof followers>({
      statusCode: HttpStatus.OK,
      message: `Followers fetch successfully`,
      data: followers,
    });
  }

  @Patch('/follow-user')
  @UseGuards(AuthGuard)
  @ApiBody({
    type: FollowUserDto,
    description: 'Request body to follow a user',
  })
  @ApiResponse({
    type: FollowUserResponseDto,
    status: HttpStatus.OK,
  })
  async followUser(
    @IsValidRequestBody(FollowUserDto) followUserDto: FollowUserDto,
    @CurrentUser() user: Partial<UserDocument>,
  ) {
    const followUser = await this.userService.followUser(
      user._id.toString(),
      followUserDto.userId,
    );

    return generateCommonApiResponse<typeof followUser>({
      statusCode: HttpStatus.OK,
      message: `You are now following ${followUser.followedUser.username}`,
      data: followUser,
    });
  }

  @Patch('/unfollow-user')
  @UseGuards(AuthGuard)
  @ApiBody({
    type: UnfollowUserDto,
    description: 'Request body to unfollow a user',
  })
  @ApiResponse({
    type: UnfollowUserResponseDto,
    status: HttpStatus.OK,
  })
  async unfollowUser(
    @IsValidRequestBody(UnfollowUserDto) unfollowUserDto: UnfollowUserDto,
    @CurrentUser() user: Partial<UserDocument>,
  ) {
    const unfollowUser = await this.userService.unfollowUser(
      user._id.toString(),
      unfollowUserDto.userId,
    );

    return generateCommonApiResponse<typeof unfollowUser>({
      statusCode: HttpStatus.OK,
      message: `You have successfully unfollowed ${unfollowUser.unfollowedUser.username}`,
      data: unfollowUser,
    });
  }
}
