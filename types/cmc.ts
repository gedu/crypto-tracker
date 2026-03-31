export interface CmcStatus {
  timestamp: string;
  error_code: number;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
}

export interface CmcQuoteUsd {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  last_updated: string;
}

export interface CmcCoinQuote {
  USD: CmcQuoteUsd;
}

export interface CmcCoin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  last_updated: string;
  date_added: string;
  quote: CmcCoinQuote;
}

export interface CmcListingsResponse {
  status: CmcStatus;
  data: CmcCoin[];
}
