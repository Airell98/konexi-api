import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

import { Expose } from 'class-transformer';
import { IsValidObjectIdField } from '../../libs/decorators/is-valid-object-id-field.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../../constants';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

const USER_ID = 'User id';
const PAGE = 'Page';
const PER_PAGE = 'Per page';

export class GetUserFollowersResponseDto extends SuccessApiResponseDto {
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
    totalFollowers: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    followers: Array<{
      _id: string;
      username: string;
      email: string;
      profileImage: string;
      name: string;
    }>;
  };
}

export class GetUserFollowersDto {
  @ApiProperty({
    example: '64bd3873761dc76d512dd4b4',
  })
  @Expose()
  @IsValidObjectIdField({
    message: ERROR_MESSAGES.IS_VALID_OBJECT_ID(USER_ID),
  })
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(USER_ID),
  })
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(USER_ID),
  })
  userId: string;

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
