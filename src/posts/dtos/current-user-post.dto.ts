import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../../constants';

const PAGE = 'Page';
const PER_PAGE = 'Per page';

export class CurrentUserPostsDto {
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
}
