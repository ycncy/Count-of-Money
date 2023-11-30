import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common';
import { PressReviewService } from './press-review.service';
import { ApiTags } from '@nestjs/swagger';
import { GetLatestNewsSwaggerDecorator } from '../swaggerDecorators/press-review-swagger.decorators';

@ApiTags('News')
@Controller('articles')
export class NewsController {
  constructor(private readonly pressReviewService: PressReviewService) {}

  @GetLatestNewsSwaggerDecorator()
  @Get()
  async getLatestNews(
    @Query('news', new ParseArrayPipe({ items: String, separator: ',' }))
    news: string[],
  ) {
    return await this.pressReviewService.getLatestNews(news);
  }
}
