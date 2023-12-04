import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';

export class CreateCoinDto {
  @ApiProperty({
    type: Number,
    required: true,
    name: 'coin_api_id',
    description: 'Cryptocurrency ID from yahoo finance API',
  })
  @IsNotEmpty()
  readonly coinApiId: number;

  @IsOptional()
  readonly user: UserEntity[];
}
