import { useQuery } from "react-query";
import { getMe } from "../api/user";
import { getAllLocalCoins } from "../api/public";
import { LocalCoinComponent } from "../composant/Coins/localCoin";


export const LocalCoins = () => {

  const { data: user } = useQuery("me", getMe, {
    retry: (_, error: any) => !(error.response?.status === 404),
    enabled: localStorage.getItem("token") !== null,
  });
  
  const { data: coins } = useQuery(
    ["Coins"], 
    () => getAllLocalCoins(), 
    {
      enabled: !!user,
    }
  );


  return (
    <div>
      <h1>LocaLCoins</h1>
      <div>
        {coins?.map((coin) => (
         <LocalCoinComponent
         coin = {coin}
         user = {user}
         key={coin.coinId}
          />
        ))}
        </div>
    </div>
  );
}