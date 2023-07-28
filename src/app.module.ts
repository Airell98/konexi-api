import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VARIABLES } from './constants';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { MediasModule } from './medias/medias.module';
import { ENV_FILE_NAME } from './constants';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>(ENV_VARIABLES.MONGODB_URI),
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_NAME,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    MediasModule,
  ],
})
export class AppModule {}
