import {
  Controller,
  Get,
  ParseArrayPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PressReviewService } from './press-review.service';
import { ApiTags } from '@nestjs/swagger';
import { GetLatestNewsSwaggerDecorator } from '../swagger-decorator/press-review-swagger.decorators';
import { DecodedToken } from '../auth/auth.dto';
import { PublicGuard } from '../auth/guard/public.guard';

@ApiTags('News')
@Controller('articles')
export class NewsController {
  constructor(private readonly pressReviewService: PressReviewService) {}

  @UseGuards(PublicGuard)
  @GetLatestNewsSwaggerDecorator()
  @Get()
  async getLatestNews(
    @Request() req: Request & { user: DecodedToken },
    @Query(
      'news',
      new ParseArrayPipe({
        items: String,
        separator: ',',
        optional: true,
      }),
    )
    news: string[] = [],
  ) {
    if (!req.user) return await this.pressReviewService.getLatestPublicNews();
    else if (news.length === 0 && req.user) return await this.pressReviewService.getUserNewsFromKeyWords(req.user);
    else return await this.pressReviewService.getLatestNews(news);
  }
}
