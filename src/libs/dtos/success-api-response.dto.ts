import { ApiProperty } from '@nestjs/swagger';

export class SuccessApiResponseDto {
  @ApiProperty({
    example: 'success',
  })
  status: string;
}
