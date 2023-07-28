import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../../constants';
import { SuccessApiResponseDto } from 'src/libs/dtos/success-api-response.dto';

const PAGE = 'Page';
const PER_PAGE = 'Per page';
const KEYWORD = 'Keyword';

export class SearchPostsResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Posts fetched succesfully',
  })
  message: string;
  @ApiProperty({
    example: {
      totalPosts: 3,
      currentPage: 1,
      perPage: 1,
      totalPages: 3,
      posts: [
        {
          _id: '64c1e5a67470eadb7952cd2e',
          caption: 'Morning everyone',
          totalLikes: 1,
          totalComments: 0,
          imageUrl: 'https://post-image.com',
          createdAt: '2023-07-27T03:33:58.044Z',
          author: {
            _id: '64bd3873761dc76d512dd4b4',
            username: 'iamjames',
            profileImage: 'https://profile-image.com',
          },
        },
      ],
    },
  })
  data: {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    comments: any[];
  };
}

export class SearchPostsDto {
  @ApiProperty({
    example: 1,
    type: 'number',
    description: 'Page of the pagination',
  })
  @Expose()
  @Min(1, {
    message: ERROR_MESSAGES.MIN_NUMBER(PAGE, 1),
  })
  @IsNumber(
    {},
    {
      message: ERROR_MESSAGES.IS_NUMBER(PAGE),
    },
  )
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(PAGE),
  })
  page: number;

  @ApiProperty({
    example: 10,
    type: 'number',
    description:
      'Amount of data we want to fetch per page. The maximum perPage value is 10',
  })
  @Expose()
  @Max(10, {
    message: ERROR_MESSAGES.MAX_NUMBER(PER_PAGE, 10),
  })
  @IsNumber(
    {},
    {
      message: ERROR_MESSAGES.IS_NUMBER(PER_PAGE),
    },
  )
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(PER_PAGE),
  })
  perPage: number;

  @ApiProperty({
    example: 'Morning',
    type: 'string',
  })
  @Expose()
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(KEYWORD),
  })
  keyword: string;
}
