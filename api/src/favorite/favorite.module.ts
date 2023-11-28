import { Module, forwardRef } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CoinEntity } from 'src/coin/coin.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DefaultFavEntity } from './favorite.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity, CoinEntity, DefaultFavEntity]),
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoritesModule {}
