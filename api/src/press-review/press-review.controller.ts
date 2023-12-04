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
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DecodedToken } from '../auth/auth.dto';

@ApiTags('News')
@Controller('articles')
export class NewsController {
  constructor(private readonly pressReviewService: PressReviewService) {}

  @UseGuards(JwtAuthGuard)
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
    if (news.length === 0)
      return await this.pressReviewService.getUserNewsFromKeyWords(req.user);
    return await this.pressReviewService.getLatestNews(news);
  }
}
