import {
  Controller,
  SerializeOptions,
  Put,
  UseGuards,
  Request,
  Delete,
  Get,
  Param,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DecodedToken } from 'src/auth/auth.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@SerializeOptions({ excludePrefixes: ['password', 'role', 'id'] })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Update a user' })
  @ApiQuery({
    name: 'id',
    description: 'User ID',
    schema: {
      type: 'number',
      example: '1,2,3,4,5',
    },
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Successfully updated user.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @HttpCode(200)
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req: Request & { body: UpdateUserDto } & { user: DecodedToken },
    @Param('id') id: number,
  ): Promise<UserEntity> {
    const userId = req.user.sub;
    if (userId === id || req.user.role === 'ADMIN') {
      return await this.usersService.update(userId, req.body);
    }
    throw new HttpException('Unauthorized', 401);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiQuery({
    name: 'id',
    description: 'User ID',
    schema: {
      type: 'number',
      example: '1,2,3,4,5',
    },
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Successfully deleted user.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Request() req: Request & { user: DecodedToken },
    @Param('id') id: number,
  ): Promise<void> {
    const userId = req.user.sub;
    if (userId == id || req.user.role == 'ADMIN') {
      return await this.usersService.delete(userId);
    }
    throw new HttpException('Unauthorized', 401);
  }

  @ApiOperation({ summary: 'Get a user' })
  @ApiQuery({
    name: 'id',
    description: 'User ID',
    schema: {
      type: 'number',
      example: '1,2,3,4,5',
    },
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Successfully get user.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(
    @Request() req: Request & { user: DecodedToken },
    @Param('id') id: number,
  ): Promise<UserEntity> {
    const userId = req.user.sub;
    if (userId == id || req.user.role == 'ADMIN') {
      return await this.usersService.findOne(id);
    }
    throw new HttpException('Unauthorized', 401);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: [UserEntity],
    description: 'Successfully get users.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @Request() req: Request & { user: DecodedToken },
  ): Promise<UserEntity[]> {
    if (req.user.role == 'ADMIN') return await this.usersService.getAll();
    throw new HttpException('Unauthorized', 401);
  }
}
