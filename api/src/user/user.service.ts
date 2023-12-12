import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {UserEntity} from './entity/user.entity';
import {UserProvider, UserRole} from './user.constants';
import * as bcrypt from 'bcrypt';
import {UpdateUserDto} from './dto/update-user.dto';
import {ResponseModel} from '../response-model/response.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            const user = {
                ...createUserDto,
                role: UserRole.USER,
                provider: UserProvider.LOCAL,
                password: await bcrypt.hash(createUserDto.password, 10),
            };

            this.userRepository.create(user);
            return this.userRepository.save(user);
        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException('Email already exists');
            } else {
                throw new InternalServerErrorException('Internal server error');
            }
        }
    }

    async findOne(id: number): Promise<UserEntity> {
        const user: UserEntity = await this.userRepository.findOne({
            where: {id},
            relations: ['favorites'],
        });
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return user;
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {email},
            relations: ['favorites'],
        });
        if (!user) {
            return null;
        }
        return user;
    }

    async findOneByEmailWithPassword(
        email: string,
    ): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({
            where: {email},
            select: [
                'id',
                'email',
                'password',
                'role',
                'provider',
                'username',
                'baseCurrency',
            ],
        });
    }

    async getAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async save(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<ResponseModel> {
        const user: UserEntity = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        await this.userRepository.update(id, updateUserDto);

        return {
            status: 200,
            message: `User ${id} updated successfully`,
        };
    }

    async delete(id: number): Promise<ResponseModel> {
        const user: UserEntity = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        await this.userRepository.delete(id);

        return {
            status: 200,
            message: 'User deleted successfully',
        };
    }

    async addKeywords(userId: number, keywords: string[]): Promise<ResponseModel> {
        const user: UserEntity = await this.userRepository.findOneBy({
            id: userId,
        });

        if (!user) {
            throw new NotFoundException(`User ${userId} not found`);
        }

        user.keywords = [...user.keywords, ...keywords];
        await this.userRepository.save(user);

        return {
            status: 200,
            message: "Keyword(s) added successfully",
        }
    }

    async removeKeyword(userId: number, keyword: string): Promise<ResponseModel> {
        const user: UserEntity = await this.userRepository.findOne(
            {
                where: {
                    id: userId
                }
            });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.keywords = user.keywords.filter(k => k !== keyword);
        await this.userRepository.save(user);

        return {
            status: 200,
            message: "Keyword(s) removed successfully",
        }
    }
}
