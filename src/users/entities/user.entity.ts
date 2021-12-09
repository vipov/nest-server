import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRoleName {
  ADMIN = 'admin',
  ROOT = 'root',
}

export class UserRole {
  id: number;
  name: UserRoleName

  constructor(user: Partial<UserRole>){ Object.assign(this, user)}
}

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  email?: string;
  
  @Column()
  @Exclude({toPlainOnly: true})
  password?: string;

  roles?: UserRole[] = [];

}

export class TokenPayload { 
  username: string;
  sub: number;
}

export class RequestPayload {
  token: string;
  user: User;
}
