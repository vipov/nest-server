export enum Roles {
  ROOT = 'root',
  ADMIN = 'admin',
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

  constructor(user: Partial<User>){ Object.assign(this, user)}
}