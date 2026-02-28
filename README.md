# Cross-Platform React Native App

A production-ready cross-platform application built with React Native (Expo) and styled using Tailwind CSS (via NativeWind).

## Requirements
- Node.js LTS
- Watchman (for macOS)
- iOS Simulator (for Mac users) or Android Studio

## Features
- **Cross-Platform:** Single codebase for iOS, Android, and Web
- **Styling:** Tailwind CSS integrated via NativeWind
- **Theming:** Dynamic Light/Dark mode with automatic system theme detection
- **Navigation:** React Navigation (Native Stack)
- **Code Quality:** Pre-configured ESLint and Prettier

## Scripts & Running
First, install dependencies:
```bash
npm install
```

### Run on iOS
```bash
npm run ios
```

### Run on Android
```bash
npm run android
```

### Run on Web
```bash
npm run web
```

## Structure
- `src/components/`: Reusable UI elements (e.g. `ThemeToggle`)
- `src/screens/`: Main app screens
- `src/navigation/`: App routing and stack config
- `src/context/`: React Contexts (e.g. `ThemeContext`)
- `src/styles/`: Global CSS configurations (e.g. `global.css`)

## Building for Production (APK)
To generate a production-ready `.apk` file for Android locally:

1. **Prebuild the project** (generates native android/ios folders):
   ```bash
   npx expo prebuild
   ```
2. **Build the APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   The generated APK will be accessible at: `android/app/build/outputs/apk/release/app-release.apk`

Alternatively, you can use Expo Application Services (EAS):
```bash
npm install -g eas-cli
eas build -p android --profile preview
```
