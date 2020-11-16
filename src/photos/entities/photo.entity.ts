import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() filename: string;

  @Column('text', {nullable: true}) description: string;

  @ManyToOne(type => UserEntity, {eager: true})
  user: UserEntity;

}
