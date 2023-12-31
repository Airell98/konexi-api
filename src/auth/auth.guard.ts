import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { UserDocument } from '../users/schemas/user.schema';
import { ENV_VARIABLES, ERROR_MESSAGES } from '../constants/index';
import { UsersService } from 'src/users/users.service';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<UserDocument>;
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException(
        ERROR_MESSAGES.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload: Partial<UserDocument> = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>(ENV_VARIABLES.SECRET_KEY),
        },
      );

      const userData = await this.userService.findUserById(
        payload._id.toString(),
      );

      if (!userData) {
        throw new HttpException(
          ERROR_MESSAGES.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );
      }

      request.user = payload;
    } catch {
      throw new HttpException(
        ERROR_MESSAGES.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
