import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto, SignInGoogleDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  GoogleCallbackSwaggerDecorator,
  GoogleLoginSwaggerDecorator,
  LoginSwaggerDecorator,
  RegisterSwaggerDecorator,
} from '../swagger-decorator/auth-swagger.decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @LoginSwaggerDecorator()
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return await this.authService.login(signInDto);
  }

  @RegisterSwaggerDecorator()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @GoogleLoginSwaggerDecorator()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req: Request & { user: SignInGoogleDto }) {
    return req.user;
  }

  @GoogleCallbackSwaggerDecorator()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Request() req: Request & { user: SignInGoogleDto },
  ) {
    return await this.authService.loginGoogle(req.user);
  }
}
