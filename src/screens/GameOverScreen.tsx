import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';
import {getHighScore} from '../utils/storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'GameOver'>;

export default function GameOverScreen({navigation, route}: Props) {
  const {score} = route.params;
  const [highScore, setHighScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getHighScore().then(best => {
      setHighScore(best);
      setIsNewBest(score >= best && score > 0);
    });
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [score, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, {transform: [{scale: scaleAnim}]}]}>
        {isNewBest && <Text style={styles.newBest}>NEW BEST!</Text>}
        <Text style={styles.label}>YOUR SCORE</Text>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.highScore}>Best: {highScore}</Text>
      </Animated.View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.playAgain}
          onPress={() => navigation.replace('Game')}
          activeOpacity={0.8}>
          <Text style={styles.playAgainText}>PLAY AGAIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.replace('Home')}
          activeOpacity={0.8}>
          <Text style={styles.homeText}>HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    marginBottom: 48,
  },
  newBest: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 8,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    letterSpacing: 4,
  },
  score: {
    color: colors.primary,
    fontSize: 72,
    fontWeight: '900',
    marginVertical: 8,
  },
  highScore: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
  },
  playAgain: {
    backgroundColor: colors.primary,
    paddingHorizontal: 48,
    paddingVertical: 18,
    borderRadius: 14,
    width: '80%',
    alignItems: 'center',
    marginBottom: 16,
  },
  playAgainText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 4,
  },
  homeButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 14,
    width: '80%',
    alignItems: 'center',
  },
  homeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
