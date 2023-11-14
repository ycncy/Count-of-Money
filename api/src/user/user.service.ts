import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserProvider, UserRole } from './user.constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = {
      ...createUserDto,
      role: UserRole.USER,
      provider: UserProvider.LOCAL,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    this.userRepository.create(user);
    return this.userRepository.save(user);
  }

  async findOne(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneByEmailAndProvider(
    email: string,
    provider: UserProvider,
  ): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email, provider } });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }
}
