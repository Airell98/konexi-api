import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

import { User } from '../../users/schemas/user.schema';

import { CommentSchema, Comment } from './comment.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: NativeSchema.Types.ObjectId, ref: 'User', required: true })
  author: Partial<User>;

  @Prop({ index: true })
  caption: string;

  @Prop({ required: true })
  imageName: string;

  @Prop({
    type: [CommentSchema],
  })
  comments: Comment[];

  @Prop({ type: [{ type: NativeSchema.Types.ObjectId, ref: 'User' }] })
  likes: User[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
