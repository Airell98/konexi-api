import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediasModule } from '../medias/medias.module';
import { UserSchema, User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MediasModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
