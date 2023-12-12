import { ApiProperty } from '@nestjs/swagger';

export class ApiCoinInfoModel {
  @ApiProperty()
  apiId: number;

  @ApiProperty()
  rank: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;
}
