# The Prompt - Setup & Build Instructions

## Prerequisites

### Mac
1. **Node.js 18+** - Download from https://nodejs.org/
2. **Java 17** - Install via Homebrew:
   ```bash
   brew install openjdk@17
   ```
   Then set JAVA_HOME (add to your ~/.zshrc):
   ```bash
   export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
   ```
3. **Android Studio** - Download from https://developer.android.com/studio
   - During install, make sure to install: Android SDK, Android SDK Platform 34+, Android Virtual Device
   - After install, open Android Studio > Settings > Languages & Frameworks > Android SDK
   - Install SDK Platform Android 14 (API 34) or higher
   - Install SDK Tools: Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools

4. Set ANDROID_HOME (add to your ~/.zshrc):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

### Windows (PC)
1. **Node.js 18+** - Download from https://nodejs.org/
2. **Java 17 (JDK)** - Download from https://adoptium.net/ (Temurin 17)
   - During install, check "Set JAVA_HOME variable"
3. **Android Studio** - Download from https://developer.android.com/studio
   - During install, make sure to install: Android SDK, Android SDK Platform 34+, Android Virtual Device
   - After install, open Android Studio > Settings > Languages & Frameworks > Android SDK
   - Install SDK Platform Android 14 (API 34) or higher
   - Install SDK Tools: Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools

4. Set environment variables (System Properties > Environment Variables):
   ```
   ANDROID_HOME = C:\Users\YOUR_USER\AppData\Local\Android\Sdk
   ```
   Add to PATH:
   ```
   %ANDROID_HOME%\emulator
   %ANDROID_HOME%\platform-tools
   ```

---

## Install Dependencies

Open a terminal (Mac) or Command Prompt (Windows) in the project folder:

```bash
npm install
```

---

## Running the App (Development)

### Option 1: On an Android Emulator
1. Open Android Studio
2. Open AVD Manager (Tools > Device Manager)
3. Create a virtual device if you don't have one (e.g. Pixel 7, API 34)
4. Start the emulator
5. In terminal, run:
   ```bash
   npx react-native run-android
   ```

### Option 2: On a Physical Android Device
1. Enable Developer Options on your phone (Settings > About Phone > tap Build Number 7 times)
2. Enable USB Debugging in Developer Options
3. Connect phone via USB
4. Run:
   ```bash
   npx react-native run-android
   ```

---

## Building the Release APK (for testing)

```bash
cd android
./gradlew assembleRelease
```

The APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

On Windows use `gradlew.bat` instead of `./gradlew`.

---

## Building the Release AAB (for Google Play Store submission)

### Step 1: Set Up Your Signing Keystore

You have two options:

**Option A: Use the included keystore (for testing only)**
The project includes a keystore at `android/app/theprompt-release.keystore`. This works but you should generate your own for production.

**Option B: Generate your own keystore (recommended for store submission)**
```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore android/app/your-release.keystore \
  -alias your-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000
```

Then update `android/app/build.gradle` in the `signingConfigs > release` section:
```groovy
release {
    storeFile file('your-release.keystore')
    storePassword 'YOUR_PASSWORD'
    keyAlias 'your-key-alias'
    keyPassword 'YOUR_PASSWORD'
}
```

### Step 2: Build the AAB

```bash
cd android
./gradlew bundleRelease
```

The AAB will be at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

### Step 3: Upload to Google Play Console
1. Go to https://play.google.com/console
2. Create your app > Upload the AAB file
3. Fill in the store listing using the info in `store-listing.md`
4. Upload assets from the `assets/` folder:
   - `icon-512.png` - App icon (512x512)
   - `feature-graphic.png` - Feature graphic (1024x500)
   - `screenshot-home.png` - Screenshot 1
   - `screenshot-game.png` - Screenshot 2
5. Set privacy policy URL: https://decaladan.github.io/the-prompt/
6. Complete content rating (casual trivia game, no violence, no data collection)
7. Data safety: select "No data collected"
8. Submit for review

---

## Project Structure

```
the_prompt/
├── App.tsx                          # Root app with navigation
├── src/
│   ├── screens/
│   │   ├── SplashScreen.tsx         # Animated splash screen
│   │   ├── HomeScreen.tsx           # Main menu with Play button
│   │   ├── GameScreen.tsx           # Core trivia gameplay
│   │   └── GameOverScreen.tsx       # Score results
│   ├── data/
│   │   └── prompts.ts              # 50 trivia questions
│   ├── components/
│   │   ├── TimerBar.tsx             # Animated countdown bar
│   │   └── AnswerButton.tsx         # Answer buttons
│   ├── utils/
│   │   └── storage.ts              # High score storage
│   └── theme/
│       └── colors.ts               # Color palette
├── android/                         # Android native project
├── assets/                          # Store listing assets
│   ├── icon-512.png                 # Play Store icon
│   ├── feature-graphic.png          # Play Store banner
│   ├── screenshot-home.png          # Store screenshot
│   └── screenshot-game.png          # Store screenshot
├── privacy-policy.html              # Privacy policy
├── store-listing.md                 # Store listing text
└── package.json                     # Dependencies
```

---

## Troubleshooting

### "SDK location not found"
Create `android/local.properties` with:
```
sdk.dir=/path/to/your/Android/sdk
```
Mac default: `sdk.dir=/Users/YOUR_USER/Library/Android/sdk`
Windows default: `sdk.dir=C:\\Users\\YOUR_USER\\AppData\\Local\\Android\\Sdk`

### Java version issues
Make sure JAVA_HOME points to Java 17. Check with:
```bash
java --version
```

### Metro bundler port conflict
If port 8081 is in use:
```bash
npx react-native start --port 8082
```
