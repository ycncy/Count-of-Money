import { ApiProperty } from '@nestjs/swagger';

export class ListCoinInfoModel {
  @ApiProperty()
  coinId: number;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  lastDatetime: Date;

  @ApiProperty()
  high: number;

  @ApiProperty()
  low: number;

  @ApiProperty()
  open: number;

  @ApiProperty()
  close: number;

  @ApiProperty()
  volume: number;
}
