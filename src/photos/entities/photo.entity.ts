import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({nullable: true})
  description?: string;
}