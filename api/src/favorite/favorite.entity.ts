import { ApiProperty } from '@nestjs/swagger';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {CoinEntity} from "../coin/entity/coin.entity";

@Entity('default_fav')
export class DefaultFavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => CoinEntity, coin => coin.id)
  @Column({
    nullable: false,
    unique: true,
  })
  coinId: number;

  @ApiProperty()
  @Column({
    nullable: false,
    unique: true,
  })
  fullName: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  imageUrl: string;

  @ApiProperty()
  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  symbol: string;

  @ApiProperty()
  @Column('text', {
    nullable: true,
    array: true,
  })
  websites: string[];

  @ApiProperty()
  @Column({
    nullable: true,
    type: 'date',
  })
  creationDate: string;
}
