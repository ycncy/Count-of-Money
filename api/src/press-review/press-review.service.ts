import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';

@Injectable()
export class PressReviewService {
  private parser = new Parser();

  async getLatestNews(newsParam: string[]): Promise<any[]> {
    const sources = [];

    if (newsParam.length !== 0) {
      newsParam.forEach((item: string) => {
        sources.push(`https://coinjournal.net/fr/actualites/tag/${item}/feed/`);
      });
    } else {
      sources.push('https://coinjournal.net/fr/actualites/feed/');
    }
    const newsPromises = sources.map((source) => this.parser.parseURL(source));
    let news = [];
    try {
      const newsResults = await Promise.all(newsPromises);
      news = newsResults.flatMap((result) =>
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
      return news;
    }
  }
}
