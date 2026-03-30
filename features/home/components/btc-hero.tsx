import { StyleSheet, View } from "react-native";

import { Text } from "@/components/text";
import { CHANGE_COLORS } from "@/features/home/config";
import { formatChange, formatPrice } from "@/features/home/utils";
import type { CmcCoin } from "@/types/cmc";

interface BtcHeroProps {
  coin: CmcCoin | undefined;
  isLoading: boolean;
  isError: boolean;
  height: number;
}

export function BtcHero({ coin, isLoading, isError, height }: BtcHeroProps) {
  if (isLoading) {
    return (
      <View style={[styles.btcHero, { height: height * 0.25 }]}>
        <Text style={styles.heroLabel}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.btcHero, { height: height * 0.25 }]}>
        <Text style={styles.heroLabel}>Failed to load</Text>
      </View>
    );
  }

  if (!coin) return null;

  const change = coin.quote.USD.percent_change_24h;
  const changeColor =
    change >= 0 ? CHANGE_COLORS.positive : CHANGE_COLORS.negative;

  return (
    <View style={[styles.btcHero, { height: height * 0.25 }]}>
      <Text style={styles.heroLabel}>Bitcoin (BTC)</Text>
      <Text style={styles.heroPrice}>{formatPrice(coin.quote.USD.price)}</Text>
      <Text style={[styles.heroChange, { color: changeColor }]}>
        {formatChange(change)} today
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btcHero: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  heroLabel: {
    fontSize: 16,
    opacity: 0.6,
  },
  heroPrice: {
    fontSize: 48,
    fontWeight: "bold",
    lineHeight: 56,
  },
  heroChange: {
    fontSize: 18,
    fontWeight: "600",
  },
});
