import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

import { ERROR_MESSAGES } from '../../constants';

const TEXT = 'Text';

export class CreateCommentResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Comment created succesfully',
  })
  message: string;

  @ApiProperty({
    example: {
      author: {
        _id: '64bd3873761dc76d512dd4b4',
        username: 'iamjames',
        name: 'James Hetfield',
      },
      text: 'Great post you have there bro :)',
      createdAt: '2023-07-26T16:42:47.378Z',
    },
  })
  data: {
    author: {
      _id: string;
      username: string;
      name: string;
    };
    text: string;
    createdAt: Date;
  };
}

export class CreateCommentDto {
  @ApiProperty({
    example: 'Great post you have there :)',
  })
  @Expose()
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(TEXT),
  })
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(TEXT),
  })
  text: string;
}
