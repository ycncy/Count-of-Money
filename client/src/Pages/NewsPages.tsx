import { useQuery } from "react-query";
import { getMe, getNews } from "../api/user";
import { NewsPage } from "./News";


export const NewsPages = () => {

  const { data: user } = useQuery("me", getMe, {
    retry: (_, error: any) => !(error.response?.status === 404),
    enabled: localStorage.getItem("token") !== null,
  });


  const { data: News } = useQuery(
    ["News"],
    () => getNews(),
    {
      enabled: !!user
    }
  );
  

  return (
    <div>
      <h1>News</h1>
      {News?.map((news) => (
        <NewsPage key={news.guid} {...news} />
      ))}
    </div>
  );
}