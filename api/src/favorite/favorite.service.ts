import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CoinEntity } from 'src/coin/coin.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(CoinEntity)
    private coinsRepository: Repository<CoinEntity>,
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

  async getFavorites(userId: number): Promise<CoinEntity[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    if (user.favorites.length === 0) {
      return await this.getGlobalFavorites();
    }
    return user.favorites;
  }

  async getGlobalFavorites(): Promise<CoinEntity[]> {
    const user = await this.usersRepository.findOne({
      where: { id: 1 },
      relations: ['favorites'],
    });
    return user.favorites;
  }
}
