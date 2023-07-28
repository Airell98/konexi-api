import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const IsValidRequestQuery = createParamDecorator(
  async (value: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const query = request.query;

    const dto = plainToClass(value, query, {
      excludeExtraneousValues: true,
    }) as object;

    const errors = await validate(dto);

    if (errors.length > 0) {
      if (Object.keys(query).length === 0) {
        throw new HttpException(
          'request query cannot be empty',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const validationErrors = errors[0].constraints;
      const errorValue = Object.values(validationErrors)[0];

      throw new HttpException(errorValue, HttpStatus.BAD_REQUEST);
    }

    return dto;
  },
);
