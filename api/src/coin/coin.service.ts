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

    async getCoinsInfo(coinIds: string[]) {
        const histories: Object[] = [];

        for (const coinId of coinIds) {
            const coin = await this.getById(Number(coinId));

            if (!coin) {
                throw new NotFoundException(`Coin ${coinId} not found`);
            }

            const history = await utils.fetchCoinHistory(coin.symbol, "USD", "1d", "1d");

            if (history.error) {
                if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
            }

            histories.push({
                coinId: Number(coinId),
                symbol: history.symbol,
                last_datetime: history.datetimes[0],
                high: history.high[0],
                low: history.low[0],
                open: history.open[0],
                close: history.close[0],
                volume: history.volume[0],
            })
        }

        return histories
    }

    async getCoinHistory(coinEntity: CoinEntity, granularity: string) {
        let history = undefined;
        switch (granularity) {
            case 'month':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "7y", "1mo");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case 'week':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "7y", "1wk");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case '5days':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "7y", "5d");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case 'day':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "7y", "1d");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case 'hour':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "730d", "1h");

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            case 'minute':
                history = await utils.fetchCoinHistory(coinEntity.symbol, "USD", "7d", granularity);

                if (history.error) {
                    if (history.error.code === "Not Found") throw new NotFoundException(history.error.message);
                }

                return history;
            default:
                throw new NotFoundException("Invalid granularity, must be in [month, week, 5days, day, hour, minute]")
        }
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

    async deleteCoin(coinID: string): Promise<DeleteResult> {
        const coin: CoinEntity = await this.getById(Number(coinID));

        if (!coin) {
            throw new NotFoundException(`Coin with ID ${coinID} not found`);
        }

        return this.coinEntityRepository.delete({ id: coin.id });
    }
}