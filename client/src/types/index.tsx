export type Profile = {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  email: string,
  username: string,
  baseCurrency: BaseCurrency,
  keywords: [string],
  role: Roles,
  provider: Providers,
  favorites: [string]
}

export type Providers = 
  | "LOCAL"
  | "GOOGLE"
  | "FACEBOOK"

export type Roles =
  | "ADMIN"
  | "USER"
  | "ANONYMOUS"

export type BaseCurrency = 
  | "EUR"
  | "USD"
  | "GBP"
  | "JPY"
  | "CHF"

export type News = {
  creator: string,
  title: string,
  link: string,
  guid: string,
  pubDate: string, /* ou date ? à voir le format */
  categories: [string],
  id?: number,
  source: string,
  summary: string
}

