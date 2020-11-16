import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

@Entity()
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn() 
  id: number;

  @Column() 
  name: string;

  @Column() 
  email: string;

  @Column() 
  @Exclude()
  password: string;

  @ManyToMany(type => UserRoleEntity, role => role.users, {
      eager: true
  })
  @JoinTable()
  roles?: UserRoleEntity[];

}
