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
