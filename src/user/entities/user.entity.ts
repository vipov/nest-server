import { Exclude } from 'class-transformer';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

export enum UserRole {
  ADMIN = 'admin',
  ROOT = 'root',
}
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column() 
  name: string;
  @Column() 
  email: string;
  
  @Column() 
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToMany(type => UserRoleEntity, role => role.users, {
      eager: true
  })
  @JoinTable()
  roles?: UserRoleEntity[];

}
export class TokenPayloadEntity {
  user: UserEntity;
}
