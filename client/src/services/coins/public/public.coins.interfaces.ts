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

export type LocalCoinInfo = {
    id: number;
    fullName: string;
    imageUrl: string;
    description: string;
    symbol: string;
    websites: string[];
    creationDate: Date;
}

export type LocalCoin = {
    id: number;
    coinId: number;
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