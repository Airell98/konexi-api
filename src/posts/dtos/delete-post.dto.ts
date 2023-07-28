import { ApiProperty } from '@nestjs/swagger';

import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

export class DeletePostResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Post deleted successfully',
  })
  message: string;

  @ApiProperty({
    example: null,
  })
  data: any;
}
