import { PaymentSourceOutputDto } from '../../../api/budgyApi.ts';
import { StyleSheet, Text, View } from 'react-native';
import { addOpacityToColor } from '../../../shared/utils/addOpacityToColor.ts';
import { colors } from '../../../shared/constants/colors.ts';
import React from 'react';

export const PaymentSourcesItem = ({ item }: { item: PaymentSourceOutputDto }) => {
  return (
    <View
      style={{
        ...styles.container,
        borderColor: item.color,
      }}
    >
      <View
        style={{
          ...styles.wrapper,
          backgroundColor: addOpacityToColor(item.color, 0.2),
        }}
      >
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white80,
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  wrapper: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'interSemiBold',
  },
});
