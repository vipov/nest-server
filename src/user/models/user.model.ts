import { UserEntity } from "../entities";

export enum UserRole {
  ADMIN = 'admin',
  ROOT = 'root',
}

export class TokenPayloadModel {
  user: UserEntity;
}
