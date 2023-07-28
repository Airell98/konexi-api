import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FlattenMaps, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

import { ERROR_MESSAGES } from '../constants';
import { CreateNewUserDto } from './dtos/create-new-user.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { MediasService } from '../medias/medias.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private mediaService: MediasService,
  ) {}

  async findUserByUsername(username: string) {
    const result = await this.userModel.findOne({
      username: username,
    });

    return result;
  }

  async getFollowing(_id: string, page: number, perPage: number) {
    const user = await this.userModel.findById(_id).lean();

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const followingCount = user.following.length;
    const totalPages = Math.ceil(followingCount / perPage);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedFollowing = user.following.slice(startIndex, endIndex);

    const populatedFollowing = await this.userModel
      .find({ _id: { $in: paginatedFollowing } })
      .select('_id username name email profileImage')
      .lean();

    for (const user of populatedFollowing) {
      if (user.profileImage) {
        const profileImageUrl = await this.mediaService.getFileUrl(
          user.profileImage,
        );
        user.profileImage = profileImageUrl;
      }
    }

    return {
      totalFollowing: followingCount,
      totalPages: totalPages,
      currentPage: page,
      perPage: perPage,
      following: populatedFollowing,
    };
  }

  async getFollowers(_id: string, page: number, perPage: number) {
    const user = await this.userModel.findById(_id).lean();

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const followersCount = user.followers.length;
    const totalPages = Math.ceil(followersCount / perPage);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedFollowers = user.followers.slice(startIndex, endIndex);

    const populatedFollowers = await this.userModel
      .find({ _id: { $in: paginatedFollowers } })
      .select('_id username name email profileImage')
      .lean();

    for (const follower of populatedFollowers) {
      if (follower.profileImage) {
        const profileImageUrl = await this.mediaService.getFileUrl(
          follower.profileImage,
        );
        follower.profileImage = profileImageUrl;
      }
    }

    return {
      totalFollowers: followersCount,
      totalPages: totalPages,
      currentPage: page,
      perPage: perPage,
      followers: populatedFollowers,
    };
  }

  async unfollowUser(_id: string, followedUserId: string) {
    if (_id === followedUserId) {
      throw new HttpException(
        ERROR_MESSAGES.UNFOLLOW_YOUR_SELF,
        HttpStatus.BAD_REQUEST,
      );
    }

    const followedUser = await this.userModel.findById(followedUserId).exec();

    const currentUser = await this.userModel.findById(_id).exec();

    if (!followedUser) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!currentUser) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const hasBeenFollowed = await this.userModel.findOne({
      _id: followedUserId,
      followers: { $in: [_id] },
    });

    if (!hasBeenFollowed) {
      throw new HttpException(
        `You are not following ${followedUser.username}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userModel.findByIdAndUpdate(_id, {
      updatedAt: new Date(),
      $pull: {
        following: new Types.ObjectId(followedUserId),
      },
    });

    await this.userModel.findByIdAndUpdate(followedUserId, {
      updatedAt: new Date(),
      $pull: {
        followers: new Types.ObjectId(_id),
      },
    });

    return {
      unfollower: {
        id: _id,
        username: currentUser.username,
      },
      unfollowedUser: {
        id: followedUserId,
        username: followedUser.username,
      },
    };
  }

  private async mapUsers(
    users: (FlattenMaps<User> & {
      _id: Types.ObjectId;
    })[],
  ) {
    const result: Array<{
      _id: string;
      name: string;
      username: string;
      email: string;
      totalFollowers: number;
      totalFollowing: number;
      createdAt: string;
    }> = [];

    for (const user of users) {
      const data = {
        _id: user._id.toString(),
        name: user.name,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        totalFollowers: user.followers.length,
        totalFollowing: user.followers.length,
        createdAt: user.createdAt.toISOString(),
      };

      if (user.profileImage) {
        const imageUrl = await this.mediaService.getFileUrl(user.profileImage);

        data.profileImage = imageUrl;
      }

      result.push(data);
    }

    return result;
  }

  async searchUsers(page: number, perPage: number, name: string) {
    const query = {
      $or: [
        { name: { $regex: new RegExp(name, 'i') } },
        { username: { $regex: new RegExp(name, 'i') } },
      ],
    };

    const options = {
      sort: { createdAt: -1 },
      skip: (page - 1) * perPage,
      limit: perPage,
    };

    const users = await this.userModel.find(query, {}, options).lean().exec();

    const result = await this.mapUsers(users);

    const totalUsers = await this.userModel.countDocuments(query).exec();

    const totalPages = Math.ceil(totalUsers / perPage);

    return {
      totalUsers: totalUsers,
      totalPages: totalPages,
      currentPage: page,
      perPage: perPage,
      users: result,
    };
  }

  async followUser(_id: string, followedUserId: string) {
    if (_id === followedUserId) {
      throw new HttpException(
        ERROR_MESSAGES.FOLLOW_YOUR_SELF,
        HttpStatus.BAD_REQUEST,
      );
    }

    const followedUser = await this.userModel.findById(followedUserId).exec();

    const currentUser = await this.userModel.findById(_id).exec();

    if (!followedUser) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!currentUser) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const isFollowed = await this.userModel.findOne({
      _id: followedUserId,
      followers: { $in: [_id] },
    });

    if (isFollowed) {
      throw new HttpException(
        ERROR_MESSAGES.FOLLOW_USER_TWICE,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userModel.findByIdAndUpdate(_id, {
      updatedAt: new Date(),
      $push: { following: new Types.ObjectId(followedUserId) },
    });

    await this.userModel.findByIdAndUpdate(followedUserId, {
      updatedAt: new Date(),
      $push: { followers: new Types.ObjectId(_id) },
    });

    return {
      follower: {
        id: _id,
        username: currentUser.username,
      },
      followedUser: {
        id: followedUserId,
        username: followedUser.username,
      },
    };
  }

  async getCurrentUserProfile(_id: string) {
    const currentUser = await this.userModel.findById(_id).lean().exec();

    if (!currentUser) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (currentUser.profileImage) {
      const imageUrl = await this.mediaService.getFileUrl(
        currentUser.profileImage,
      );

      currentUser.profileImage = imageUrl;
    }

    return {
      _id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
      name: currentUser.name,
      profileImage: currentUser.profileImage,
      totalFollowers: currentUser.followers.length,
      totalFollowings: currentUser.following.length,
    };
  }

  async getProfile(_id: string, otherUserId: string) {
    const user = await this.userModel.findById(otherUserId).lean().exec();

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.profileImage) {
      const imageUrl = await this.mediaService.getFileUrl(user.profileImage);

      user.profileImage = imageUrl;
    }

    const isFollowing =
      _id !== otherUserId
        ? {
            isFollowing: user.followers.some(
              (id: any) => id.toString() === _id,
            ),
            isFollowedByCurrentuser: user.following.some(
              (id: any) => id.toString() === _id,
            ),
          }
        : {};

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      totalFollowers: user.followers.length,
      totalFollowings: user.following.length,
      ...isFollowing,
    };
  }

  async updateProfile(updateProfileDto: UpdateProfileDto) {
    const currentUser = await this.userModel
      .findById(updateProfileDto._id)
      .exec();

    if (!currentUser) {
      throw new HttpException(
        ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateProfilePayload = {
      username: updateProfileDto.username,
      email: updateProfileDto.email,
      profileImage: currentUser.profileImage,
      updatedAt: new Date(),
    };

    let imageUrl = '';

    if (updateProfileDto?.imageFile) {
      if (currentUser?.profileImage) {
        await this.mediaService.deleteFile(currentUser.profileImage);
      }

      const fileName = updateProfileDto.imageFile.originalname;

      const fileBuffer = updateProfileDto.imageFile.buffer;

      const fileMimeType = updateProfileDto.imageFile.mimetype;

      const newImageName = await this.mediaService.uploadFile(
        fileName,
        fileBuffer,
        fileMimeType,
      );

      updateProfilePayload.profileImage = newImageName;

      imageUrl = await this.mediaService.getFileUrl(newImageName);
    } else {
      if (currentUser?.profileImage) {
        imageUrl = await this.mediaService.getFileUrl(currentUser.profileImage);
      }
    }

    const updatedProfile = await this.userModel.findByIdAndUpdate(
      updateProfileDto._id,
      updateProfilePayload,
      {
        new: true,
      },
    );

    return {
      username: updatedProfile.username,
      email: updatedProfile.email,
      name: updatedProfile.name,
      profileImage: imageUrl,
    };
  }

  async findUserEmail(email: string) {
    const result = await this.userModel.findOne({
      email: email,
    });

    return result;
  }

  async findUserById(_id: string) {
    return this.userModel.findById(_id).exec();
  }

  async createNewUser(payload: CreateNewUserDto) {
    const { username, email, password } = payload;

    let user = await this.findUserByUsername(username);

    if (user) {
      throw new HttpException(
        ERROR_MESSAGES.DUPLICATE_USERNAME(username),
        HttpStatus.CONFLICT,
      );
    }

    user = await this.findUserEmail(email);

    if (user) {
      throw new HttpException(
        ERROR_MESSAGES.DUPLICATE_EMAIL(email),
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserPayload = {
      ...payload,
      profileImage: '',
      password: hashedPassword,
    };

    const newUser = await this.userModel.create(newUserPayload);

    return {
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
    };
  }
}
