import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../../constants';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

const EMAIL = 'Email';
const NAME = 'Name';
const USERNAME = 'Username';
const PASSWORD = 'Password';

export class SignupResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'User signup successful',
  })
  message: string;

  @ApiProperty({
    example: {
      username: 'richard98',
      name: 'Richard',
      email: 'richard@gmail.com',
    },
  })
  data: {
    username: string;
    name: string;
    email: string;
  };
}

export class SignupDto {
  @ApiProperty({
    description: `Name of the user`,
    example: 'Richard',
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
    description: `Password of the user`,
    example: '12345678',
  })
  @Expose()
  @MinLength(8, {
    message: `${PASSWORD} has to be more than 7 characters`,
  })
  @IsString({
    message: ERROR_MESSAGES.IS_STRING(PASSWORD),
  })
  @IsNotEmpty({
    message: ERROR_MESSAGES.IS_NOT_EMPTY(PASSWORD),
  })
  password: string;

  @ApiProperty({
    description: `Username of the user`,
    example: 'richard98',
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
    description: `Email of the user`,
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
}
