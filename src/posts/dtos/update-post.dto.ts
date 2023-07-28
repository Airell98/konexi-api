import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

import { ERROR_MESSAGES } from '../../constants';

const CAPTION = 'Caption';

export class UpdatePostResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Post updated successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      imageUrl: 'https://image-post.com',
      caption: 'Study hard',
      updatedAt: '2023-07-26T18:48:15.378Z',
    },
  })
  data: {
    imageUrl: string;
    caption: string;
    updatedAt: string;
  };
}

export class UpdatePostDto {
  @ApiPropertyOptional({
    example: 'My first post :)',
  })
  @Expose()
  @IsOptional()
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(CAPTION),
  })
  caption?: string;

  @ApiPropertyOptional({
    example: 'My first post :)',
  })
  @ApiProperty({ type: 'string', format: 'binary' })
  imageFile?: Express.Multer.File;
}
