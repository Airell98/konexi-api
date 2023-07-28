import { ApiProperty } from '@nestjs/swagger';

import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

export class GiveLikeToPostResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Post liked successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      currentTotalLikes: 12,
    },
  })
  data: {
    currentTotalLikes: number;
  };
}
