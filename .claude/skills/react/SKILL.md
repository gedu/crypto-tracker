---
name: react
description: >
  React 19 patterns with React Compiler for this project.
  Trigger: When writing React 19 components or hooks in .tsx files.
version: "1.0"
---

## No Manual Memoization (REQUIRED)

React Compiler handles optimization automatically. Never add `useMemo` or `useCallback` manually.

```typescript
// ✅ React Compiler handles this
function CoinList({ coins }) {
  const sorted = coins.sort((a, b) => a.name.localeCompare(b.name));

  const handlePress = (id: string) => {
    router.push(`/coin/${id}`);
  };

  return <List data={sorted} onPress={handlePress} />;
}

// ❌ NEVER: Manual memoization
const sorted = useMemo(() => coins.sort(...), [coins]);
const handlePress = useCallback((id) => router.push(`/coin/${id}`), []);
```

**Exception**: only add manual memoization if you have a profiler trace proving it's needed.

## Library Memoization Recommendations (TanStack Query, etc.)

Some libraries recommend wrapping callbacks in `useCallback` for referential stability.
A common example is TanStack Query's `select` option:

```typescript
// What TanStack docs recommend in projects WITHOUT React Compiler:
useQuery({
  queryKey: ['coins'],
  queryFn: fetchCoins,
  select: useCallback((data) => data.filter((c) => c.rank <= 10), []),
});

// ✅ What to do in THIS project (React Compiler enabled):
useQuery({
  queryKey: ['coins'],
  queryFn: fetchCoins,
  select: (data) => data.filter((c) => c.rank <= 10),
});
```

React Compiler automatically stabilizes the function identity — manual `useCallback` is redundant.
**If this project ever disables React Compiler**, add `useCallback` back to all `select`, `onSuccess`,
and similar library callbacks that depend on referential stability.

## Arrow Functions for Component Helpers (REQUIRED)

Use arrow functions for all helper functions defined inside or alongside components — render callbacks, event handlers, formatters. Never use `function` declarations for these.

```typescript
// ✅ Arrow function for render callbacks and helpers
const renderItem = ({ item }: { item: Coin }) => <CoinRow coin={item} />;

const handlePress = (id: string) => router.push(`/coin/${id}`);

// ❌ NEVER: function declaration for component helpers
function renderItem({ item }: { item: Coin }) {
  return <CoinRow coin={item} />;
}
```

**Exception**: top-level exported components may use either style — this rule applies to helpers and callbacks, not to the component function itself.

## Imports (REQUIRED)

```typescript
// ✅ ALWAYS: Named imports
import { useState, useEffect, useRef } from "react";

// ❌ NEVER
import React from "react";
import * as React from "react";
```

## ref as Prop (No forwardRef)

```typescript
// ✅ React 19: ref is just a prop
function TextInput({ ref, ...props }: React.ComponentProps<typeof TextInput>) {
  return <TextInput ref={ref} {...props} />;
}

// ❌ Old pattern — no longer needed
const TextInput = forwardRef((props, ref) => (
  <TextInput ref={ref} {...props} />
));
```
