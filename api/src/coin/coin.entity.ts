import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coin')
export class CoinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  fullName: string;

  @Column({
    nullable: false,
  })
  imageUrl: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @Column({
    nullable: true,
  })
  symbol: string;

  @Column('text', {
    nullable: true,
    array: true,
  })
  websites: string[];

  @Column({
    nullable: true,
    type: 'date',
  })
  creationDate: string;
}
