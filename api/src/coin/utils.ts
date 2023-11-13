import {format, parseISO} from 'date-fns';
import {CoinEntity} from "./coin.entity";

const fetchCoinInfo = async function (coinId: number) {
    try {
        const response = await fetch(
            `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${coinId}`,
            {headers: {"X-CMC_PRO_API_KEY": "885001da-e129-4a2c-8a82-d6a01e2a7ff8"}}
        );

        const data = await response.json();
        const coinData = data["data"][Object.keys(data["data"])[0]];

        const newCoinEntity = new CoinEntity();
        newCoinEntity.fullName = coinData.name;
        newCoinEntity.imageUrl = coinData.logo;
        newCoinEntity.description = coinData.description;
        newCoinEntity.symbol = coinData.symbol;
        newCoinEntity.websites = coinData.urls.website;
        newCoinEntity.creationDate = format(parseISO(coinData.date_added), "yyyy-MM-dd");

        return newCoinEntity;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default {
    fetchCoinInfo
}