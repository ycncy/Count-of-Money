import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  UseGuards,
  Request,
  HttpException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DecodedToken } from 'src/auth/auth.dto';
import {
  AddDefaultFavoriteSwaggerDecorator,
  AddToFavoritesSwaggerDecorator,
  DeleteDefaultFavoriteSwaggerDecorator,
  GetDefaultFavoritesSwaggerDecorator,
  GetFavoritesSwaggerDecorator,
  RemoveFromFavoritesSwaggerDecorator,
} from '../swagger-decorator/favorite-swagger.decorators';
import { CoinEntity } from '../coin/entity/coin.entity';
import { DefaultFavoriteEntity } from './favorite.entity';
import { ResponseModel } from '../response-model/response.model';

@ApiBearerAuth()
@ApiTags('Favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @AddToFavoritesSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Post('coins/:coinId')
  async addToFavorites(
    @Request() req: Request & { user: DecodedToken },
    @Param('coinId') coinId: number,
  ): Promise<ResponseModel> {
    return await this.favoriteService.addToFavorites(req.user.sub, coinId);
  }

  @RemoveFromFavoritesSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Delete('coins/:coinId')
  async removeFromFavorites(
    @Request() req: Request & { user: DecodedToken },
    @Param('coinId') coinId: number,
  ) {
    return await this.favoriteService.removeFromFavorites(req.user.sub, coinId);
  }

  @GetFavoritesSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Get('users/:userId')
  async getFavorites(
    @Request() req: Request & { user: DecodedToken },
    @Param('userId') userId: number,
  ): Promise<CoinEntity[] | DefaultFavoriteEntity[]> {
    if (req.user.sub !== userId && req.user.role !== 'ADMIN') {
      throw new HttpException('Unauthorized', 401);
    }
    return this.favoriteService.getFavorites(userId);
  }

  @GetDefaultFavoritesSwaggerDecorator()
  @Get('default')
  getDefaultFavorites() {
    return this.favoriteService.getDefaultFavorites();
  }

  @AddDefaultFavoriteSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Post('default/coins/:coinId')
  async addDefaultFavorite(
    @Request() req: Request & { user: DecodedToken },
    @Param('coinId') coinId: number,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new HttpException('Unauthorized', 401);
    }
    return await this.favoriteService.addDefaultFavorite(coinId);
  }

  @DeleteDefaultFavoriteSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Delete('default/coins/:coinId')
  async deleteDefaultFavorite(
    @Request() req: Request & { user: DecodedToken },
    @Param('coinId') coinId: number,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new HttpException('Unauthorized', 401);
    }
    return await this.favoriteService.deleteDefaultFavorite(coinId);
  }
}
