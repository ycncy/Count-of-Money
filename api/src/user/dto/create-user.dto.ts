import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

// import { CoinEntity } from '../coin.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  readonly baseCurrency: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  readonly keywords: string[];

  // @ApiProperty()
  // @IsOptional()
  // readonly coin: CoinEntity[];
}
