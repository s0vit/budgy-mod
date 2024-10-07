import { CategoryOutputDto } from '../../../api/budgyApi.ts';
import { StyleSheet, Text, View } from 'react-native';
import { addOpacityToColor } from '../../../shared/utils/addOpacityToColor.ts';
import React from 'react';
import { colors } from '../../../shared/constants/colors.ts';

export const CategoryItem = ({ item }: { item: CategoryOutputDto }) => {
  return (
    <View
      style={{
        ...styles.container,
        borderColor: item.color,
      }}
    >
      <View
        style={{
          ...styles.categoryWrapper,
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
  categoryWrapper: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'interSemiBold',
  },
});
