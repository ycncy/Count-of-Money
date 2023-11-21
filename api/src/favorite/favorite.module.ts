import { Module, forwardRef } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CoinEntity } from 'src/coin/coin.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity, CoinEntity]),
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoritesModule {}
