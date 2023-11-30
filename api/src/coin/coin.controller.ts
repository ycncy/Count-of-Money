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
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseFilters,
  UseGuards,
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
import { ApiCoinInfoModel } from './model/api-coin-info.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { DecodedToken } from 'src/auth/auth.dto';
import { HttpExceptionFilter } from '../globalFilters/http-exception.filter';
import { ParseArrayOptions } from '@nestjs/common/pipes/parse-array.pipe';

@ApiTags('Crypto-currencies')
@Controller('cryptos')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @ApiOperation({
    summary: 'Get daily information about one or multiple cryptocurrencies',
  })
  @ApiQuery({
    name: 'cmids',
    required: false,
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
  async getCryptos(
    @Query(
      'cmids',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
      }),
    )
    coinIds: number[],
  ) {
    if (coinIds.length === 0) {
      return await this.coinService.getAllCoinsInfo();
    } else {
      return await this.coinService.getCoinsInfo(coinIds);
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
  @HttpCode(200)
  @Get('/allFromApi')
  async getAllApiCryptos() {
    return await this.coinService.getAllApiCryptos();
  }

  @ApiOperation({
    summary: 'Get top 100 cryptocurrencies from API',
  })
  @ApiResponse({
    status: 201,
    type: [ApiCoinInfoModel],
    description: 'Successfully retrieved cryptocurrencies.',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post('/allFromApi')
  async saveAllApiCryptos(@Request() req: Request & { user: DecodedToken }) {
    if (req.user.role !== 'ADMIN') throw new HttpException('Unauthorized', 401);
    return await this.coinService.saveAllApiCryptos();
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
    return await this.coinService.getCoinHistory(coinID, period);
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
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCoinDto: CreateCoinDto,
    @Request() req: Request & { user: DecodedToken },
  ): Promise<CoinEntity> {
    if (req.user.role !== 'ADMIN') throw new HttpException('Unauthorized', 401);
    return this.coinService.create(createCoinDto);
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
  @UseGuards(JwtAuthGuard)
  @Put(':coinID')
  async editCoin(
    @Param('coinID', ParseIntPipe) coinID: number,
    @Body() editCoinDto: EditCoinDto,
    @Request() req: Request & { user: DecodedToken },
  ): Promise<UpdateResult> {
    if (req.user.role !== 'ADMIN') throw new HttpException('Unauthorized', 401);
    return await this.coinService.editCoin(coinID, editCoinDto);
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
  @UseGuards(JwtAuthGuard)
  async deleteCoin(
    @Request() req: Request & { user: DecodedToken },
    @Param('coinID', ParseIntPipe) coinID: number,
  ): Promise<DeleteResult> {
    if (req.user.role !== 'ADMIN') throw new HttpException('Unauthorized', 401);
    return this.coinService.deleteCoin(coinID);
  }
}
