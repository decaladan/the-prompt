import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '../theme/colors';
import {getHighScore} from '../utils/storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const [highScore, setHighScore] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getHighScore().then(setHighScore);
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleSmall}>THE</Text>
        <Text style={styles.title}>PROMPT</Text>
      </View>

      <View style={styles.center}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate('Game')}
          activeOpacity={0.8}>
          <Text style={styles.playText}>PLAY</Text>
        </TouchableOpacity>

        {highScore > 0 && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>BEST SCORE</Text>
            <Text style={styles.scoreValue}>{highScore}</Text>
          </View>
        )}
      </View>

      <Text style={styles.footer}>Answer the prompt before time runs out!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
  },
  titleSmall: {
    fontSize: 20,
    color: colors.textSecondary,
    letterSpacing: 8,
    fontWeight: '300',
  },
  title: {
    fontSize: 48,
    color: colors.primary,
    fontWeight: '900',
    letterSpacing: 4,
  },
  center: {
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 64,
    paddingVertical: 20,
    borderRadius: 16,
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playText: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 6,
  },
  scoreContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  scoreLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 4,
  },
  scoreValue: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '700',
    marginTop: 4,
  },
  footer: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
});
