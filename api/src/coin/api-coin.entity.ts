import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';

@Entity('api_coin')
export class ApiCoinEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    name: string;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    rank: number;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    symbol: string;
}
