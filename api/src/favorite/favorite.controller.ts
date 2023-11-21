import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  UseGuards,
  HttpCode,
  Request,
  HttpException,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DecodedToken } from 'src/auth/auth.dto';

@ApiTags('Favorites')
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
  @UseGuards(JwtAuthGuard)
  @Post(':userId/fav/:coinId')
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
  @UseGuards(JwtAuthGuard)
  @Delete(':userId/fav/:coinId')
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
  @UseGuards(JwtAuthGuard)
  @Get(':userId/fav')
  async getFavorites(
    @Request() req: Request & { user: DecodedToken },
    @Param('userId') userId: number,
  ) {
    if (req.user.sub !== userId && req.user.role !== 'ADMIN') {
      throw new HttpException('Unauthorized', 401);
    }
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
