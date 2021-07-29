import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Roles {
  ADMIN = 'admin',
  ROOT = 'root',
}

@Entity()
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: Roles

  @ManyToMany(type => User)
  users?: User[]

  constructor(role?: Partial<Role>){ 
    super();
    Object.assign(this, role);
  }

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
  @Exclude()
  password?: string;

  @ManyToMany(type => Role, role => role.users, {eager: true})
  @JoinTable()
  roles?: Role[];
  
  constructor(user?: Partial<User>){ 
    super()
    Object.assign(this, user)
  }
}

export class TokenPayload { 
  username: string;
  sub: number;
}

export class RequestPayload {
  user: User;
  token?: string;
}
