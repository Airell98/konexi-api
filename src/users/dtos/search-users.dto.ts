import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../../constants';
import { SuccessApiResponseDto } from 'src/libs/dtos/success-api-response.dto';

const PAGE = 'Page';
const PER_PAGE = 'Per page';
const NAME = 'Name';

export class SearchUsersResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Users fetched succesfully',
  })
  message: string;
  @ApiProperty({
    example: {
      totalUsers: 3,
      currentPage: 1,
      perPage: 1,
      totalPages: 3,
      users: [
        {
          _id: '64c37f2d771bb4ebc7cb29a9',
          name: 'John Doe',
          username: 'JohnDoe98',
          email: 'john@gmail.com',
          totalFollowers: 10,
          totalFollowing: 2,
          profileImage: 'https://profile-image.com',
          createdAt: '2023-07-27T03:33:58.044Z',
        },
      ],
    },
  })
  data: {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    users: any[];
  };
}

export class SearchUsersDto {
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
    example: 'John',
    type: 'string',
  })
  @Expose()
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(NAME),
  })
  name: string;
}
