export const APP_NAME = 'CryptoTracker';
export const BTC_SYMBOL = 'BTC';
export const COIN_ITEM_HEIGHT = 64;

export const CHANGE_COLORS = {
  positive: '#22c55e',
  negative: '#ef4444',
} as const;

export type ChangeColor = (typeof CHANGE_COLORS)[keyof typeof CHANGE_COLORS];
