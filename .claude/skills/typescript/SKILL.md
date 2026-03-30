---
name: typescript
description: >
  TypeScript strict patterns and best practices for this project.
  Trigger: When implementing or refactoring TypeScript in .ts/.tsx (types, interfaces, generics, const maps, type guards, removing any, tightening unknown).
version: "1.0"
---

## Const Types Pattern (REQUIRED)

```typescript
// ✅ ALWAYS: Create const object first, then extract type
const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];

// ❌ NEVER: Direct union types
type Status = "active" | "inactive" | "pending";
```

**Why?** Single source of truth, runtime values, autocomplete, easier refactoring.

## Flat Interfaces (REQUIRED)

```typescript
// ✅ ALWAYS: One level depth, nested objects → dedicated interface
interface CoinPrice {
  usd: number;
  change24h: number;
}

interface Coin {
  id: string;
  name: string;
  price: CoinPrice; // Reference, not inline
}

interface WatchedCoin extends Coin {
  addedAt: number;
}

// ❌ NEVER: Inline nested objects
interface Coin {
  price: { usd: number; change24h: number }; // NO!
}
```

## Never Use `any`

```typescript
// ✅ Use unknown for truly unknown types
function parseApiResponse(input: unknown): Coin {
  if (isCoin(input)) return input;
  throw new Error("Invalid response");
}

// ✅ Use generics for flexible types
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// ❌ NEVER
function parseApiResponse(input: any): any {}
```

## Utility Types

```typescript
Pick<Coin, "id" | "name">       // Select fields
Omit<Coin, "price">             // Exclude fields
Partial<Coin>                   // All optional
Required<Coin>                  // All required
Readonly<Coin>                  // All readonly
Record<string, Coin>            // Object type
ReturnType<typeof fetchCoin>    // Function return type
Parameters<typeof fetchCoin>    // Function params tuple
```

## Type Guards

```typescript
function isCoin(value: unknown): value is Coin {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}
```

## Coupled Optional Props (REQUIRED)

Independent optional props allow invalid half-states that compile but break at runtime.
Use discriminated unions to make invalid combinations impossible.

```typescript
// ❌ BEFORE: half-states allowed
interface PaginationProps {
  onPageChange?: (page: number) => void;
  pageSize?: number;
  currentPage?: number;
}

// ✅ AFTER: all-or-nothing
type PaginationProps =
  | { paginated: true; currentPage: number; pageSize: number; onPageChange: (page: number) => void }
  | { paginated: false };
```

## Import Types

```typescript
// ✅ ALWAYS: type-only imports with `import type`
import type { Coin } from "@/types/coin";

// ✅ Mixed: values and types together
import { fetchCoin, type Coin } from "@/api/coins";
```
