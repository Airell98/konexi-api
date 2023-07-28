import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

import { Request } from 'express';

import { PostsService } from './posts.service';
import { UserDocument } from '../users/schemas/user.schema';
import { ERROR_MESSAGES } from '../constants/index';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(private postService: PostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.user) {
      throw new UnauthorizedException();
    }
    const postId = request.params.postId;

    if (!isValidObjectId(postId)) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_FORMAT('object id'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const post = await this.postService.getPostById(postId);

    if (
      (post.author as UserDocument)._id.toString() !==
      request.user._id.toString()
    ) {
      throw new HttpException(
        ERROR_MESSAGES.FORBIDDEN_MODIY,
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
