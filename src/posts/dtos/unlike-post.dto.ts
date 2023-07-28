import { ApiProperty } from '@nestjs/swagger';

import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

export class UnlikePostResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Post unliked successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      currentTotalLikes: 11,
    },
  })
  data: {
    currentTotalLikes: number;
  };
}
