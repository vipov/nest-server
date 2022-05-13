export enum RoleNames {
  ADMIN = 'admin',
  ROOT = 'root',
}

export class Role {
  id: number;
  name: RoleNames;
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: Role[];
}

export class TokenPayload {
  username: string;
  sub: number;
}

export class RequestPayload {
  user: User
}