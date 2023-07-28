import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

import { ENV_VARIABLES } from '../constants';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>(ENV_VARIABLES.SECRET_KEY),
          signOptions: { expiresIn: '3h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
