import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() filename: string;

  @Column('text', {nullable: true}) description: string;

  @Column({nullable: true}) size: number;

}
