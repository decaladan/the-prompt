import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {colors} from '../theme/colors';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({navigation}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {toValue: 1, duration: 800, useNativeDriver: true}),
      Animated.spring(scale, {toValue: 1, friction: 4, useNativeDriver: true}),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity, transform: [{scale}]}}>
        <Animated.Text style={styles.title}>THE</Animated.Text>
        <Animated.Text style={styles.titleBold}>PROMPT</Animated.Text>
        <Animated.Text style={styles.subtitle}>Think Fast. Answer Faster.</Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.textSecondary,
    textAlign: 'center',
    letterSpacing: 8,
    fontWeight: '300',
  },
  titleBold: {
    fontSize: 52,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '900',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: 2,
  },
});
