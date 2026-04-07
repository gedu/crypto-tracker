import type { CmcCoin } from '@/types/cmc';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

export function coinAccessibilityLabel(coin: CmcCoin): string {
  const change = coin.quote.USD.percent_change_24h;
  const direction = change >= 0 ? 'up' : 'down';
  const changeAbs = Math.abs(change).toFixed(2);
  return `${coin.name}, ${coin.symbol}, ranked ${coin.cmc_rank}, price ${formatPrice(coin.quote.USD.price)}, ${direction} ${changeAbs}% in the last 24 hours`;
}
