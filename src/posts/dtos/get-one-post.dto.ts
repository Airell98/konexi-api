import { ApiProperty } from '@nestjs/swagger';

import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

export class GetOnePostResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Post fetched successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      _id: '64bf17873ab6ee05943fa972',
      caption: 'Meeting with my students :)',
      imageUrl: 'https://image-post.com',
      totalLikes: 1,
      totalComments: 4,
      author: {
        _id: '64bd3873761dc76d512dd4b4',
        username: 'iamjames',
      },
    },
  })
  data: {
    _id: string;
    caption: string;
    imageUrl: string;
    totalLikes: number;
    totalComments: number;
    author: {
      _id: string;
      username: string;
    };
  };
}
