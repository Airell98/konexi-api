import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as NativeSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  profileImage?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: NativeSchema.Types.ObjectId, ref: 'User' }] })
  followers: Partial<User>[];

  @Prop({ type: [{ type: NativeSchema.Types.ObjectId, ref: 'User' }] })
  following: Partial<User>[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
