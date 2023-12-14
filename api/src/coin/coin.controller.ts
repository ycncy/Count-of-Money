import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
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
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { CoinEntity } from './entity/coin.entity';
import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { EditCoinDto } from './dto/edit-coin.dto';
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
import { ResponseModel } from '../response-model/response.model';
import { ListCoinInfoModel } from './model/list-coin-info.model';
import {RolesGuard} from "../auth/guard/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {AuthGuard} from "@nestjs/passport";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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
        exceptionFactory: () => {
          throw new BadRequestException(
            "Invalid parameter 'cmids': must be a valid list",
          );
        },
      }),
    )
    coinIds: number[] = [],
  ): Promise<ListCoinInfoModel[]> {
    return await this.coinService.getCoinsInfo(coinIds);
  }

  @Roles(['ADMIN'])
  @GetAllApiCryptosSwaggerDecorator()
  @Get('/allFromApi')
  async getAllApiCryptos(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return await this.coinService.getAllApiCryptos({
      page,
      limit,
      route: 'http://localhost:5000/api/coins/allFromApi',
    });
  }

  @SaveAllApiCryptosSwaggerDecorator()
  @Roles(['ADMIN'])
  @Post('/allFromApi')
  async saveAllApiCryptos() {
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
  @Roles(['ADMIN'])
  @Post()
  createCoin(
    @Body() createCoinDto: CreateCoinDto,
  ): Promise<CoinEntity> {
    return this.coinService.createCoin(createCoinDto);
  }

  @EditSwaggerDecorator()
  @Roles(['ADMIN'])
  @Put(':coinId')
  async editCoin(
    @Param('coinId', ParseIntPipe) coinID: number,
    @Body() editCoinDto: EditCoinDto,
  ): Promise<ResponseModel> {
    return await this.coinService.editCoin(coinID, editCoinDto);
  }

  @DeleteSwaggerDecorator()
  @Roles(['ADMIN'])
  @Delete(':coinId')
  async deleteCoin(
    @Request() req: Request & { user: DecodedToken },
    @Param('coinId', ParseIntPipe) coinID: number,
  ): Promise<ResponseModel> {
    return this.coinService.deleteCoin(coinID);
  }
}
