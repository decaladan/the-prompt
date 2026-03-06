import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {colors} from '../theme/colors';

interface TimerBarProps {
  duration: number;
  onTimeout: () => void;
  paused: boolean;
}

export default function TimerBar({duration, onTimeout, paused}: TimerBarProps) {
  const progress = useRef(new Animated.Value(1)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    progress.setValue(1);
    if (!paused) {
      animRef.current = Animated.timing(progress, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      });
      animRef.current.start(({finished}) => {
        if (finished) {
          onTimeout();
        }
      });
    }
    return () => {
      animRef.current?.stop();
    };
  }, [duration, paused, onTimeout, progress]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const backgroundColor = progress.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [colors.error, '#ff8c00', colors.success],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, {width, backgroundColor}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 16,
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});
