import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoinEntity } from './entity/coin.entity';
import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { EditCoinDto } from './dto/edit-coin.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { DecodedToken } from 'src/auth/auth.dto';
import {
  CreateSwaggerDecorator,
  DeleteSwaggerDecorator,
  EditSwaggerDecorator,
  GetAllApiCryptosSwaggerDecorator,
  GetByIdSwaggerDecorator,
  GetCryptosSwaggerDecorator,
  GetHistorySwaggerDecorator,
  SaveAllApiCryptosSwaggerDecorator,
} from '../swagger-decorator/coin-swagger.decorators';

@ApiTags('Crypto-currencies')
@Controller('coins')
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
        optional: true,
      }),
    )
    coinIds: number[] = [],
  ) {
    return await this.coinService.getCoinsInfo(coinIds);
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
  @Get(':coinId/history/:period')
  async getHistoryByCoinId(
    @Param('coinId', ParseIntPipe) coinID: number,
    @Param('period') period: string,
  ) {
    return await this.coinService.getCoinHistory(coinID, period);
  }

  @GetByIdSwaggerDecorator()
  @Get(':coinId')
  async getById(
    @Param('coinId', ParseIntPipe) coinID: number,
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
  @Put(':coinId')
  async editCoin(
    @Param('coinId', ParseIntPipe) coinID: number,
    @Body() editCoinDto: EditCoinDto,
    @Request() req: Request & { user: DecodedToken },
  ): Promise<{ message: string; status: number }> {
    if (req.user.role !== 'ADMIN') throw new HttpException('Unauthorized', 401);
    return await this.coinService.editCoin(coinID, editCoinDto);
  }

  @DeleteSwaggerDecorator()
  @Delete(':coinId')
  @UseGuards(JwtAuthGuard)
  async deleteCoin(
    @Request() req: Request & { user: DecodedToken },
    @Param('coinId', ParseIntPipe) coinID: number,
  ): Promise<{ message: string; status: number }> {
    if (req.user.role !== 'ADMIN') throw new HttpException('Unauthorized', 401);
    return this.coinService.deleteCoin(coinID);
  }
}
