# Agent Guidelines — crypto-tracker

> Start here for cross-project norms. Skill-level files override this when present.

## Project Overview

Expo-based cryptocurrency tracker app targeting iOS, Android, and web from a single codebase.

- **Framework**: Expo 54 (managed) + React Native 0.81.5 + React 19
- **Routing**: Expo Router 6 (file-based, typed routes)
- **Language**: TypeScript 5.9 (strict mode)
- **Navigation**: React Navigation 7 (bottom tabs)
- **Animations**: React Native Reanimated 4 + Gesture Handler 2
- **Architecture flags**: New Architecture enabled, React Compiler enabled (experimental)

---

## Project Structure

```
app/
  (tabs)/          # Tab screens (index.tsx, explore.tsx)
  _layout.tsx      # Root layout
  modal.tsx        # Modal screen
components/
  ui/              # Base UI primitives
hooks/             # Custom hooks (use-color-scheme, use-theme-color)
constants/
  theme.ts         # Design tokens
assets/images/     # Static assets
.agents/skills/    # Agent skill packages (universal)
.claude/skills/    # Symlinks → .agents/skills (Claude Code)
```

Path alias `@/*` maps to the project root.

---

## Development Commands

| Action | Command |
|--------|---------|
| Start dev server | `npx expo start` |
| Run on iOS | `npx expo start --ios` |
| Run on Android | `npx expo start --android` |
| Run on web | `npx expo start --web` |
| Lint | `npm run lint` |
| Reset project | `npm run reset-project` |

> **Never run build after code changes.** Expo's dev server handles hot reload.

---

## Coding Conventions

- **Commits**: Conventional Commits only — `feat:`, `fix:`, `chore:`, `refactor:`, etc. No AI attribution.
- **Imports**: Use `@/` alias for all internal imports (e.g. `@/components/themed-text`).
- **Components**: Platform variants use `.ios.tsx` / `.web.ts` suffixes (see `icon-symbol.ios.tsx`).
- **Styling**: React Native StyleSheet. No CSS-in-JS. Respect existing `theme.ts` tokens.
- **Hooks**: Custom hooks live in `hooks/`. Prefix with `use-` (kebab-case filenames).
- **Types**: Strict TypeScript. No `any`. No type assertions without a comment explaining why.
- **CLI tools**: Use `fd` (not `find`), `rg` (not `grep`), `bat` (not `cat`), `eza` (not `ls`).

---

## Skills — Auto-invoke Table

Read the skill file **before writing any code** when the context matches. Multiple skills can apply simultaneously.

| Context / Action | Skill(s) |
|-----------------|---------|
| Any `.ts` / `.tsx` file — types, interfaces, generics | `typescript` |
| React component or hook | `react` + `typescript` |
| React Native component, screen, styles | `react-native` + `react` + `typescript` |
| Animation, gesture, FlatList, performance | `react-native-best-practices` |
| Bundle size, memory leaks, native threading | `react-native-best-practices` |
| Creating or updating a skill | `skill-development` |

### How to invoke a skill

```
Read: .claude/skills/<skill-name>/SKILL.md
Apply ALL patterns before writing code.
```

---

## Skill Catalog

| Skill | Path | Scope |
|-------|------|-------|
| `typescript` | `.claude/skills/typescript/` | TS strict patterns, const types, discriminated unions |
| `react` | `.claude/skills/react/` | React 19: no memoization, named imports, ref as prop |
| `react-native` | `.claude/skills/react-native/` | StyleSheet, platform variants, theme tokens, Expo Router |
| `react-native-best-practices` | `.agents/skills/react-native-best-practices/` | Performance, animations, bundle, native threading |
| `skill-development` | `.agents/skills/skill-development/` | How to create and structure Claude Code skills |

---

## Platform Targets

| Platform | Notes |
|----------|-------|
| iOS | Tablet support enabled. Use `icon-symbol.ios.tsx` for SF Symbols. |
| Android | Edge-to-edge layout. Adaptive icons configured in `app.json`. |
| Web | Static output. Use `.web.ts` variants where platform APIs differ. |

---

## Key Constraints

- New Architecture is **enabled** — avoid legacy bridge patterns.
- React Compiler is **enabled** — do not manually wrap with `useMemo`/`useCallback` unless profiling proves it's needed.
- Expo managed workflow — no bare `android/` or `ios/` folders. Use Expo config plugins for native customization.
