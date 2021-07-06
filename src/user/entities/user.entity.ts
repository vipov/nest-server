import { Exclude } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  ROOT = 'root',
}
export class UserEntity {
  id?: number;
  name: string;
  email?: string;
  @Exclude({ toPlainOnly: true })
  password?: string;
  roles?: UserRole[];

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
export class TokenPayloadEntity {
  user: UserEntity;
}
