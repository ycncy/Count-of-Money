import { UserProvider, UserRole } from 'src/user/user.constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class signInDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class signInGoogleDto {
  @ApiProperty()
  @IsNotEmpty()
  accesToken: string;

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
  provider: UserProvider;
  username: string;
  iat: number;
  exp: number;
}
