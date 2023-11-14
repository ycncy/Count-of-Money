import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserProvider, UserRole } from 'src/user/user.constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  generateJwt(payload: { sub: number; email: string }) {
    return this.jwtService.sign(payload);
  }

  async login(user: any) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    let userEntity: UserEntity;

    if (user.provider === UserProvider.GOOGLE) {
      userEntity = await this.userService.findOneByEmailAndProvider(
        user.email,
        UserProvider.GOOGLE,
      );
      if (!userEntity) {
        userEntity = await this.registerOAuthUser(user);
      }
    } else {
      userEntity = await this.userService.findOne(user.email);
      if (
        !userEntity ||
        !bcrypt.compareSync(user.password, userEntity.password)
      ) {
        throw new BadRequestException('Invalid credentials');
      }
    }

    return this.generateJwt({
      sub: userEntity.id,
      email: userEntity.email,
    });
  }

  async registerOAuthUser(user: CreateUserDto) {
    const newUser = {
      ...user,
      password: 'empty',
      provider: UserProvider.GOOGLE,
    };

    return this.userService.create(newUser);
  }

  async registerUser(user: CreateUserDto) {
    try {
      const userExists = await this.userService.findOne(user.email);
      if (userExists) {
        return new BadRequestException('User already exists');
      }

      const newUser = {
        ...user,
        role: UserRole.USER,
        provider: UserProvider.LOCAL,
        password: await bcrypt.hash(user.password, 10),
      };

      const userCreated = await this.userService.create(newUser);
      await this.userService.save(userCreated);

      return this.generateJwt({
        sub: userCreated.id,
        email: userCreated.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async googleAuth(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne(email);

    if (user && bcrypt.compareSync(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
