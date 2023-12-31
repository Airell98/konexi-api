import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

import { ERROR_MESSAGES } from '../../constants';

const CAPTION = 'Caption';

export class CreatePostResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Post created successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      imageUrl: 'https://image-post.com',
      caption: 'Study hard',
      createdAt: '2023-07-26T18:48:15.378Z',
    },
  })
  data: {
    imageUrl: string;
    caption: string;
    createdAt: string;
  };
}

export class CreatePostDto {
  @ApiPropertyOptional({
    example: 'My first post :)',
  })
  @Expose()
  @IsOptional()
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(CAPTION),
  })
  caption?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  imageFile?: Express.Multer.File;
}
