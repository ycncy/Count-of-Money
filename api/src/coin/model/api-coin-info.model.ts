import { ApiProperty } from '@nestjs/swagger';

export class ApiCoinInfoModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    rank: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    symbol: string;
}
