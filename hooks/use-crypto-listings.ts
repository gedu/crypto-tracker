import { useQuery } from '@tanstack/react-query';

import { fetchCryptoListings } from '@/lib/cmc-client';

const QUERY_KEYS = {
  LISTINGS: ['crypto', 'listings'],
} as const;

export function useCryptoListings() {
  return useQuery({
    queryKey: QUERY_KEYS.LISTINGS,
    queryFn: () => fetchCryptoListings(100),
    select: (response) => response.data,
  });
}
