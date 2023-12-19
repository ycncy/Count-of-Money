export type UpdateCoinDto = {
    fullName?: string;
    imageUrl?: string;
    description?: string;
    symbol?: string;
    websites?: string[];
    creationDate?: string;
}

export type CreateCoinDto = {
    coinApiId: number;
}

export type ApiCoinPaginated = {
    items: [ApiCoin];
    links?: CoinLinks;
    meta?: CoinMeta;
}

export type ApiCoin = {
    id: number;
    rank: number;
    name: string;
    symbol: string;
    apiId: number;
    addedToLocal: boolean;
    localCoinId: number;
}

export type CoinLinks = {
    first?: string;
    last?: string;
    next: string;
    previous?: string;
};

export type CoinMeta = {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
};