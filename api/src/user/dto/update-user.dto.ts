import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CoinEntity } from 'src/coin/entity/coin.entity';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  readonly username: string;

  @ApiProperty()
  @IsOptional()
  readonly email: string;

  //TODO create enum for baseCurrency
  @ApiProperty()
  @IsOptional()
  readonly baseCurrency: string;

  @ApiProperty()
  @IsOptional()
  password: string;
}
