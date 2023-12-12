import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoinDto } from './dto/create-coin.dto';
import { CoinEntity } from './entity/coin.entity';
import utils, { Granularity } from './utils';
import { CoinInfoModel } from './model/coin-info.model';
import { ListCoinInfoModel } from './model/list-coin-info.model';
import { ErrorModel } from '../response-model/error.model';
import { EditCoinDto } from './dto/edit-coin.dto';
import { ApiCoinEntity } from './entity/api-coin.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ResponseModel } from '../response-model/response.model';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(CoinEntity)
    private coinEntityRepository: Repository<CoinEntity>,
    @InjectRepository(ApiCoinEntity)
    private apiCoinEntityRepository: Repository<ApiCoinEntity>,
  ) {}

  getById(coinId: number): Promise<CoinEntity | null> {
    return this.coinEntityRepository.findOne({
      where: {
        id: coinId,
      },
    });
  }

  getAllApiCryptos(options: IPaginationOptions) {
    return paginate<ApiCoinEntity>(this.apiCoinEntityRepository, options);
  }

  async getCoinsInfo(coinIds: number[] = []) {
    const histories: ListCoinInfoModel[] = [];

    if (coinIds.length === 0) {
      const coins: CoinEntity[] = await this.coinEntityRepository.find();

      for (const coin of coins) {
        await this.processCoin(coin, histories);
      }
    } else {
      for (const coinId of coinIds) {
        const coin: CoinEntity = await this.getById(coinId);

        if (!coin) {
          throw new NotFoundException(`Coin ${coinId} not found`);
        }

        await this.processCoin(coin, histories);
      }
    }

    return histories;
  }

  private async processCoin(coin: CoinEntity, histories: ListCoinInfoModel[]) {
    if (!coin) {
      throw new NotFoundException(`Coin ${coin.id} not found`);
    }

    const history: CoinInfoModel | ErrorModel = await utils.fetchCoinHistory(
      coin.id,
      coin.symbol,
      'USD',
      '1d',
      '1d',
    );

    if (history instanceof ErrorModel) {
      if (history.error.status === 404) {
        throw new NotFoundException(history.error.message);
      }
    } else {
      const coinInfo: ListCoinInfoModel = {
        coinId: coin.id,
        symbol: history.symbol,
        imageUrl: coin.imageUrl,
        lastDatetime: history.datetimes[0],
        high: history.high[0],
        low: history.low[0],
        open: history.open[0],
        close: history.close[0],
        volume: history.volume[0],
      };

      histories.push(coinInfo);
    }
  }

  async saveAllApiCryptos() {
    try {
      const data = await utils.fetchAllApiCryptos();

      const addedCoin: Array<ApiCoinEntity> = [];

      await Promise.all(
        data.map(async (coin) => {
          const existingCoin: ApiCoinEntity =
            await this.apiCoinEntityRepository.findOne({
              where: {
                symbol: coin.symbol,
              },
            });

          const newCoin: ApiCoinEntity = new ApiCoinEntity();

          newCoin.apiId = coin.apiId;
          newCoin.rank = coin.rank;
          newCoin.name = coin.name;
          newCoin.symbol = coin.symbol;

          if (existingCoin) {
            await this.apiCoinEntityRepository.update(
              { apiId: coin.apiId },
              newCoin,
            );
          } else {
            addedCoin.push(newCoin);
            await this.apiCoinEntityRepository.save(newCoin);
          }
        }),
      );

      return addedCoin;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getCoinHistory(coinID: number, granularity: Granularity) {
    const coinEntity: CoinEntity = await this.getById(coinID);

    if (!coinEntity) {
      throw new NotFoundException(`Coin ${coinID} not found`);
    }
    let history = undefined;
    switch (granularity) {
      case Granularity.MONTH:
        history = await utils.fetchCoinHistory(
          coinEntity.id,
          coinEntity.symbol,
          'USD',
          '7y',
          '1mo',
        );

        if (history.error) {
          if (history.error.code === 'Not Found')
            throw new NotFoundException(history.error.message);
        }

        return history;
      case Granularity.WEEK:
        history = await utils.fetchCoinHistory(
          coinEntity.id,
          coinEntity.symbol,
          'USD',
          '7y',
          '1wk',
        );

        if (history.error) {
          if (history.error.code === 'Not Found')
            throw new NotFoundException(history.error.message);
        }

        return history;
      case Granularity.FIVE_DAYS:
        history = await utils.fetchCoinHistory(
          coinEntity.id,
          coinEntity.symbol,
          'USD',
          '7y',
          '5d',
        );

        if (history.error) {
          if (history.error.code === 'Not Found')
            throw new NotFoundException(history.error.message);
        }

        return history;
      case Granularity.DAY:
        history = await utils.fetchCoinHistory(
          coinEntity.id,
          coinEntity.symbol,
          'USD',
          '3y',
          '1d',
        );

        if (history.error) {
          if (history.error.code === 'Not Found')
            throw new NotFoundException(history.error.message);
        }

        return history;
      case Granularity.HOUR:
        history = await utils.fetchCoinHistory(
          coinEntity.id,
          coinEntity.symbol,
          'USD',
          '90d',
          '1h',
        );

        if (history.error) {
          if (history.error.code === 'Not Found')
            throw new NotFoundException(history.error.message);
        }

        return history;
      case Granularity.MINUTE:
        history = await utils.fetchCoinHistory(
          coinEntity.id,
          coinEntity.symbol,
          'USD',
          '1d',
          '1m',
        );

        if (history.error) {
          if (history.error.code === 'Not Found')
            throw new NotFoundException(history.error.message);
        }

        return history;
      default:
        throw new NotFoundException(
          'Invalid granularity, must be in [MONTH, WEEK, FIVE_DAYS, DAY, HOUR, MINUTE]',
        );
    }
  }

  async createCoin(createCoinDto: CreateCoinDto): Promise<CoinEntity> {
    const coinIdFromDatabase: ApiCoinEntity | undefined =
      await this.apiCoinEntityRepository.findOne({
        where: {
          apiId: createCoinDto.coinApiId,
        },
      });

    if (!coinIdFromDatabase) {
      throw new NotFoundException('Coin not found, invalid coin ID');
    }

    const coinEntityFromApi: CoinEntity = await utils.fetchCoinInfo(
      coinIdFromDatabase.apiId,
    );

    const existingCoin: CoinEntity | undefined =
      await this.coinEntityRepository.findOne({
        where: {
          fullName: coinEntityFromApi.fullName,
        },
      });

    if (existingCoin) {
      throw new ConflictException('Coin already exists');
    }

    const coin: CoinEntity =
      this.coinEntityRepository.create(coinEntityFromApi);
    return await this.coinEntityRepository.save(coin);
  }

  async editCoin(
    coinID: number,
    editCoinDto: EditCoinDto,
  ): Promise<ResponseModel> {
    const coin: CoinEntity = await this.getById(coinID);

    if (!coin) {
      throw new NotFoundException(`Coin with ID ${coinID} not found`);
    }

    await this.coinEntityRepository.update({ id: +coinID }, editCoinDto);

    return {
      status: 200,
      message: `Coin ${coinID} updated successfully`,
    };
  }

  async deleteCoin(coinID: number): Promise<ResponseModel> {
    const coin: CoinEntity = await this.getById(coinID);

    if (!coin) {
      throw new NotFoundException(`Coin with ID ${coinID} not found`);
    }

    await this.coinEntityRepository.delete({ id: coin.id });

    return {
      status: 200,
      message: `Coin ${coinID} deleted successfully`,
    };
  }
}
