import {
    Body,
    ConflictException,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Req
} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CoinEntity} from "./coin.entity";
import {CoinService} from "./coin.service";
import {CreateCoinDto} from "./dto/create-coin.dto";

@ApiTags("Crypto-currencies")
@Controller('/api/cryptos')
export class CoinController {

    constructor(
        private readonly coinService: CoinService
    ) {
    }

    @HttpCode(200)
    @Get(':coinID')
    async getById(@Param() params: any): Promise<CoinEntity> {
        const { coinID } = params;

        const coin: CoinEntity = await this.coinService.getById(coinID);

        if (coin) return coin;

        throw new HttpException(`No coin found for ID : ${coinID}`, HttpStatus.NOT_FOUND)
    }

    @HttpCode(201)
    @Post()
    create(@Body() createCoinDto: CreateCoinDto): Promise<CoinEntity> {
        try {
            return this.coinService.create(createCoinDto);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new HttpException(error.message, HttpStatus.CONFLICT);
            }
        }
    }
}
