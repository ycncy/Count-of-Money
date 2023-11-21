import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({ summary: 'Add a cryptocurrency to favorites' })
  @ApiQuery({
    name: 'userId',
    description: 'User ID',
    schema: {
      type: 'number',
      example: '1',
    },
  })
  @ApiQuery({
    name: 'coinId',
    description: 'Cryptocurrency ID',
    schema: {
      type: 'number',
      example: '1',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully added cryptocurrency to favorites.',
  })
  @ApiResponse({
    status: 404,
    description: 'User or cryptocurrency not found.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @HttpCode(200)
  @Post(':userId/fav/:coinId')
  addToFavorites(
    @Param('userId') userId: number,
    @Param('coinId') coinId: number,
  ) {
    return this.favoriteService.addToFavorites(userId, coinId);
  }

  @ApiOperation({ summary: 'Remove a cryptocurrency from favorites' })
  @ApiQuery({
    name: 'userId',
    description: 'User ID',
    schema: {
      type: 'number',
      example: '1',
    },
  })
  @ApiQuery({
    name: 'coinId',
    description: 'Cryptocurrency ID',
    schema: {
      type: 'number',
      example: '1',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed cryptocurrency from favorites.',
  })
  @ApiResponse({
    status: 404,
    description: 'User or cryptocurrency not found.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @HttpCode(200)
  @Delete(':userId/fav/:coinId')
  removeFromFavorites(
    @Param('userId') userId: number,
    @Param('coinId') coinId: number,
  ) {
    return this.favoriteService.removeFromFavorites(userId, coinId);
  }

  @ApiOperation({ summary: 'Get user favorites' })
  @ApiQuery({
    name: 'userId',
    description: 'User ID',
    schema: {
      type: 'number',
      example: '1',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully get user favorites.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @HttpCode(200)
  @Get(':userId/fav')
  getFavorites(@Param('userId') userId: number) {
    return this.favoriteService.getFavorites(userId);
  }

  @ApiOperation({ summary: 'Get global favorites' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get global favorites.',
  })
  @HttpCode(200)
  @Get('globalfav')
  getGlobalFavorites() {
    return this.favoriteService.getGlobalFavorites();
  }
}
