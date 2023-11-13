import {Body, Controller, Get, HttpCode, Param, Post, Req} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CoinEntity} from "./coin.entity";
import {CoinService} from "./coin.service";
import {CreateCoinDto} from "./dto/create-coin.dto";

@ApiTags("Crypto-currencies")
@Controller('/api/cryptos')
export class CoinController {

    constructor(
        private readonly coinService: CoinService
    ) {}

    @HttpCode(200)
    @Get(':coinID')
    get_by_id(@Param() params: any): Promise<CoinEntity> {
        const { coinID } = params;
        return this.coinService.get_by_id(coinID);
    }

    @HttpCode(201)
    @Post()
    create(@Body() createCoinDto: CreateCoinDto): Promise<CoinEntity> {
        return this.coinService.create(createCoinDto);
    }
}
