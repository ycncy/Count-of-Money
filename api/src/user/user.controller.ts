import {
  Controller,
  Body,
  SerializeOptions,
  Put,
  UseGuards,
  Request,
  Delete,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@SerializeOptions({ excludePrefixes: ['password', 'role', 'id'] })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<UserEntity> {
    const userId = req.user.userId;
    return await this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() req): Promise<void> {
    const userId = req.user.userId;
    return await this.usersService.delete(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Request() req): Promise<UserEntity> {
    const userId = req.user.userId;
    return await this.usersService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(): Promise<UserEntity[]> {
    return await this.usersService.getAll();
  }
}
