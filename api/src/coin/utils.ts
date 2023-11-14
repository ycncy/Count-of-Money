import {format, parseISO} from 'date-fns';
import {CoinEntity} from "./coin.entity";
import dateProcessUtil from "../date.process.util";

const fetchCoinInfo = async (coinId: number) => {
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
        return null;
    }
}

const fetchCoinHistory = async (coinSymbol, currency, granularity) => {
    try {
        let query_url = "";
        if (granularity === "minute") query_url = `https://query2.finance.yahoo.com/v8/finance/chart/${coinSymbol}-${currency}?range=7d&interval=1m`
        else query_url = `https://query2.finance.yahoo.com/v8/finance/chart/${coinSymbol}-${currency}?range=7d&interval=1m`

        const response = await fetch(
            query_url,
            {headers: {"X-CMC_PRO_API_KEY": "885001da-e129-4a2c-8a82-d6a01e2a7ff8"}}
        );

        const jsonResponse = await response.json();

        if (jsonResponse.chart.error) {
            if (jsonResponse.chart.error.code === "Not Found") {
                return {
                    error: {
                        code: jsonResponse.chart.error.code,
                        message: jsonResponse.chart.error.description
                    }
                }
            }
        }

        const dateTimestamps = jsonResponse.chart.result[0].timestamp.map(dateProcessUtil.timestampToDateTime);

        return {
            datetimes: dateTimestamps,
            high: jsonResponse.chart.result[0].indicators.quote[0].high,
            low: jsonResponse.chart.result[0].indicators.quote[0].low,
            open: jsonResponse.chart.result[0].indicators.quote[0].open,
            close: jsonResponse.chart.result[0].indicators.quote[0].close,
            volume: jsonResponse.chart.result[0].indicators.quote[0].volume,
        }
    } catch (error) {
        console.log(error)
    }
}

export default {
    fetchCoinInfo,
    fetchCoinHistory
}