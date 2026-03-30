import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/text";
import { View } from "@/components/view";
import { Colors } from "@/constants/theme";
import { CoinRow } from "@/features/home/components/coin-row";
import { HomeHero } from "@/features/home/components/home-hero";
import { ListSectionHeader } from "@/features/home/components/list-section-header";
import { APP_NAME, BTC_SYMBOL, COIN_ITEM_HEIGHT } from "@/features/home/config";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useCryptoListings } from "@/hooks/use-crypto-listings";
import type { CmcCoin } from "@/types/cmc";

function keyExtractor(item: CmcCoin) {
  return String(item.id);
}

function getItemLayout(
  _: ArrayLike<CmcCoin> | null | undefined,
  index: number,
) {
  return {
    length: COIN_ITEM_HEIGHT,
    offset: COIN_ITEM_HEIGHT * index,
    index,
  };
}

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { data: coins, isLoading, isError } = useCryptoListings();

  const btc = coins?.find((c) => c.symbol === BTC_SYMBOL);

  function renderCoin({ item }: { item: CmcCoin }) {
    return <CoinRow coin={item} />;
  }

  const listHeader = (
    <View>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text type="title">{APP_NAME}</Text>
      </View>
      <HomeHero
        coin={btc}
        isLoading={isLoading}
        isError={isError}
        height={height}
      />
      <ListSectionHeader borderColor={colors.icon} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={coins}
        keyExtractor={keyExtractor}
        renderItem={renderCoin}
        ListHeaderComponent={() => listHeader}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingBottom: 8,
  },
});
