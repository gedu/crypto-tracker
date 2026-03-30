---
name: react-native
description: >
  React Native and Expo conventions for this project.
  Trigger: When writing React Native components, screens, styles, or Expo-specific code (.tsx).
  For performance patterns (FlatList, animations, bundle size), also use react-native-best-practices.
version: "0.1.0"
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
