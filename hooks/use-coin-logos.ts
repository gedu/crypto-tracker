import { useQuery } from '@tanstack/react-query';

import { fetchCoinMetadata } from '@/lib/cmc-client';
import { readLogoCache, writeLogoCache } from '@/lib/logo-cache';
import type { LogoMap } from '@/types/cmc';

export const useCoinLogos = (ids: number[]): LogoMap => {
  const cached = readLogoCache();

  const { data } = useQuery({
    queryKey: ['crypto', 'logos'],
    queryFn: async (): Promise<LogoMap> => {
      const response = await fetchCoinMetadata(ids);
      const map: LogoMap = {};
      for (const [idStr, meta] of Object.entries(response.data)) {
        map[Number(idStr)] = meta.logo;
      }
      writeLogoCache(map);
      return map;
    },
    enabled: ids.length > 0 && cached === null,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return data ?? cached ?? {};
};
