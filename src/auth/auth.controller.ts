import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  HttpException,
  HttpStatus,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseGuards,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { SigninDto, SigninResponseDto } from './dto/signin.dto';
import { SignupDto, SignupResponseDto } from './dto/signup.dto';
import {
  UpdateProfileDto,
  UpdateProfileDtoResponse,
} from './dto/update-profile.dto';

import { ERROR_MESSAGES } from '../constants';
import { CurrentUser } from '../libs/decorators/current-user.decorator';
import { UserDocument } from '../users/schemas/user.schema';
import { AuthGuard } from './auth.guard';
import { generateCommonApiResponse } from 'src/libs/http/helpers';
import { IsValidObjectId } from '../libs/decorators/is-valid-object-id.decorator';
import { IsValidRequestBody } from '../libs/decorators/is-valid-request-body.decorator';
import { GetCurrentUserProfileResponseDto } from './dto/get-current-user-profile.dto';
import { GetUserProfileResponseDto } from './dto/get-user-profile.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SignupResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    description: 'Signup request body',
    type: SignupDto,
  })
  async signup(@IsValidRequestBody(SignupDto) signupDto: SignupDto) {
    const newUser = await this.authService.signup(signupDto);

    return generateCommonApiResponse<typeof newUser>({
      statusCode: HttpStatus.CREATED,
      message: 'User signup successful',
      data: newUser,
    });
  }

  @Post('/signin')
  @ApiResponse({
    status: HttpStatus.OK,
    type: SigninResponseDto,
  })
  @HttpCode(200)
  async signin(@Body() signinDto: SigninDto) {
    const token = await this.authService.signin(signinDto);

    return generateCommonApiResponse({
      statusCode: HttpStatus.OK,
      message: 'User signin successful',
      data: {
        token,
      },
    });
  }

  @Put('/profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('imageFile'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: "Request body to update user's profile",
    type: UpdateProfileDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateProfileDtoResponse,
  })
  @ApiBearerAuth()
  async updateProfile(
    @IsValidRequestBody(UpdateProfileDto) updateProfileDto: UpdateProfileDto,

    @CurrentUser() user: Partial<UserDocument>,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: /.(jpg|jpeg|png)$/ }),
          //notes: maxSize represents byte unit
          new MaxFileSizeValidator({ maxSize: 1000000 * 10 }), // 10mb
        ],
        exceptionFactory: () => {
          throw new HttpException(
            ERROR_MESSAGES.INVALID_IMAGE_FILE,
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    )
    imageFile?: Express.Multer.File,
  ) {
    const updatedProfile = await this.authService.updateProfile(
      updateProfileDto,
      user._id.toString(),
      imageFile,
    );

    return generateCommonApiResponse<typeof updatedProfile>({
      statusCode: HttpStatus.OK,
      message: 'Profile updated successfully',
      data: updatedProfile,
    });
  }

  @Get('/profile/current-user')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetCurrentUserProfileResponseDto,
  })
  async getCurrentUserProfile(@CurrentUser() user: Partial<UserDocument>) {
    const currentUserProfile = await this.authService.getCurrentUserProfile(
      user._id.toString(),
    );

    return generateCommonApiResponse<typeof currentUserProfile>({
      statusCode: HttpStatus.OK,
      message: 'Profile fetched successfully',
      data: currentUserProfile,
    });
  }

  @Get('/profile/:userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserProfileResponseDto,
  })
  @ApiParam({
    type: 'string',
    name: 'userId',
  })
  async getUserProfile(
    @CurrentUser() user: Partial<UserDocument>,
    @IsValidObjectId('userId') userId: string,
  ) {
    const currentUserProfile = await this.authService.getProfile(
      user._id.toString(),
      userId,
    );

    return generateCommonApiResponse<typeof currentUserProfile>({
      statusCode: HttpStatus.OK,
      message: 'Profile fetched successfully',
      data: currentUserProfile,
    });
  }
}
