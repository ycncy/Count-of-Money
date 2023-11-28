import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CoinEntity } from 'src/coin/coin.entity';
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

  async addToFavorites(userId: number, coinId: number): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    const coin = await this.coinsRepository.findOneBy({ id: coinId });

    if (user && coin) {
      user.favorites.push(coin);
      await this.usersRepository.save(user);
    }
  }

  async removeFromFavorites(userId: number, coinId: number): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (user) {
      user.favorites = user.favorites.filter((coin) => coin.id !== coinId);
      await this.usersRepository.save(user);
    }
  }

  async getFavorites(
    userId: number,
  ): Promise<CoinEntity[] | DefaultFavEntity[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    if (user.favorites.length === 0) {
      return await this.getDefaultFavorites();
    }
    return user.favorites;
  }

  async getDefaultFavorites(): Promise<DefaultFavEntity[]> {
    const fav = await this.defaultFavRepository.find();
    return fav;
  }

  async addDefaultFavorite(coinId: number): Promise<void> {
    const coin = await this.coinsRepository.findOneBy({ id: coinId });

    await this.defaultFavRepository.save(coin);
  }

  async deleteDefaultFavorite(coinId: number): Promise<void> {
    await this.defaultFavRepository.delete(coinId);
  }
}
