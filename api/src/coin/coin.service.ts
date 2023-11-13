import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoinDto } from './dto/create-coin.dto';
import { CoinEntity } from './coin.entity';

@Injectable()
export class CoinService {
    constructor(
        @InjectRepository(CoinEntity)
        private coinEntityRepository: Repository<CoinEntity>,
    ) {}

    get_by_id(coinId: number): Promise<CoinEntity | null> {
        return this.coinEntityRepository.findOne({
            where: {
                id: coinId,
            }
        })
    }

    create(createCoinDto: CreateCoinDto): Promise<CoinEntity> {
        const coin = this.coinEntityRepository.create(createCoinDto as CoinEntity);
        return this.coinEntityRepository.save(coin);
    }
}
