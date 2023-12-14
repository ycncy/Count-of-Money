export type CoinHistory = {
    id: number;
    symbol: string;
    datetimes: string[];
    high: number[];
    low: number[];
    open: number[];
    close: number[];
    volume: number[];
};

export type LocalCoin = {
    id: number;
    fullName: string;
    symbol: string;
    imageUrl: string;
    lastDatetime: Date;
    high: number;
    low: number;
    open: number;
    close: number;
    volume: number;
};