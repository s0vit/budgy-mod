// ActionButtons.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/constants/colors.ts';

type TActionButtonsProps = {
  handleSave: () => void;
  handleClear: () => void;
};

const ActionButtons = ({ handleSave, handleClear }: TActionButtonsProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
        <Text style={styles.text}>CLEAR</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.saveButton]} onPress={handleSave}>
        <Text style={styles.text}>SAVE</Text>
      </Pressable>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: colors.warn,
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  text: {
    color: colors.white100,
    fontSize: 18,
    fontFamily: 'inter',
  },
});
