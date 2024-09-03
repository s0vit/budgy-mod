import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HorizontalItem from './HorizontalItem.tsx';
import { colors } from '../../shared/constants/colors.ts';

export type HorizontalItemProps = {
  _id: string;
  color: string;
  title: string;
};

type THorizontalListProps = {
  items: HorizontalItemProps[];
  selectedItem: string;
  setItem: (id: string) => void;
};

const HorizontalList = ({ items, setItem, selectedItem }: THorizontalListProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {items.map((item) => (
          <HorizontalItem item={item} key={item._id} selectedItem={selectedItem} setItem={setItem} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: colors.white100,
    shadowColor: colors.black100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
});
