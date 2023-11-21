import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinModule } from './coin/coin.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorite/favorite.module';
import { PressReviewModule } from './pressReview/press-review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CoinModule,
    FavoritesModule,
    PressReviewModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
