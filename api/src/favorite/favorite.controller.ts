import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { DecodedToken } from 'src/auth/auth.dto';
import {
  AddDefaultFavoriteSwaggerDecorator,
  AddToFavoritesSwaggerDecorator,
  DeleteDefaultFavoriteSwaggerDecorator,
  GetDefaultFavoritesSwaggerDecorator,
  GetFavoritesSwaggerDecorator,
  RemoveFromFavoritesSwaggerDecorator,
} from '../swaggerDecorators/favorite-swagger.decorators';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @AddToFavoritesSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Post(':userId/coin/:coinId')
  async addToFavorites(
    @Request() req: Request & { user: DecodedToken },
    @Param('userId') userId: number,
    @Param('coinId') coinId: number,
  ) {
    if (req.user.sub !== userId && req.user.role !== 'ADMIN') {
      throw new HttpException('Unauthorized', 401);
    }
    return await this.favoriteService.addToFavorites(userId, coinId);
  }

  @RemoveFromFavoritesSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Delete(':userId/coin/:coinId')
  async removeFromFavorites(
    @Request() req: Request & { user: DecodedToken },
    @Param('userId') userId: number,
    @Param('coinId') coinId: number,
  ) {
    if (req.user.sub !== userId && req.user.role !== 'ADMIN') {
      throw new HttpException('Unauthorized', 401);
    }
    return await this.favoriteService.removeFromFavorites(userId, coinId);
  }

  @GetFavoritesSwaggerDecorator()
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getFavorites(
    @Request() req: Request & { user: DecodedToken },
    @Param('userId') userId: number,
  ) {
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
  @Post('default/:coinId')
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
  @Delete('default/:coinId')
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
