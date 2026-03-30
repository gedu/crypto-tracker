import type { CmcListingsResponse } from '@/types/cmc';

const CMC_BASE_URL = 'https://pro-api.coinmarketcap.com';

function getCmcHeaders(): HeadersInit {
  return {
    'X-CMC_PRO_API_KEY': process.env.EXPO_PUBLIC_CMC_API_KEY,
    Accept: 'application/json',
  };
}

export async function fetchCryptoListings(limit = 100): Promise<CmcListingsResponse> {
  const url = new URL(`${CMC_BASE_URL}/v1/cryptocurrency/listings/latest`);
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url.toString(), { headers: getCmcHeaders() });

  if (!response.ok) {
    throw new Error(`CMC API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<CmcListingsResponse>;
}
