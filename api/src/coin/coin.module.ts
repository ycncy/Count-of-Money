import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinController } from './coin.controller';
import { CoinEntity } from './coin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoinEntity])],
  providers: [CoinService],
  controllers: [CoinController],
  exports: [CoinService],
})
export class CoinModule {}
