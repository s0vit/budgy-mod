import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { addOpacityToColor } from '../../shared/utils/addOpacityToColor.ts';
import { HorizontalItemProps } from './HorizontalList.tsx';

type THorizontalItemProps = {
  item: HorizontalItemProps;
  selectedItem: string;
  setItem: (id: string) => void;
};

const HorizontalItem = ({ item, selectedItem, setItem }: THorizontalItemProps) => {
  return (
    <Pressable key={item._id} onPress={() => setItem(item._id)}>
      <Text
        style={{
          ...styles.itemButton,
          backgroundColor:
            selectedItem === item._id ? addOpacityToColor(item.color, 0.5) : addOpacityToColor(item.color, 0.05),
          borderColor: item.color,
        }}
      >
        {item.title}
      </Text>
    </Pressable>
  );
};

export default HorizontalItem;

const styles = StyleSheet.create({
  itemButton: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    overflow: 'hidden',
    fontFamily: 'inter',
  },
});
