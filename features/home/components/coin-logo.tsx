import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import type { AccessibilityProps } from 'react-native';

interface CoinLogoProps extends AccessibilityProps {
  uri?: string;
  size?: number;
}

export const CoinLogo = ({ uri, size = 32, ...accessibilityProps }: CoinLogoProps) => (
  <Image
    source={uri ? { uri } : null}
    style={[styles.logo, { width: size, height: size, borderRadius: size / 2 }]}
    contentFit="contain"
    transition={150}
    cachePolicy="disk"
    accessibilityRole="image"
    {...accessibilityProps}
  />
);

const styles = StyleSheet.create({
  logo: {
    backgroundColor: '#E5E7EB',
  },
});
