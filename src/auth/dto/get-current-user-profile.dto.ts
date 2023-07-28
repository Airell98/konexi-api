import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetCurrentUserProfileResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Profile fetched successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      _id: '64bd3873761dc76d512dd4b4',
      username: 'iamrichard',
      email: 'richard@gmail.com',
      name: 'Richard Geere',
      profileImage: 'https://image-richard.com',
      totalFollowers: 10,
      totalFollowings: 1,
    },
  })
  data: {
    _id: string;
    username: string;
    email: string;
    name: string;
    profileImage: string;
    totalFollowers: number;
    totalFollowings: number;
  };
}
