# Local Setup

## Prerequisites
- Node.js 25+ (installed)
- Java 17: `export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home`
- Android SDK at `~/Library/Android/sdk`
- Android Studio installed at `/Applications/Android Studio.app`

## Running
```bash
# Set environment
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
export ANDROID_HOME=~/Library/Android/sdk

# Install dependencies
npm install

# Debug build
cd android && ./gradlew assembleDebug

# Release AAB (for Play Store)
cd android && ./gradlew bundleRelease

# Run on device/emulator
npx react-native run-android
```

## Important Notes
- `android/local.properties` must have `sdk.dir` set
- AsyncStorage v2.1.2 is used (v3 has unresolved dependency issues)
- Keystore password: ThePrompt2024 (change for production!)
