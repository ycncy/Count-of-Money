import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { NewsController } from './press-review.controller';
import { PressReviewService } from './press-review.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [NewsController],
  providers: [PressReviewService],
})
export class PressReviewModule {}
