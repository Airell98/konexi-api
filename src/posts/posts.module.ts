import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_NAME } from '../constants';
import { CommentSchema, Comment } from './schemas/comment.schema';
import { Post, PostSchema } from './schemas/post.schema';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MediasModule } from '../medias/medias.module';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MediasModule,
    UsersModule,
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
