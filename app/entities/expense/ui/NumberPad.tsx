// NumberPad.tsx
import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors } from '../../../shared/constants/colors.ts';

type TNumberPadProps = {
  setAmount: Dispatch<SetStateAction<string>>;
};

const NumberPad = ({ setAmount }: TNumberPadProps) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'];
  const { width, height } = useWindowDimensions();
  const isVertical = height > width;

  const handleNumberPress = (value: string) => {
    setAmount((prevValue) => {
      if (value === '⌫') {
        return prevValue.length === 1 ? '0' : prevValue.slice(0, -1);
      } else if (value !== '.' && prevValue === '0') {
        return value;
      } else if (value === '.' && prevValue.includes('.')) {
        return prevValue;
      } else if (prevValue.split('.')[1]?.length >= 2) {
        return prevValue;
      } else {
        return `${prevValue}${value}`;
      }
    });
  };

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      {nums.map((item) => (
        <Pressable
          key={item}
          style={{
            ...styles.button,
            paddingVertical: isVertical ? 16 : 8,
            paddingHorizontal: isVertical ? 16 : 8,
          }}
          onPress={() => handleNumberPress(String(item))}
        >
          <Text style={styles.text}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default NumberPad;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '30%',
    backgroundColor: colors.accent,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: colors.white100,
    fontSize: 24,
    fontFamily: 'interBold',
  },
});
