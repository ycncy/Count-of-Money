import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { signInDto, signInGoogleDto } from './auth.dto';
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
  @ApiBody({ type: signInDto })
  @Post('login')
  async login(@Request() req: Request & { body: signInDto }) {
    return this.authService.login(req.body);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: 200,
    description: 'Successfully registered.',
    type: String,
  })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(@Request() req: Request & { body: CreateUserDto }) {
    return this.authService.registerUser(req.body);
  }

  @ApiOperation({ summary: 'Login with Google' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in with Google.',
    type: String,
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req: Request & { user: signInGoogleDto }) {
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
    @Request() req: Request & { user: signInGoogleDto },
  ) {
    const token = await this.authService.login(req.user);
    return { token };
  }
}
