export enum RoleNames {
  ADMIN = 'admin',
  ROOT = 'root',
}

export class Role {
  id: number;
  name: RoleNames;

  constructor(user: Partial<Role>) {
    Object.assign(this, user);
  }
}

export class User {
  id?: number;
  name: string;
  email?: string;
  password?: string;
  roles?: Role[];

  constructor(user: Partial<User>) {
    this.roles = [];
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
