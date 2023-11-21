import { Controller, Get, Query } from '@nestjs/common';
import { PressReviewService } from './press-review.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('News')
@Controller('articles')
export class NewsController {
  constructor(private readonly pressReviewService: PressReviewService) {}

  @ApiQuery({
    name: 'news',
    description: 'List of news tags',
    schema: {
      type: 'string',
      example: 'bitcoin',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved news.',
  })
  @ApiOperation({
    summary: 'Get latest news',
  })
  @Get()
  async getLatestNews(@Query() query: any) {
    return await this.pressReviewService.getLatestNews(query.news);
  }
}
