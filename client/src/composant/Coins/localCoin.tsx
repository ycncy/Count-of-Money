import React from "react";
import {LocalCoin} from "../../services/coins/public/public.coins.interfaces";
import {Profile} from "../../types";
import { NavBarConnectedUser } from "../Navbar/NavBarConnectedUser";
import { NavBar } from "../Navbar/NavBar";

interface Props {
  coin: LocalCoin;
  user?: Profile;
}
export function LocalCoinComponent({ coin, user }: Props) {
  return (
    <div>
      <h1>{coin.coinId}</h1>
      <img src={coin.imageUrl} alt={coin.symbol} />
      <h3>{coin.symbol}</h3>
      <h4>Last Updated : {`${coin.lastDatetime}`}</h4>
      <h4>Higest : {coin.high}</h4>
      <h4>Lowest : {coin.low}</h4>
      <h4>Open : {coin.open}</h4>
      <h4>Close : {coin.close}</h4>
      <h4>Volume : {coin.volume}</h4>
      {user?.role === "ADMIN" && <button>delete from local api</button>}
    </div>
  );
}
