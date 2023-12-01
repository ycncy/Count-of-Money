import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { CoinEntity } from 'src/coin/entity/coin.entity';
import { DefaultFavEntity } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(CoinEntity)
    private coinsRepository: Repository<CoinEntity>,
    @InjectRepository(DefaultFavEntity)
    private defaultFavRepository: Repository<DefaultFavEntity>,
  ) {}

  async addToFavorites(
    userId: number,
    coinId: number,
  ): Promise<{ message: string; status: number }> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (user === null) throw new NotFoundException(`User ${userId} not found`);

    const coin: CoinEntity = await this.coinsRepository.findOneBy({
      id: coinId,
    });

    if (coin === null) throw new NotFoundException(`User ${userId} not found`);

    user.favorites.push(coin);
    await this.usersRepository.save(user);
    return {
      status: 200,
      message: 'Coin added to user favorite successfully',
    };
  }

  async removeFromFavorites(
    userId: number,
    coinId: number,
  ): Promise<{ message: string; status: number }> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (user === null) throw new NotFoundException(`User ${userId} not found`);

    if (user) {
      user.favorites = user.favorites.filter((coin) => coin.id !== coinId);
      await this.usersRepository.save(user);
      return {
        status: 200,
        message: 'Coin removed from user favorite successfully',
      };
    }
  }

  async getFavorites(
    userId: number,
  ): Promise<CoinEntity[] | DefaultFavEntity[]> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (user === null) throw new NotFoundException(`User ${userId} not found`);

    if (user.favorites.length === 0) {
      return await this.getDefaultFavorites();
    }
    return user.favorites;
  }

  async getDefaultFavorites(): Promise<DefaultFavEntity[]> {
    return await this.defaultFavRepository.find();
  }

  async addDefaultFavorite(
    coinId: number,
  ): Promise<{ message: string; status: number }> {
    const coin: CoinEntity = await this.coinsRepository.findOneBy({
      id: coinId,
    });

    if (coin === null) throw new NotFoundException(`Coin ${coinId} not found`);

    await this.defaultFavRepository.save(coin);

    return {
      status: 200,
      message: 'Coin added to default favorite successfully',
    };
  }

  async deleteDefaultFavorite(
    coinId: number,
  ): Promise<{ message: string; status: number }> {
    const coin: CoinEntity = await this.coinsRepository.findOneBy({
      id: coinId,
    });

    if (coin === null) throw new NotFoundException(`Coin ${coinId} not found`);

    await this.defaultFavRepository.delete(coinId);

    return {
      status: 200,
      message: 'Coin removed from default favorite successfully',
    };
  }
}
