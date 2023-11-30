import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserProvider, UserRole } from 'src/user/user.constants';
import { SignInDto, SignInGoogleDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  generateJwt(payload: {
    sub: number;
    email: string;
    role: UserRole;
    provider: UserProvider;
    username: string;
    baseCurrency: string;
  }) {
    return this.jwtService.sign(payload);
  }

  async login(user: SignInDto) {
    if (!user.email || !user.password) {
      throw new UnauthorizedException('Missing email or password');
    }

    const userEntity: UserEntity =
      await this.userService.findOneByEmailWithPassword(user.email);
    if (
      !userEntity ||
      !(await bcrypt.compare(user.password, userEntity.password))
    ) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      token: this.generateJwt({
        sub: userEntity.id,
        email: userEntity.email,
        role: userEntity.role,
        provider: userEntity.provider,
        username: userEntity.username,
        baseCurrency: userEntity.baseCurrency,
      }),
    };
  }

  async loginGoogle(user: SignInGoogleDto) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }
    let userEntity: UserEntity;

    userEntity = await this.userService.findOneByEmail(user.email);
    if (!userEntity) {
      userEntity = await this.registerOAuthUser({
        ...user,
        password: 'empty',
        baseCurrency: 'USD',
        keywords: [],
      });
    }

    return {
      token: this.generateJwt({
        sub: userEntity.id,
        email: userEntity.email,
        role: userEntity.role,
        provider: userEntity.provider,
        username: userEntity.username,
        baseCurrency: userEntity.baseCurrency,
      }),
    };
  }

  async registerOAuthUser(user: CreateUserDto) {
    const newUser = {
      ...user,
      password: 'empty',
      provider: UserProvider.GOOGLE,
      role: UserRole.USER,
    };

    return this.userService.create(newUser);
  }

  async registerUser(user: CreateUserDto) {
    try {
      const userExists: UserEntity = await this.userService.findOneByEmail(
        user.email,
      );

      if (userExists !== null) {
        throw new ConflictException('User already exists');
      }

      const newUser = {
        ...user,
        role: UserRole.USER,
        provider: UserProvider.LOCAL,
        password: user.password,
      };

      const userCreated = await this.userService.create(newUser);
      await this.userService.save(userCreated);
      return {
        token: this.generateJwt({
          sub: userCreated.id,
          email: userCreated.email,
          role: userCreated.role,
          provider: userCreated.provider,
          username: userCreated.username,
          baseCurrency: userCreated.baseCurrency,
        }),
      };
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
    const user = await this.userService.findOneByEmail(email);

    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }

    return null;
  }
}
