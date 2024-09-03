import React, { PropsWithChildren } from 'react';
import { useWindowDimensions, StyleSheet, View } from 'react-native';
import { colors } from '../shared/constants/colors.ts';

type CardProps = {
  extraStyles?: Record<string, unknown>;
};

const Card = ({ children, extraStyles }: PropsWithChildren<CardProps>) => {
  const { height: deviceHeight, width: deviceWidth } = useWindowDimensions();
  const padding = deviceHeight < 600 ? 5 : 10;
  const paddingHorizontal = deviceWidth < 350 ? 5 : 10;
  return (
    <View
      style={{
        ...styles.container,
        padding,
        paddingHorizontal,
        ...extraStyles,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white100,
    borderRadius: 10,
    shadowColor: colors.black100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
export default Card;
