import {ApiProperty} from '@nestjs/swagger';
import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne} from 'typeorm';
import {CoinEntity} from "./coin.entity";

@Entity('api_coin')
export class ApiCoinEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    @Column({
        nullable: true,
    })
    apiId: number;

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

    @ApiProperty()
    @Column({
        nullable: true,
    })
    imageUrl: string;

    @ApiProperty()
    @Column({
        nullable: false,
        default: false,
    })
    addedToLocal: boolean;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    @OneToOne(() => CoinEntity, (coin) => coin.id)
    localCoinId: number;
}
