import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoinEntity } from './coin.entity';
import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { DeleteResult } from 'typeorm';
import { ListCoinInfoModel } from './model/list-coin-info.model';
import { CoinInfoModel } from './model/coin-info.model';

@ApiTags('Crypto-currencies')
@Controller('/cryptos')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @ApiOperation({
    summary: 'Get daily information about one or multiple cryptocurrencies',
  })
  @ApiResponse({
    status: 200,
    type: [ListCoinInfoModel],
    description: 'Successfully retrieved cryptocurrency information.',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(200)
  @Get()
  async getCryptos(@Query('cmids') cmids: string) {
    try {
      const coinIds: string[] = cmids ? cmids.split(',') : null;

      return await this.coinService.getCoinsInfo(coinIds);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({ summary: 'Get cryptocurrency history by ID and period' })
  @ApiResponse({
    status: 200,
    type: CoinInfoModel,
    description: 'Successfully retrieved cryptocurrency history.',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(200)
  @Get(':coinID/history/:period')
  async getHistoryByCoinId(
    @Param('coinID') coinID: number,
    @Param('period') period: string,
  ) {
    try {
      const coin: CoinEntity = await this.coinService.getById(coinID);
      return await this.coinService.getCoinHistory(coin, period);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({ summary: 'Get cryptocurrency by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved cryptocurrency.',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(200)
  @Get(':coinID')
  async getById(@Param('coinID') coinID: string): Promise<CoinEntity> {
    const coin: CoinEntity = await this.coinService.getById(Number(coinID));

    if (coin) return coin;

    throw new HttpException(
      `No coin found for ID : ${coinID}`,
      HttpStatus.NOT_FOUND,
    );
  }

  @ApiOperation({ summary: 'Create a new cryptocurrency' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new cryptocurrency.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Cryptocurrency already exists.',
  })
  @HttpCode(201)
  @Post()
  create(@Body() createCoinDto: CreateCoinDto): Promise<CoinEntity> {
    try {
      return this.coinService.create(createCoinDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }

  @ApiOperation({ summary: 'Delete cryptocurrency by ID' })
  @ApiResponse({
    status: 204,
    description: 'Successfully deleted cryptocurrency.',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(204)
  @Delete(':coinID')
  async deleteCoin(@Param('coinID') coinID: string): Promise<DeleteResult> {
    try {
      return this.coinService.deleteCoin(coinID);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
