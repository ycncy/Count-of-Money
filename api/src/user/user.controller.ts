import { Controller, Post, Body, SerializeOptions } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@SerializeOptions({ excludePrefixes: ['password', 'role', 'id'] })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = {
      ...createUserDto,
      role: 'USER',
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    return this.usersService.create(user);
  }
}
