import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToMany,
} from 'typeorm';
import { UserProvider, UserRole } from '../user.constants';
import { CoinEntity } from 'src/coin/entity/coin.entity';

@Entity('user')
export class UserEntity {
  @ApiProperty()
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column({ nullable: true, select: false })
  password: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column({ default: 'EUR' })
  baseCurrency: string;

  @ApiProperty({ type: () => CoinEntity })
  @ManyToMany(() => CoinEntity, (coin) => coin.users)
  favorites: CoinEntity[];

  @ApiProperty()
  @Column('text', { array: true, default: '{}' })
  keywords: string[];

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: UserProvider })
  @IsEnum(UserProvider)
  @Column({ type: 'enum', enum: UserProvider })
  provider: UserProvider;
}
