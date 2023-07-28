import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MediasService } from './medias.service';
import { ENV_FILE_NAME } from '../constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ENV_FILE_NAME,
    }),
  ],
  providers: [MediasService],
  exports: [MediasService],
})
export class MediasModule {}
