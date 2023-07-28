import { ApiProperty } from '@nestjs/swagger';

import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

export class CurrentUserFollowingResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Following fetch successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      totalFollowers: 10,
      totalPages: 10,
      currentPage: 1,
      perPage: 1,
      following: [
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
    following: Array<{
      _id: string;
      username: string;
      email: string;
      profileImage: string;
      name: string;
    }>;
  };
}
