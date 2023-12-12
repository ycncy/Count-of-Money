import { UserProvider, UserRole } from 'src/user/user.constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class SignInGoogleDto {
  @ApiProperty()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  provider: UserProvider;

  @ApiProperty()
  @IsNotEmpty()
  username: string;
}

export class DecodedToken {
  sub: number;
  email: string;
  role: UserRole;
  keywords: string[];
  provider: UserProvider;
  username: string;
  iat: number;
  exp: number;
}
