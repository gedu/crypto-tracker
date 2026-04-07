---
name: react-native
description: >
  React Native and Expo conventions for this project.
  Trigger: When writing React Native components, screens, styles, or Expo-specific code (.tsx).
  For performance patterns (FlatList, animations, bundle size), also use react-native-best-practices.
---

> **Base skill — work in progress.** Add patterns here as conventions are established.
> Performance patterns (FlatList, Reanimated, bundle) → `react-native-best-practices`.

## StyleSheet Over Inline Styles (REQUIRED)

```typescript
// ✅ ALWAYS: StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});

// ❌ NEVER: Inline style objects (new object on every render)
<View style={{ flex: 1, backgroundColor: colors.background }}>
```

**Exception**: dynamic values that depend on props/state can be inline or composed via array syntax:
```typescript
<View style={[styles.container, { opacity: isVisible ? 1 : 0 }]} />
```

## Component Definition Location (REQUIRED)

Components MUST always be defined at the top level of their file. Never define a component function inside another component's function body.

```typescript
// ✅ ALWAYS: Top-level definition in its own file, receives data via props
export function CoinRow({ coin }: CoinRowProps) {
  return <View>...</View>;
}

// ❌ NEVER: Component defined inside parent
export default function HomeScreen() {
  function CoinRow({ coin }: CoinRowProps) { // NO — new reference on every parent render
    return <View>...</View>;
  }
  return <FlatList renderItem={({ item }) => <CoinRow coin={item} />} />;
}
```

**Why it matters:**
- React Compiler cannot treat an inner function as a stable component identity
- React DevTools cannot display a stable component name for debugging
- The inner component is untestable in isolation
- Preparing for bottom-up state management: state should live in or near the component that owns it, not bubble up

**Rule of thumb**: if you find yourself writing `function X()` inside `function Y()` and X returns JSX, X belongs in its own file under the nearest `components/` or `features/*/components/` folder.

**Note**: JSX *expressions* (e.g. `const listHeader = (<View>...</View>)`) are fine inside a component body — the rule applies to *component function definitions* only.

## Platform-Specific Files

Use file suffixes for platform variants instead of inline `Platform.OS` checks when the difference is substantial.

```
icon-symbol.ios.tsx     ← iOS-only implementation (SF Symbols)
icon-symbol.tsx         ← Android/web fallback
use-color-scheme.web.ts ← Web-only hook implementation
use-color-scheme.ts     ← Native fallback
```

For minor differences, `Platform.select` is fine:
```typescript
const hitSlop = Platform.select({ ios: 8, android: 4 });
```

## Theme Tokens

Always import values from `@/constants/theme` instead of hardcoding colors or spacing.

```typescript
// ✅
import { colors, spacing } from "@/constants/theme";

// ❌
backgroundColor: "#1a1a2e"
```

## Component Naming — Use Base Names (REQUIRED)

Project-owned primitive components use the base name, not a prefixed name.

```typescript
// ✅ ALWAYS: import from project components
import { Text } from '@/components/text';
import { View } from '@/components/view';

// ❌ NEVER: prefixed names for your own primitives
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
```

Inside the component file itself, alias the React Native primitive to avoid the name collision:

```typescript
import { Text as RNText } from 'react-native';
import { View as RNView } from 'react-native';
```

## FlatList Pure Callbacks at Module Level (REQUIRED)

`keyExtractor` and `getItemLayout` are pure functions — they only depend on their arguments, never on component state or props. Define them at module level, not inside the component.

```typescript
// ✅ ALWAYS: module-level — no closure over component state
function keyExtractor(item: CmcCoin) {
  return String(item.id);
}

function getItemLayout(_: ArrayLike<CmcCoin> | null | undefined, index: number) {
  return { length: COIN_ITEM_HEIGHT, offset: COIN_ITEM_HEIGHT * index, index };
}

export default function CoinList() {
  return <FlatList keyExtractor={keyExtractor} getItemLayout={getItemLayout} ... />;
}

// ❌ NEVER: inside the component — recreated on every render (even if Compiler handles it)
export default function CoinList() {
  function keyExtractor(item: CmcCoin) { return String(item.id); }
  return <FlatList keyExtractor={keyExtractor} ... />;
}
```

`renderItem` stays inside the component when it needs to reference other component-level functions or state. If it's also pure, move it out too.

## Percentage Heights in Scroll Containers

`height: '25%'` does NOT work inside `FlatList` / `ScrollView` content. React Native resolves percentage dimensions relative to the parent's size — scroll content has no defined height, so `25%` computes to `0`.

```typescript
// ❌ BROKEN inside ListHeaderComponent / ScrollView content
<View style={{ height: '25%' }} />

// ✅ CORRECT: get screen height from the screen and pass it down
import { useWindowDimensions } from 'react-native';
const { height } = useWindowDimensions();
<HeroSection height={height} />

// Inside HeroSection:
<View style={[styles.hero, { height: height * 0.25 }]} />
```

`height: '25%'` only works when the parent has a fixed/flex-defined height (e.g. a full-screen `View` with `flex: 1`, not a scroll container).

## Navigation (Expo Router)

```typescript
// ✅ Typed navigation
import { router } from "expo-router";
router.push("/coin/bitcoin");
router.back();

// ✅ Link component for declarative navigation
import { Link } from "expo-router";
<Link href="/coin/bitcoin">Bitcoin</Link>

// ✅ useLocalSearchParams for route params
import { useLocalSearchParams } from "expo-router";
const { id } = useLocalSearchParams<{ id: string }>();
```
