import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../../constants';
import { IsValidObjectIdField } from 'src/libs/decorators/is-valid-object-id-field.decorator';

const PAGE = 'Page';
const PER_PAGE = 'Per page';
const USER_ID = 'User id';

export class GetUserPostsDto {
  @ApiProperty({
    example: 1,
    type: 'number',
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
    example: '64bf17873ab6ee05943fa972',
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
}
