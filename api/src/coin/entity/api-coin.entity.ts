import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('api_coin')
export class ApiCoinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Column({
    nullable: true,
  })
  api_id: number;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  rank: number;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  symbol: string;
}
