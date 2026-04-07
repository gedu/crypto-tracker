import { createMMKV } from 'react-native-mmkv';

import type { LogoMap } from '@/types/cmc';

const storage = createMMKV({ id: 'logo-cache' });

const LOGO_MAP_KEY = 'logoMap';
const TIMESTAMP_KEY = 'logoMapTimestamp';
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const readLogoCache = (): LogoMap | null => {
  const raw = storage.getString(LOGO_MAP_KEY);
  const ts = storage.getNumber(TIMESTAMP_KEY);
  if (!raw || !ts || Date.now() - ts > TTL_MS) return null;
  return JSON.parse(raw) as LogoMap;
};

export const writeLogoCache = (map: LogoMap): void => {
  storage.set(LOGO_MAP_KEY, JSON.stringify(map));
  storage.set(TIMESTAMP_KEY, Date.now());
};

export const clearLogoCache = (): void => {
  storage.remove(LOGO_MAP_KEY);
  storage.remove(TIMESTAMP_KEY);
};
