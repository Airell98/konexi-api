import { ApiProperty } from '@nestjs/swagger';

import { SuccessApiResponseDto } from 'src/libs/dtos/success-api-response.dto';

export class DeleteCommentResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'Comment deleted succesfully',
  })
  message: string;
  @ApiProperty({
    example: null,
  })
  data: any;
}
