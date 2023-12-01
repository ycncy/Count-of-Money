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
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DecodedToken } from 'src/auth/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteUserSwaggerDecorator,
  GetAllUserSwaggerDecorator,
  GetMeUserSwaggerDecorator,
  GetUserSwaggerDecorator,
  UpdateMeUserSwaggerDecorator,
  UpdateUserSwaggerDecorator,
} from '../swagger-decorator/user-swagger.decorators';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@SerializeOptions({ excludePrefixes: ['password', 'role', 'id'] })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @UpdateUserSwaggerDecorator()
  @Put(':userId')
  async update(
    @Request() req: Request & { user: DecodedToken },
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId') userId: number,
  ): Promise<UserEntity> {
    const authenticatedUserId = req.user.sub;
    if (authenticatedUserId === userId || req.user.role === 'ADMIN') {
      return await this.usersService.update(userId, updateUserDto);
    }
    throw new HttpException('Unauthorized', 401);
  }

  @DeleteUserSwaggerDecorator()
  @Delete(':userId')
  async delete(
    @Request() req: Request & { user: DecodedToken },
    @Param('userId') userId: number,
  ): Promise<void> {
    const authenticatedUserId = req.user.sub;
    if (authenticatedUserId === userId || req.user.role === 'ADMIN') {
      return await this.usersService.delete(userId);
    }
    throw new HttpException('Unauthorized', 401);
  }

  @GetUserSwaggerDecorator()
  @Get(':userId')
  async get(
    @Request() req: Request & { user: DecodedToken },
    @Param('userId') userId: number,
  ): Promise<UserEntity> {
    const authenticatedUserId = req.user.sub;
    if (authenticatedUserId === userId || req.user.role === 'ADMIN') {
      return await this.usersService.findOne(userId);
    }
    throw new HttpException('Unauthorized', 401);
  }

  @GetAllUserSwaggerDecorator()
  @Get()
  async getAll(
    @Request() req: Request & { user: DecodedToken },
  ): Promise<UserEntity[]> {
    if (req.user.role !== 'ADMIN') throw new HttpException('Unauthorized', 401);
    else return await this.usersService.getAll();
  }

  @GetMeUserSwaggerDecorator()
  @Get('/profile')
  async getMe(
    @Request() req: Request & { user: DecodedToken },
  ): Promise<UserEntity> {
    return await this.usersService.findOne(req.user.sub);
  }

  @UpdateMeUserSwaggerDecorator()
  @Put('profile')
  async updateMe(
    @Request() req: Request & { user: DecodedToken },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.update(req.user.sub, updateUserDto);
  }
}
