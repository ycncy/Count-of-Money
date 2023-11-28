import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('defaultFav')
export class DefaultFavEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
