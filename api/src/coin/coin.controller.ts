import {
    Body,
    ConflictException,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Post
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

    @Get(':coinID/history/:period')
    async getByCoinId(@Param() params: any) {
        const { coinID, period } = params;

        try {
            const coin: CoinEntity = await this.coinService.getById(coinID);
            return await this.coinService.getCoinHistory(coin, period);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
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
