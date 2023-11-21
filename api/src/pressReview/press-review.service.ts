import { Injectable, Logger } from '@nestjs/common';
import * as Parser from 'rss-parser';

@Injectable()
export class PressReviewService {
  private readonly logger = new Logger(PressReviewService.name);
  private parser = new Parser();

  async getLatestNews(newsParam: string | string[]): Promise<any[]> {
    const sources = [];

    if (newsParam) {
      const newsItems = Array.isArray(newsParam) ? newsParam : [newsParam];
      newsItems.forEach((item) => {
        sources.push(`https://coinjournal.net/fr/actualites/tag/${item}/feed/`);
      });
    } else {
      sources.push('https://coinjournal.net/fr/actualites/feed/');
    }
    const newsPromises = sources.map((source) => this.parser.parseURL(source));
    try {
      const newsResults = await Promise.all(newsPromises);
      const news = newsResults.flatMap((result) =>
        result.items.map((item) => {
          const match = item.guid.match(/\?p=(\d+)/);
          const id = match ? match[1] : null;

          return {
            creator: item.creator || item['dc:creator'],
            title: item.title,
            link: item.link,
            guid: item.guid,
            pubDate: item.pubDate,
            categories: item.categories,
            id: id,
            source: 'coinjournal',
            summary: item.contentSnippet,
          };
        }),
      );
      return news;
    } catch (error) {
      this.logger.error('Failed to fetch RSS feeds', error);
      throw new Error('Failed to fetch RSS feeds');
    }
  }
}
