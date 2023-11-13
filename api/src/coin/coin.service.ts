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
        // @ts-ignore
        const coin = this.coinEntityRepository.create(createCoinDto);
        // @ts-ignore
        return this.coinEntityRepository.save(coin);
    }
}
