import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  UseGuards,
  Request,
  HttpException, ParseIntPipe, Query,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
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
import {Roles} from "../auth/decorators/roles.decorator";
import {AuthGuard} from "@nestjs/passport";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @AddToFavoritesSwaggerDecorator()
  @Roles(['ADMIN'])
  @Post('coins/:coinId')
  async addToFavorites(
    @Query('coinId') coinId: number,
    @Request() req: Request & { user: DecodedToken },
  ): Promise<ResponseModel> {
    return await this.favoriteService.addToFavorites(req.user.sub, coinId);
  }

  @RemoveFromFavoritesSwaggerDecorator()
  @Delete('coins/:coinId')
  async removeFromFavorites(
    @Request() req: Request & { user: DecodedToken },
    @Query('coinId') coinId: number,
  ) {
    return await this.favoriteService.removeFromFavorites(req.user.sub, coinId);
  }

  @GetFavoritesSwaggerDecorator()
  @Get('users')
  async getFavorites(
    @Request() req: Request & { user: DecodedToken },
  ): Promise<CoinEntity[] | DefaultFavoriteEntity[]> {
    return this.favoriteService.getFavorites(req.user.sub);
  }

  @GetDefaultFavoritesSwaggerDecorator()
  @Get('default')
  getDefaultFavorites() {
    return this.favoriteService.getDefaultFavorites();
  }

  @AddDefaultFavoriteSwaggerDecorator()
  @Roles(['ADMIN'])
  @Post('default/coins/:coinId')
  async addDefaultFavorite(
    @Param('coinId') coinId: number,
  ) {
    return await this.favoriteService.addDefaultFavorite(coinId);
  }

  @DeleteDefaultFavoriteSwaggerDecorator()
  @Roles(['ADMIN'])
  @Delete('default/coins/:coinId')
  async deleteDefaultFavorite(
    @Param('coinId') coinId: number,
  ) {
    return await this.favoriteService.deleteDefaultFavorite(coinId);
  }
}
