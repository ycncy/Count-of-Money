import { Module, forwardRef } from '@nestjs/common';
import { CoinService } from './coin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinController } from './coin.controller';
import { CoinEntity } from './entity/coin.entity';
import { ApiCoinEntity } from './entity/api-coin.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([CoinEntity, ApiCoinEntity]),
  ],
  providers: [CoinService],
  controllers: [CoinController],
  exports: [CoinService],
})
export class CoinModule {}
