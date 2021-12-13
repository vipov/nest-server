export enum UserRoleName {
  ADMIN = 'admin',
  ROOT = 'root',
}

export class UserRole {
  id: number;
  name: UserRoleName;

  constructor(user: Partial<UserRole>) {
    Object.assign(this, user);
  }
}

export class User {
  id?: number;
  name: string;
  email?: string;
  password?: string;
  roles?: UserRole[] = [];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}

export class TokenPayload {
  username: string;
  sub: number;
}

export class RequestPayload {
  user: User;
}
