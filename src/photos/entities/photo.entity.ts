import { Type } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() filename: string;

  @Column('text', {nullable: true}) description: string;

  @Column({nullable: true}) size: number;

  @ManyToOne(type => UserEntity, {eager: true})
  @Type(() => UserEntity)
  user: UserEntity
}
