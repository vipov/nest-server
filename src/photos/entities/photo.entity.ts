import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column('text', {nullable: true})
  description: string;

  @ManyToOne(type => User, {eager: false})
  user: User
}
