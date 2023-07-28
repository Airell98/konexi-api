import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { isValidObjectId } from 'mongoose';

import { ERROR_MESSAGES } from '../../constants';

export const IsValidObjectId = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    if (!isValidObjectId(request.params[data])) {
      throw new HttpException(
        ERROR_MESSAGES.IS_VALID_OBJECT_ID(data),
        HttpStatus.BAD_REQUEST,
      );
    }

    return request.params[data];
  },
);
