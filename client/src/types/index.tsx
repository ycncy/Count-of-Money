export type Profile = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  baseCurrency: BaseCurrency;
  keywords: [string];
  role: Roles;
  provider: Providers;
  favorites: [string];
};

export type Providers = 'LOCAL' | 'GOOGLE' | 'FACEBOOK';

export type Roles = 'ADMIN' | 'USER' | 'ANONYMOUS';

export type BaseCurrency = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CHF';

export type News = {
  creator: string;
  title: string;
  link: string;
  guid: string;
  pubDate: string /* ou date ? à voir le format */;
  categories: [string];
  id?: number;
  source: string;
  summary: string;
};

export type CoinData = {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  imageUrl: string;
  apiId: number;
};

export type RawCoins = {
  coinId: number;
  fullName: string;
  rank: number;
  name: string;
  symbol: string;
  imageUrl: string;
  apiId: number;
};

export type Coin = {
  items: [CoinData];
  links: CoinLinks;
  meta: CoinMeta;
};

export type CoinLinks = {
  first: string;
  last: string;
  next: string;
  previous: string;
};

export type CoinMeta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};
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

export type VictoryDataPoint = {
  x: Date;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
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

export type DefaultFav = {
  id: number;
  coinId: number;
  fullName: string;
  imageUrl: string;
  description: string;
  symbol: string;
};
