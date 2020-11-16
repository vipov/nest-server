import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column() 
  name: string;

  @ManyToMany(type => UserEntity, user => user.roles)
  users: UserEntity;
}
