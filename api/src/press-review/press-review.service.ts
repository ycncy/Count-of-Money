import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { DecodedToken } from '../auth/auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PressReviewService {
  constructor(private userService: UserService) {}

  private parser = new Parser();

  async getUserNewsFromKeyWords(user: DecodedToken) {
    const sources: string[] = [];

    const userEntity = await this.userService.findOne(user.sub);

    userEntity.keywords.forEach((keyword: string) => {
      sources.push(
        `https://coinjournal.net/fr/actualites/tag/${keyword}/feed/`,
      );
    });

    return this.fetchPressReviews(sources);
  }

  async getLatestNews(newsParam: string[]): Promise<any[]> {
    const sources: string[] = [];

    newsParam.forEach((item: string) => {
      sources.push(`https://coinjournal.net/fr/actualites/tag/${item}/feed/`);
    });

    return this.fetchPressReviews(sources);
  }

  async fetchPressReviews(sources: string[]) {
    const newsPromises = sources.map((source: string) =>
      this.parser.parseURL(source),
    );

    const newsResults = await Promise.allSettled(newsPromises);

    return newsResults.flatMap((result) => {
      if (result.status === 'fulfilled') {
        return result.value.items.map((item) => {
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
        });
      }
      return [];
    });
  }
}
