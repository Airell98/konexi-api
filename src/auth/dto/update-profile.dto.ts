import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ERROR_MESSAGES } from '../../constants';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

const EMAIL = 'Email';
const NAME = 'Name';
const USERNAME = 'Username';

export class UpdateProfileDtoResponse extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Profile updated successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      username: 'iamrichard98',
      name: 'Richard Geere',
      email: 'richard@gmail.com',
      profileImage: 'https://profile-image.com',
    },
  })
  data: {
    username: string;
    name: string;
    email: string;
    profileImage: string;
  };
}

export class UpdateProfileDto {
  @ApiProperty({
    example: 'Richard Geere',
  })
  @Expose()
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(NAME),
  })
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(NAME),
  })
  name: string;

  @ApiProperty({
    example: 'iamrichard98',
  })
  @Expose()
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(USERNAME),
  })
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(USERNAME),
  })
  username: string;

  @ApiProperty({
    example: 'richard@gmail.com',
  })
  @Expose()
  @IsEmail(
    {
      allow_display_name: false,
    },
    {
      message: ERROR_MESSAGES.IS_VALID_EMAIL_FORMAT(EMAIL),
    },
  )
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(EMAIL),
  })
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(EMAIL),
  })
  email: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  imageFile?: Express.Multer.File;
}
