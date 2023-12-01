import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

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

  @ApiProperty({ type: () => UserEntity })
  @ManyToMany(() => UserEntity, (user) => user.favorites)
  @JoinTable({
    name: 'favorites', // Nom personnalisé pour la table de jointure
    joinColumn: {
      name: 'coin_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
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
