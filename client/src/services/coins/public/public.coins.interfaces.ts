export type CoinHistory = {
    coinId: number;
    symbol: string;
    datetimes: string[];
    high: number[];
    low: number[];
    open: number[];
    close: number[];
    volume: number[];
};

export type LocalCoin = {
    coinId: number;
    symbol: string;
    imageUrl: string;
    lastDatetime: Date;
    high: number;
    low: number;
    open: number;
    close: number;
    volume: number;
};