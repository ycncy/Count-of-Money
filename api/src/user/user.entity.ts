import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UserProvider, UserRole } from './user.constants';

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
  @Column({ nullable: true })
  password: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column({ default: 'EUR' })
  baseCurrency: string;

  //TODO relation avec la table coin
  // @Column({ default: [] })
  // coin: Array<string>;

  @ApiProperty()
  @Column('text', { array: true, default: '{}' })
  keywords: string[];

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: UserProvider })
  @Column()
  @IsEnum(UserProvider)
  provider: UserProvider;
}
