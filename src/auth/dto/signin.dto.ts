import { ApiProperty } from '@nestjs/swagger';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

export class SigninResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'User signin successful',
  })
  message: string;

  @ApiProperty({
    example: {
      token: 'adfaefecaesfdvsdsdfdfad',
    },
  })
  data: {
    token: string;
  };
}

export class SigninDto {
  @ApiProperty({
    description: `Username of the current user`,
    example: 'iamjames',
  })
  username: string;

  @ApiProperty({
    description: `Password of the current user`,
    example: '12345678',
  })
  password: string;
}
