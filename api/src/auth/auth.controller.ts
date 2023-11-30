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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in.',
    type: String,
  })
  @ApiBody({ type: SignInDto })
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return await this.authService.login(signInDto);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: 200,
    description: 'Successfully registered.',
    type: String,
  })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @ApiOperation({ summary: 'Login with Google' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in with Google.',
    type: String,
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req: Request & { user: SignInGoogleDto }) {
    return req.user;
  }

  @ApiOperation({ summary: 'Login with Google callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in with Google.',
    type: String,
  })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Request() req: Request & { user: SignInGoogleDto },
  ) {
    return await this.authService.loginGoogle(req.user);
  }
}
