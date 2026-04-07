import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/text';

interface ListSectionHeaderProps {
  borderColor: string;
}

export function ListSectionHeader({ borderColor }: ListSectionHeaderProps) {
  return (
    <View
      accessibilityRole="header"
      accessibilityLabel="All Cryptocurrencies section"
      style={[styles.container, { borderBottomColor: borderColor }]}
    >
      <Text accessible={false} style={styles.label}>All Cryptos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
