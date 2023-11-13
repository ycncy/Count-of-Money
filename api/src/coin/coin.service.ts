import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoinDto } from './dto/create-coin.dto';
import { CoinEntity } from './coin.entity';
import * as util from "util";
import utils from "./utils";

@Injectable()
export class CoinService {
    constructor(
        @InjectRepository(CoinEntity)
        private coinEntityRepository: Repository<CoinEntity>,
    ) {}

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
    }}
