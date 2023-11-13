import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { UserEntity } from '../../user/user.entity';

export class CreateCoinDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly coin_api_id: number;

  // @ApiProperty()
  // @IsOptional()
  // readonly user: UserEntity[];
}
