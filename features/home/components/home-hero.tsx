import { StyleSheet } from 'react-native';

import { View } from '@/components/view';

import { Text } from '@/components/text';
import { CHANGE_COLORS } from '@/features/home/config';
import { formatChange, formatPrice } from '@/features/home/utils';
import type { CmcCoin } from '@/types/cmc';

interface HomeHeroProps {
  coin: CmcCoin | undefined;
  isLoading: boolean;
  isError: boolean;
  height: number;
}

export function HomeHero({ coin, isLoading, isError, height }: HomeHeroProps) {
  if (isLoading) {
    return (
      <View
        accessible={true}
        accessibilityLabel="Loading Bitcoin data"
        accessibilityState={{ busy: true }}
        style={[styles.hero, { height: height * 0.25 }]}
      >
        <Text accessible={false} style={styles.label}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        accessible={true}
        accessibilityLabel="Failed to load Bitcoin data"
        accessibilityLiveRegion="assertive"
        style={[styles.hero, { height: height * 0.25 }]}
      >
        <Text accessible={false} style={styles.label}>Failed to load</Text>
      </View>
    );
  }

  if (!coin) return null;

  const change = coin.quote.USD.percent_change_24h;
  const changeColor = change >= 0 ? CHANGE_COLORS.positive : CHANGE_COLORS.negative;
  const direction = change >= 0 ? 'up' : 'down';
  const changeAbs = Math.abs(change).toFixed(2);
  const heroLabel = `${coin.name} featured. Price ${formatPrice(coin.quote.USD.price)}, ${direction} ${changeAbs}% today`;

  return (
    <View
      accessible={true}
      accessibilityLabel={heroLabel}
      style={[styles.hero, { height: height * 0.25 }]}
    >
      <Text accessible={false} style={styles.label}>{coin.name} ({coin.symbol})</Text>
      <Text accessible={false} style={styles.price}>{formatPrice(coin.quote.USD.price)}</Text>
      <Text accessible={false} style={[styles.change, { color: changeColor }]}>
        {formatChange(change)} today
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 16,
    opacity: 0.6,
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 56,
  },
  change: {
    fontSize: 18,
    fontWeight: '600',
  },
});
