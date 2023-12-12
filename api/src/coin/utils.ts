import { format, parseISO } from 'date-fns';
import { CoinEntity } from './entity/coin.entity';
import dateProcessUtil from '../date.process.util';
import { ErrorModel } from '../response-model/error.model';
import { CoinInfoModel } from './model/coin-info.model';
import { ApiCoinInfoModel } from './model/api-coin-info.model';
import { ResponseModel } from '../response-model/response.model';
import { ApiCoinEntity } from './entity/api-coin.entity';

export enum Granularity {
  MONTH = 'MONTH',
  WEEK = 'WEEK',
  FIVE_DAYS = 'FIVE_DAYS',
  DAY = 'DAY',
  HOUR = 'HOUR',
  MINUTE = 'MINUTE',
}

const fetchCoinInfo = async (coinId: number) => {
  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${coinId}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
        },
      },
    );

    const data = await response.json();
    const coinData = data['data'][Object.keys(data['data'])[0]];

    const newCoinEntity: CoinEntity = new CoinEntity();
    newCoinEntity.fullName = coinData.name;
    newCoinEntity.imageUrl = coinData.logo;
    newCoinEntity.description = coinData.description;
    newCoinEntity.symbol = coinData.symbol;
    newCoinEntity.websites = coinData.urls.website;
    newCoinEntity.creationDate = format(
      parseISO(coinData.date_added),
      'yyyy-MM-dd',
    );

    return newCoinEntity;
  } catch (error) {
    return null;
  }
};

const fetchCoinHistory = async (
  coinId: number,
  coinSymbol: string,
  currency: string,
  range: string,
  granularity: string,
): Promise<CoinInfoModel | ErrorModel> => {
  try {
    const query_url = `https://query2.finance.yahoo.com/v8/finance/chart/${coinSymbol}-${currency}?range=${range}&interval=${granularity}`;

    const response: Response = await fetch(query_url, {
      headers: { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY },
    });

    const jsonResponse = await response.json();

    if (jsonResponse.chart.error) {
      if (jsonResponse.chart.error.code === 'Not Found') {
        const errorDetails: ResponseModel = {
          status: parseInt(jsonResponse.chart.error.code),
          message: jsonResponse.chart.error.description,
        };

        const errorResponse: ErrorModel = new ErrorModel();
        errorResponse.error = errorDetails;

        return errorResponse;
      }
    }

    const dateTimestamps = jsonResponse.chart.result[0].timestamp.map(
      dateProcessUtil.timestampToDateTime,
    );

    const coinInfo: CoinInfoModel = {
      coinId: coinId,
      symbol: coinSymbol,
      datetimes: dateTimestamps,
      high: jsonResponse.chart.result[0].indicators.quote[0].high,
      low: jsonResponse.chart.result[0].indicators.quote[0].low,
      open: jsonResponse.chart.result[0].indicators.quote[0].open,
      close: jsonResponse.chart.result[0].indicators.quote[0].close,
      volume: jsonResponse.chart.result[0].indicators.quote[0].volume,
    };

    return coinInfo;
  } catch (error) {
    console.log(error);
  }
};

const fetchAllApiCryptos = async () => {
  try {
    const query_url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=100`;

    const response = await fetch(query_url, {
      headers: { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY },
    });

    const jsonResponse = await response.json();

    return jsonResponse.data.map((coin: ApiCoinEntity) => {
      const formattedCoin: ApiCoinInfoModel = new ApiCoinInfoModel();
      formattedCoin.apiId = coin.id;
      formattedCoin.rank = coin.rank;
      formattedCoin.name = coin.name;
      formattedCoin.symbol = coin.symbol;
      return formattedCoin;
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  fetchCoinInfo,
  fetchCoinHistory,
  fetchAllApiCryptos,
};
