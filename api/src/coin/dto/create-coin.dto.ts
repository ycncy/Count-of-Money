import { IsNotEmpty } from 'class-validator';

export class CreateCoinDto {
  @IsNotEmpty()
  coin_api_id: number;
}
