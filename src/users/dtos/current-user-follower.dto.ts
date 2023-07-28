import { IsNotEmpty, IsNumber, Max } from 'class-validator';

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from 'src/constants';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

const PAGE = 'Page';

const PER_PAGE = 'Per page';

export class CurrentUserFollowersResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Followers fetch successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      totalFollowers: 10,
      totalPages: 10,
      currentPage: 1,
      perPage: 1,
      followers: [
        {
          _id: '64bd379ef4884a7ebb0be368',
          username: 'anthony',
          email: 'anthony@gmail.com',
          profileImage: 'https://profile-image.com',
          name: 'Anthony',
        },
      ],
    },
  })
  data: {
    totalFollowers: 10;
    totalPages: 10;
    currentPage: 1;
    perPage: 1;
    followers: Array<{
      _id: string;
      username: string;
      email: string;
      profileImage: string;
      name: string;
    }>;
  };
}

export class CurrentUserFollowerDto {
  @ApiProperty({
    example: 1,
  })
  @Expose()
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    {
      message: ERROR_MESSAGES.IS_NUMBER(PAGE),
    },
  )
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(PAGE),
  })
  page: number;

  @ApiProperty({
    example: 1,
  })
  @Expose()
  @Max(10, {
    message: ERROR_MESSAGES.MAX_NUMBER(PER_PAGE, 10),
  })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    {
      message: ERROR_MESSAGES.IS_NUMBER(PER_PAGE),
    },
  )
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(PER_PAGE),
  })
  perPage: number;
}
