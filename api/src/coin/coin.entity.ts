import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  full_name: string;

  @Column({
    nullable: false,
  })
  image_url: string;
}
