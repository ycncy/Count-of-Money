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
import {
  CreateSwaggerDecorator,
  DeleteSwaggerDecorator, EditSwaggerDecorator,
  GetAllApiCryptosSwaggerDecorator, GetByIdSwaggerDecorator,
  GetCryptosSwaggerDecorator, GetHistorySwaggerDecorator, SaveAllApiCryptosSwaggerDecorator
} from "../swaggerDecorators/coin-swagger.decorators";

@ApiTags('Crypto-currencies')
@Controller('cryptos')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @GetCryptosSwaggerDecorator()
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

  @GetAllApiCryptosSwaggerDecorator()
  @Get('/allFromApi')
  async getAllApiCryptos() {
    return await this.coinService.getAllApiCryptos();
  }

  @SaveAllApiCryptosSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Post('/allFromApi')
  async saveAllApiCryptos(@Request() req: Request & { user: DecodedToken }) {
    if (req.user.role !== 'ADMIN') throw new HttpException('Unauthorized', 401);
    return await this.coinService.saveAllApiCryptos();
  }


  @GetHistorySwaggerDecorator()
  @Get(':coinID/history/:period')
  async getHistoryByCoinId(
    @Param('coinID', ParseIntPipe) coinID: number,
    @Param('period') period: string,
  ) {
    return await this.coinService.getCoinHistory(coinID, period);
  }

  @GetByIdSwaggerDecorator()
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

  @CreateSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Post()
  createCoin(
    @Body() createCoinDto: CreateCoinDto,
    @Request() req: Request & { user: DecodedToken },
  ): Promise<CoinEntity> {
    if (req.user.role !== 'ADMIN') throw new HttpException('Unauthorized', 401);
    return this.coinService.createCoin(createCoinDto);
  }

  @EditSwaggerDecorator()
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

  @DeleteSwaggerDecorator()
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
