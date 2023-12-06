import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProvider, UserRole } from '../../user/user.constants';

export class UserSeeder {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async run() {
    const adminCheck = this.userEntityRepository.findBy({
      username: 'admin',
    });
    if (adminCheck !== null) {
      return;
    }
    const user = this.userEntityRepository.create({
      username: 'admin',
      email: 'admin@cashmoney.com',
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
      role: UserRole.ADMIN,
      provider: UserProvider.LOCAL,
    });

    await this.userEntityRepository.save(user);
    console.log('User seeded');
  }
}
