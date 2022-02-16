import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export enum RoleNames {
  ADMIN = 'admin',
  ROOT = 'root',
}

@Schema()
export class Role extends Document {
  @Prop({ type: String, enum: Object.keys(RoleNames) })
  name: RoleNames;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email?: string;

  @Prop()
  password?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles?: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export class TokenPayload {
  username: string;
  sub: number;
}

export class RequestPayload {
  companyName?: string;
  user: User;
}
