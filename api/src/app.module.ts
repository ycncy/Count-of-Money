import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinModule } from './coin/coin.module';
import { AuthModule } from './auth/auth.module';
import { ExcludePasswordInterceptor } from './exclude-password.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: `cashmoney`,
      password: `bitcoinisking`,
      database: `cashmoney`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CoinModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ExcludePasswordInterceptor },
  ],
  controllers: [],
})
export class AppModule {}
