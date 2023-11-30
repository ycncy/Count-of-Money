import { ApiProperty } from '@nestjs/swagger';

export class ApiCoinInfoModel {
  @ApiProperty()
  api_id: number;

  @ApiProperty()
  rank: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;
}
