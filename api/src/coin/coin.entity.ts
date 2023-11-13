import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoinEntity {
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
