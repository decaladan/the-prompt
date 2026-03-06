# The Prompt - Architecture

## Overview
"The Prompt" is a React Native mobile word trivia game. Single codebase targeting Android (and later iOS).

## Tech Stack
- **Framework**: React Native 0.84.1
- **Language**: TypeScript
- **Navigation**: React Navigation (native-stack)
- **Storage**: AsyncStorage v2.1.2 (local high score)
- **Build**: Gradle (Android), Metro bundler

## App Structure
```
App.tsx                    # Root - NavigationContainer with 4 screens
src/
  screens/
    SplashScreen.tsx       # Animated logo, auto-navigates to Home
    HomeScreen.tsx         # Play button, high score display
    GameScreen.tsx         # Core gameplay loop (15 rounds, timer, 4 answers)
    GameOverScreen.tsx     # Score display, play again / home buttons
  data/
    prompts.ts             # 50 trivia questions with 4 answers each
  components/
    TimerBar.tsx           # Animated countdown bar (color shifts)
    AnswerButton.tsx       # Colored answer tap targets
  utils/
    storage.ts             # AsyncStorage wrapper for high score
  theme/
    colors.ts              # Dark theme color palette
```

## Game Logic
- 15 rounds per game
- Timer starts at 6s, decreases 200ms per round (min 2.5s)
- Correct answer = 10 points (x2 if streak >= 3)
- Wrong/timeout = streak reset, no points
- High score persisted locally

## Android Config
- Package ID: `com.theprompt`
- Target SDK: 36 (Android 14+)
- Min SDK: 24
- Signing keystore: `android/app/theprompt-release.keystore`
- Release AAB: `android/app/build/outputs/bundle/release/app-release.aab`

## External Dependencies
- No network calls
- No analytics
- No ads
- No user accounts
- Fully offline
