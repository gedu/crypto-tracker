import { StyleSheet } from 'react-native';

import { View } from '@/components/view';
import { Text } from '@/components/text';
import { CoinLogo } from '@/features/home/components/coin-logo';
import { CHANGE_COLORS, COIN_ITEM_HEIGHT } from '@/features/home/config';
import { formatChange, formatPrice } from '@/features/home/utils';
import type { CmcCoin } from '@/types/cmc';

interface CoinRowProps {
  coin: CmcCoin;
  logoUrl?: string;
}

export function CoinRow({ coin, logoUrl }: CoinRowProps) {
  const change = coin.quote.USD.percent_change_24h;
  const changeColor = change >= 0 ? CHANGE_COLORS.positive : CHANGE_COLORS.negative;

  return (
    <View style={styles.coinRow}>
      <Text style={styles.rank}>#{coin.cmc_rank}</Text>
      <CoinLogo uri={logoUrl} size={32} />
      <View style={styles.coinInfo}>
        <Text type="defaultSemiBold">{coin.name}</Text>
        <Text style={styles.symbol}>{coin.symbol}</Text>
      </View>
      <View style={styles.coinPrices}>
        <Text type="defaultSemiBold">{formatPrice(coin.quote.USD.price)}</Text>
        <Text style={[styles.change, { color: changeColor }]}>
          {formatChange(change)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: COIN_ITEM_HEIGHT,
    gap: 12,
  },
  rank: {
    width: 36,
    fontSize: 13,
    opacity: 0.4,
  },
  coinInfo: {
    flex: 1,
    gap: 2,
  },
  symbol: {
    fontSize: 13,
    opacity: 0.5,
  },
  coinPrices: {
    alignItems: 'flex-end',
    gap: 2,
  },
  change: {
    fontSize: 13,
    fontWeight: '600',
  },
});
