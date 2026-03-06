import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, View, Vibration} from 'react-native';
import {colors} from '../theme/colors';
import {getRandomPrompts, Prompt} from '../data/prompts';
import TimerBar from '../components/TimerBar';
import AnswerButton from '../components/AnswerButton';
import {setHighScore} from '../utils/storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';

const TOTAL_ROUNDS = 15;
const BASE_TIME = 6000;
const MIN_TIME = 2500;
const TIME_DECREASE = 200;

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export default function GameScreen({navigation}: Props) {
  const [questions] = useState<Prompt[]>(() => getRandomPrompts(TOTAL_ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timerKey, setTimerKey] = useState(0);
  const isTransitioning = useRef(false);

  const currentQuestion = questions[round];
  const timerDuration = Math.max(MIN_TIME, BASE_TIME - round * TIME_DECREASE);

  const endGame = useCallback(
    (finalScore: number) => {
      setHighScore(finalScore);
      navigation.replace('GameOver', {score: finalScore});
    },
    [navigation],
  );

  const nextRound = useCallback(() => {
    if (round + 1 >= TOTAL_ROUNDS) {
      endGame(score);
    } else {
      isTransitioning.current = false;
      setSelectedIndex(null);
      setPaused(false);
      setRound(r => r + 1);
      setTimerKey(k => k + 1);
    }
  }, [round, score, endGame]);

  const handleTimeout = useCallback(() => {
    if (isTransitioning.current) {return;}
    isTransitioning.current = true;
    Vibration.vibrate(200);
    setStreak(0);
    setPaused(true);
    setTimeout(() => nextRound(), 800);
  }, [nextRound]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (isTransitioning.current) {return;}
      isTransitioning.current = true;
      setSelectedIndex(index);
      setPaused(true);

      if (index === currentQuestion.correctIndex) {
        const bonus = streak >= 3 ? 2 : 1;
        const points = 10 * bonus;
        setScore(s => {
          const newScore = s + points;
          if (round + 1 >= TOTAL_ROUNDS) {
            setTimeout(() => endGame(newScore), 600);
          } else {
            setTimeout(() => nextRound(), 600);
          }
          return newScore;
        });
        setStreak(s => s + 1);
      } else {
        Vibration.vibrate(200);
        setStreak(0);
        setTimeout(() => nextRound(), 800);
      }
    },
    [currentQuestion, streak, round, nextRound, endGame],
  );

  if (!currentQuestion) {return null;}

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.roundText}>
          {round + 1}/{TOTAL_ROUNDS}
        </Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
        {streak >= 3 && <Text style={styles.streakText}>x2 STREAK!</Text>}
      </View>

      <TimerBar
        key={timerKey}
        duration={timerDuration}
        onTimeout={handleTimeout}
        paused={paused}
      />

      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.answersGrid}>
        {currentQuestion.answers.map((answer, index) => {
          let showResult: 'correct' | 'wrong' | null = null;
          if (selectedIndex !== null) {
            if (index === currentQuestion.correctIndex) {
              showResult = 'correct';
            } else if (index === selectedIndex) {
              showResult = 'wrong';
            }
          }
          return (
            <AnswerButton
              key={index}
              text={answer}
              index={index}
              onPress={() => handleAnswer(index)}
              disabled={paused}
              showResult={showResult}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  scoreText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  streakText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '800',
  },
  questionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  questionText: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
  },
  answersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
});
