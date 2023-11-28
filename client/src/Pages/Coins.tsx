import { useQuery } from "react-query";
import { getMe } from "../api/user";
import { fetchAllCoinsFromApi } from "../api/admin";
import { CoinComponent } from "../composant/Coins/coin";
import { getAllCoins } from "../api/public";


export const Coins = () => {

  const { data: user } = useQuery("me", getMe, {
    retry: (_, error: any) => !(error.response?.status === 404),
    enabled: localStorage.getItem("token") !== null,
  });
  
  const { data: coins } = useQuery(
    ["Coins"], 
    () => getAllCoins(), 
    {
      enabled: !!user,
    }
  );

  const initAllCoins = async () => {
    fetchAllCoinsFromApi();
  };


  return (
    <div>
      <h1>Coins</h1>
      {user?.role === "ADMIN" &&  (
        <div>
          <button onClick={initAllCoins}>Fetch all coins</button>
        </div> 
          )}
      <div>
        {coins?.map((coin) => (
         <CoinComponent 
         userRole = {user?.role}
         coin = {coin}
         key={coin.id}
          />
        ))}
        </div>
    </div>
  );
}