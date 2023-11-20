import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserProvider, UserRole } from './user.constants';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userRepository.save({ id, ...updateUserDto });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
