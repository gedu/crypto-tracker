import type { CmcListingsResponse, CmcMetadataResponse } from '@/types/cmc';

const CMC_BASE_URL = 'https://pro-api.coinmarketcap.com';
const CMC_API_KEY = process.env.EXPO_PUBLIC_CMC_API_KEY;

if (!CMC_API_KEY) {
  throw new Error('[cmc-client] EXPO_PUBLIC_CMC_API_KEY is not defined. Add it to your .env file.');
}

const getCmcHeaders = (): HeadersInit => ({
  'X-CMC_PRO_API_KEY': CMC_API_KEY,
  Accept: 'application/json',
});

export const fetchCryptoListings = async (limit = 100): Promise<CmcListingsResponse> => {
  const url = new URL(`${CMC_BASE_URL}/v1/cryptocurrency/listings/latest`);
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url.toString(), { headers: getCmcHeaders() });

  if (!response.ok) {
    throw new Error(`CMC API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<CmcListingsResponse>;
};

export const fetchCoinMetadata = async (ids: number[]): Promise<CmcMetadataResponse> => {
  const url = new URL(`${CMC_BASE_URL}/v1/cryptocurrency/info`);
  url.searchParams.set('id', ids.join(','));

  const response = await fetch(url.toString(), { headers: getCmcHeaders() });

  if (!response.ok) {
    throw new Error(`CMC metadata API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<CmcMetadataResponse>;
};
