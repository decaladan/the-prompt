# Gotchas

## AsyncStorage v3 broken on Android
- `@react-native-async-storage/async-storage@3.x` depends on `org.asyncstorage.shared_storage:storage-android:1.0.0` which is not published to Maven Central
- Use v2.1.2 instead

## Java not in PATH
- `brew install openjdk@17` is keg-only on macOS
- Must export: `JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home`

## android/local.properties required
- Even with ANDROID_HOME set, Gradle may not find SDK
- Create `android/local.properties` with `sdk.dir=/Users/carlosdomingo/Library/Android/sdk`
