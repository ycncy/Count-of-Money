import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinController } from './coin.controller';
import { CoinEntity } from './coin.entity';
import { ApiCoinEntity } from './api-coin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoinEntity]),
    TypeOrmModule.forFeature([ApiCoinEntity]),
  ],
  providers: [CoinService],
  controllers: [CoinController],
  exports: [CoinService],
})
export class CoinModule {}
