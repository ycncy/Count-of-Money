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
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CoinEntity } from './coin.entity';
import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ListCoinInfoModel } from './model/list-coin-info.model';
import { CoinInfoModel } from './model/coin-info.model';
import { EditCoinDto } from './dto/edit-coin.dto';
import {ApiCoinInfoModel} from "./model/api-coin-info.model";

@ApiTags('Crypto-currencies')
@Controller('cryptos')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @ApiOperation({
    summary: 'Get daily information about one or multiple cryptocurrencies',
  })
  @ApiQuery({
    name: 'cmids',
    description: 'List of cryptocurrencies IDs',
    schema: {
      type: 'string',
      example: '1,2,3,4,5',
    },
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
      const coinIds: number[] = cmids
        ? cmids.split(',').map((id) => parseInt(id, 10))
        : [];

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

  @ApiOperation({
    summary: 'Get top 100 cryptocurrencies from API',
  })
  @ApiResponse({
    status: 200,
    type: [ApiCoinInfoModel],
    description: 'Successfully retrieved cryptocurrencies.',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(201)
  @Post('/allFromApi')
  async saveAllApiCryptos() {
    try {
      return await this.coinService.saveAllApiCryptos();
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }

  @ApiOperation({ summary: 'Get cryptocurrency history by ID and period' })
  @ApiResponse({
    status: 200,
    type: CoinInfoModel,
    description: 'Successfully retrieved cryptocurrency history.',
  })
  @ApiParam({
    name: 'coinID',
    description: 'ID of the cryptocurrency to get history',
    schema: {
      example: 1,
    },
  })
  @ApiParam({
    name: 'period',
    enum: ['month', 'week', '5days', 'day', 'hour', 'minute'],
    description: 'Period of time to get history',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(200)
  @Get(':coinID/history/:period')
  async getHistoryByCoinId(
    @Param('coinID', ParseIntPipe) coinID: number,
    @Param('period') period: string,
  ) {
    try {
      return await this.coinService.getCoinHistory(coinID, period);
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
  @ApiParam({
    name: 'coinID',
    description: "ID of the cryptocurrency to get it's information",
    schema: {
      example: 1,
    },
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(200)
  @Get(':coinID')
  async getById(
    @Param('coinID', ParseIntPipe) coinID: number,
  ): Promise<CoinEntity> {
    const coin: CoinEntity = await this.coinService.getById(Number(coinID));

    if (coin) return coin;

    throw new HttpException(
      `No coin found for ID : ${coinID}`,
      HttpStatus.NOT_FOUND,
    );
  }

  @ApiOperation({
    summary: 'Create a new cryptocurrency from yahoo finance API data',
  })
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

  @ApiOperation({ summary: 'Edit cryptocurrency by ID' })
  @ApiParam({
    name: 'coinID',
    description: 'ID of the cryptocurrency',
    schema: {
      example: 1,
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully edited cryptocurrency.',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(200)
  @ApiBody({ type: EditCoinDto })
  @Put(':coinID')
  async editCoin(
    @Param('coinID', ParseIntPipe) coinID: number,
    @Body() editCoinDto: EditCoinDto,
  ): Promise<UpdateResult> {
    try {
      return await this.coinService.editCoin(coinID, editCoinDto);
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

  @ApiOperation({ summary: 'Delete cryptocurrency by ID' })
  @ApiParam({
    name: 'coinID',
    description: 'ID of the cryptocurrency',
    schema: {
      example: 1,
    },
  })
  @ApiResponse({
    status: 204,
    description: 'Successfully deleted cryptocurrency.',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(204)
  @Delete(':coinID')
  async deleteCoin(
    @Param('coinID', ParseIntPipe) coinID: number,
  ): Promise<DeleteResult> {
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
