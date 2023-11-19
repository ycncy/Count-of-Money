import { ApiProperty } from '@nestjs/swagger';

export class CoinInfoModel {
  @ApiProperty()
  coinId: number;

  @ApiProperty()
  symbol: string;

  @ApiProperty({ type: [Date] })
  datetimes: Date[];

  @ApiProperty({ type: [Number] })
  high: number[];

  @ApiProperty({ type: [Number] })
  low: number[];

  @ApiProperty({ type: [Number] })
  open: number[];

  @ApiProperty({ type: [Number] })
  close: number[];

  @ApiProperty({ type: [Number] })
  volume: number[];
}
