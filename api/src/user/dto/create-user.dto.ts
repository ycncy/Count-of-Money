export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  baseCurrency: string;
  keywords: Array<string>;
}
