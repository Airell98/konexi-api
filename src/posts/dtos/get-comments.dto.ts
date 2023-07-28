import { IsNotEmpty, IsNumberString, Max } from 'class-validator';

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../../constants';
import { SuccessApiResponseDto } from 'src/libs/dtos/success-api-response.dto';

const PAGE = 'Page';
const PER_PAGE = 'Per page';

export class GetCommentsResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Comments fetched succesfully',
  })
  message: string;
  @ApiProperty({
    example: {
      totalComments: 4,
      totalPages: 4,
      currentPage: 2,
      perPage: 1,
      comments: [
        {
          _id: '64c14cafb7bfbf02d4f5fdea',
          author: {
            _id: '64c11f62b9f7e4466d54e8c5',
            username: 'agnesmo',
            name: 'agnesmo',
            profileImage: '',
          },
          text: 'I like your post man',
          createdAt: '2023-07-26T16:41:19.172Z',
        },
      ],
    },
  })
  data: {
    totalComments: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    comments: any[];
  };
}

export class GetCommentsDto {
  @ApiProperty({
    example: 1,
    type: 'number',
    description: 'Page of the pagination',
  })
  @Expose()
  @IsNumberString(
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
  @IsNumberString(
    {},
    {
      message: ERROR_MESSAGES.IS_NUMBER(PER_PAGE),
    },
  )
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(PER_PAGE),
  })
  perPage: number;
}
