import { News } from "../../types";

export const NewsPage = (news: News) => {

return (
  <div>
    <h1>News</h1>
    <h2>{news.title}</h2>
    <p>{news.creator}</p>
    <p>{news.link}</p>
    <p>{news.guid}</p>
    <p>{news.pubDate}</p>
    <p>{news.categories}</p>
    <p>{news.source}</p>
    <p>{news.summary}</p>
  </div>
);
};