import { Controller, SerializeOptions } from '@nestjs/common';
import { UserService } from './user.service';

@SerializeOptions({ excludePrefixes: ['password', 'role', 'id'] })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}
}
