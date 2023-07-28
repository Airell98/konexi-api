import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidObjectIdField } from '../../libs/decorators/is-valid-object-id-field.decorator';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

export class UnfollowUserResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'You have succesfully unfollowed agnesmo',
  })
  message: string;

  @ApiProperty({
    example: {
      unfollower: {
        id: '64c11ebab9f7e4466d54e8b5',
        username: 'andreHediyunus',
      },
      unfollowedUser: {
        id: '64c11f62b9f7e4466d54e8c5',
        username: 'agnesmo',
      },
    },
  })
  data: {
    unfollower: {
      id: string;
      username: string;
    };
    unfollowedUser: {
      id: string;
      username: string;
    };
  };
}
export class UnfollowUserDto {
  @ApiProperty({
    example: '64c11f62b9f7e4466d54e8c5',
  })
  @Expose()
  @IsValidObjectIdField({
    message: 'user id has to be a valid object id',
  })
  @IsString({
    message: 'user id has to be a string value',
  })
  @IsNotEmpty({
    message: 'user id cannot be empty',
  })
  userId: string;
}
