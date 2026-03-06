import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';

const buttonColors = [colors.buttonA, colors.buttonB, colors.buttonC, colors.buttonD];

interface AnswerButtonProps {
  text: string;
  index: number;
  onPress: () => void;
  disabled: boolean;
  showResult?: 'correct' | 'wrong' | null;
}

export default function AnswerButton({text, index, onPress, disabled, showResult}: AnswerButtonProps) {
  let bgColor = buttonColors[index % 4];
  if (showResult === 'correct') {
    bgColor = colors.success;
  } else if (showResult === 'wrong') {
    bgColor = colors.error;
  }

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: bgColor}]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '48%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
