import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { NewsController } from './press-review.controller';
import { PressReviewService } from './press-review.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  controllers: [NewsController],
  providers: [PressReviewService],
})
export class PressReviewModule {}
