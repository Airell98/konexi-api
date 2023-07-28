import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidObjectIdField } from '../../libs/decorators/is-valid-object-id-field.decorator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SuccessApiResponseDto } from '../../libs/dtos/success-api-response.dto';

export class FollowUserResponseDto extends SuccessApiResponseDto {
  @ApiProperty({
    example: 'You are now following agnesmo',
  })
  message: string;

  @ApiProperty({
    example: {
      follower: {
        id: '64c11ebab9f7e4466d54e8b5',
        username: 'andreHediyunus',
      },
      followedUser: {
        id: '64c11f62b9f7e4466d54e8c5',
        username: 'agnesmo',
      },
    },
  })
  data: {
    follower: {
      id: string;
      username: string;
    };
    followedUser: {
      id: string;
      username: string;
    };
  };
}

export class FollowUserDto {
  @ApiProperty({
    example: '64c11f62b9f7e4466d54e8c5',
  })
  @Expose()
  @IsValidObjectIdField({
    message: 'User id has to be a valid object id',
  })
  @IsString({
    message: 'User id has to be a string value',
  })
  @IsNotEmpty({
    message: 'User id cannot be empty',
  })
  userId: string;
}
