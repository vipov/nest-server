export enum UserRole {
  ADMIN = 'admin',
  ROOT = 'root',
}
export class UserEntity {
  id?: number;
  name: string;
  email?: string;
  password?: string;
  roles?: UserRole[];
}
export class TokenPayloadEntity {
  user: UserEntity;
}
