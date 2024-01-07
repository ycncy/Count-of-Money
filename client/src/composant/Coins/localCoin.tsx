import React from "react";
import {LocalCoin} from "../../services/coins/public/public.coins.interfaces";
import {Profile} from "../../types";

interface Props {
  coin: LocalCoin;
  user: Profile | undefined;
}
export function LocalCoinComponent({ coin, user }: Props) {
  return (
    <div>
      <h1>{coin.coinId}</h1>
      <img src={coin.imageUrl} alt={coin.symbol} />
      <h3>{coin.symbol}</h3>
      <h4>{`${coin.lastDatetime}`}</h4>
      <h4>{coin.high}</h4>
      <h4>{coin.low}</h4>
      <h4>{coin.open}</h4>
      <h4>{coin.close}</h4>
      <h4>{coin.volume}</h4>
      {user?.role === "ADMIN" && <button>delete</button>}
    </div>
  );
}
