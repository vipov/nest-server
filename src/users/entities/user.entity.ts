
export enum Roles {
  ADMIN = 'admin',
  ROOT = 'root',
}

export class Role {
  id: number;
  name: Roles

  constructor(user: Partial<Role>){ Object.assign(this, user)}
}

export class User {
  id?: number;
  name: string;
  email?: string;
  password?: string;
  roles?: Role[];

  constructor(user: Partial<User>){ 
    if(!user.roles) {
      user.roles = [];
    }
    Object.assign(this, user)
  }
}

export class TokenPayload { 
  username: string;
  sub: number;
}

export class RequestPayload {
  user: User
}
