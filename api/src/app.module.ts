import { Module } from '@nestjs/common';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [CoinModule],
  controllers: [],
})
export class AppModule {}
