import {ConflictException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {CreateCoinDto} from './dto/create-coin.dto';
import {CoinEntity} from './coin.entity';
import utils from "./utils";

@Injectable()
export class CoinService {
    constructor(
        @InjectRepository(CoinEntity)
        private coinEntityRepository: Repository<CoinEntity>,
    ) {
    }

    getById(coinId: number): Promise<CoinEntity | null> {
        return this.coinEntityRepository.findOne({
            where: {
                id: coinId,
            }
        })
    }

    async create(createCoinDto: CreateCoinDto): Promise<CoinEntity> {
        try {
            const coinEntityFromApi: CoinEntity = await utils.fetchCoinInfo(createCoinDto.coin_api_id);
            const coin = this.coinEntityRepository.create(coinEntityFromApi);
            return await this.coinEntityRepository.save(coin);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Coin already exists');
            } else {
                throw new InternalServerErrorException('Internal Server Error');
            }
        }
    }

    async getCoinHistory(coinEntity: CoinEntity, granularity: string) {
        let history = undefined;
        switch (granularity) {
            case 'month':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "1mo");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case 'week':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "1wk");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case '5days':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "5d");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case 'day':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "1d");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case 'hour':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "1h");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case 'minute':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", granularity);

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            default:
                throw new NotFoundException("Invalid granularity, must be in [month, week, 5days, day, hour, minute]")
        }
    }

    async deleteCoin(coinID: string): Promise<DeleteResult> {
        const coin: CoinEntity = await this.getById(Number(coinID));

        if (!coin) {
            throw new NotFoundException(`Coin with ID ${coinID} not found`);
        }

        return this.coinEntityRepository.delete({ id: coin.id });
    }
}