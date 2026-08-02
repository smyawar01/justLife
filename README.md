# JustLife Hearthstone React Native Assignment

A React Native mobile application for displaying, filtering, and searching Hearthstone cards and card types.

## 1. Setup & Execution Commands
**Prerequisites:** Node.js >= 22.11.0, Yarn v1.22+, Xcode / Android Studio, CocoaPods.

Copy provided  `.env` in the root:

```bash
yarn install         # Install NPM dependencies
yarn ios:pods        # Install CocoaPods (cd ios && pod install)
yarn start           # Start Metro bundler
yarn ios             # Run on iOS simulator
yarn android         # Run on Android emulator
yarn test            # Run Jest unit and RNTL tests
```

## 2. Architecture & Directory Structure
Built using **Feature-First + Layered Architecture** with TypeScript, Zustand, and React Navigation.

```
src/
├── app/         # App entry, root navigation & global provider setup
├── config/      # AppConfig loading .env via react-native-config
├── core/        # Shared foundational modules (networking, testing, theme)
├── features/    # Feature domain modules (cardList, cardTypes, shared UI)
└── utils/       # Utility helpers (textUtils, cardUtils)
```

## 3. Key Components
- **`AppConfig`**: Exposes type-safe environment configuration loaded via `react-native-config`.
- **`CardTypesScreen`**: Primary grid screen displaying unique card categories with theme toggle & search.
- **`CardTile`**: Pure UI component displaying card image, title, and rarity badge.
- **`SearchBar` & `EmptySearchView`**: Dynamic debounced search input & empty state view components.
- **`useCardsStore`**: Zustand state manager handling card fetching, filtering, and error states.
- **`ThemeProvider`**: Centralized theme context powering seamless Light and Dark mode switching.

## 4. Testing Strategy
- **Unit Testing (Jest)**: Tests business logic, store actions, and API handlers (`cardsApi`).
- **Component Testing (RNTL)**: `@testing-library/react-native` tests UI components (`SearchBar`, `CardTile`, `CardTypesScreen`).
- **Test Utilities**: Custom `renderWithProviders` helper in `src/core/testing/testUtils.tsx` wraps components with `ThemeProvider` and `SafeAreaProvider`.

## 6. TODOs & Future Enhancements
- [ ] Add offline caching layer using `@react-native-async-storage/async-storage`.
- [ ] Implement pagination & infinite scrolling for large card lists.
- [ ] Add E2E automated suite using Detox.
