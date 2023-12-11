import { Module, forwardRef } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { CoinEntity } from 'src/coin/entity/coin.entity';
import { AuthModule } from 'src/auth/auth.module';
import {DefaultFavoriteEntity} from './favorite.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity, CoinEntity, DefaultFavoriteEntity]),
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController],
  exports: [FavoriteService],
})
export class FavoritesModule {}
