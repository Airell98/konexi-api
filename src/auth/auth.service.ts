import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ERROR_MESSAGES } from '../constants';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(payload: SignupDto) {
    return this.userService.createNewUser(payload);
  }

  async signin({ username, password }: SigninDto) {
    const user = await this.userService.findUserByUsername(username);

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.FAILED_LOGIN,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new HttpException(
        ERROR_MESSAGES.FAILED_LOGIN,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const jwtPayload = { _id: user._id, username: user.username };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return jwtToken;
  }

  async getCurrentUserProfile(_id: string) {
    const profile = await this.userService.getCurrentUserProfile(_id);

    return profile;
  }

  async getProfile(_id: string, otherUserId: string) {
    const profile = await this.userService.getProfile(_id, otherUserId);

    return profile;
  }

  async updateProfile(
    updateProfileDto: UpdateProfileDto,
    _id: string,
    imageFile?: Express.Multer.File,
  ) {
    const updateProfilePayload = {
      _id: _id,
      name: updateProfileDto.name,
      username: updateProfileDto.username,
      email: updateProfileDto.email,
      imageFile: imageFile,
    };

    const updatedProfile = await this.userService.updateProfile(
      updateProfilePayload,
    );

    return updatedProfile;
  }
}
