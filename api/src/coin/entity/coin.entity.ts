import {ApiProperty} from '@nestjs/swagger';
import {UserEntity} from 'src/user/entity/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToOne, JoinColumn
} from 'typeorm';
import {ApiCoinEntity} from "./api-coin.entity";

@Entity('coin')
export class CoinEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable: false,
        unique: true,
    })
    fullName: string;

    @ApiProperty({type: () => UserEntity})
    @ManyToMany(() => UserEntity, (user) => user.favorites)
    @JoinTable({
        name: 'favorites',
        joinColumn: {
            name: 'coinId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
    })
    users: UserEntity[];

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
