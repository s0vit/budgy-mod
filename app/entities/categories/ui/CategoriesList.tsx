import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { budgyApi } from '../../../api/budgyApi.ts';
import { CategoryItem } from './CategoryItem.tsx';
import TitleText from '../../../ui-kit/TitleText.tsx';

const CategoriesList = () => {
  const { data: categories, isLoading: isLoadingConfig } = useSelector(
    budgyApi.endpoints.categoryControllerGetAll.select(),
  );
  if (isLoadingConfig) {
    return <Text>Loading...</Text>;
  }

  if (Array.isArray(categories) && !categories.length) {
    return <Text>No categories found</Text>;
  }

  return (
    <View style={styles.centeredContainer}>
      <TitleText title={'Categories'} />
      <FlatList style={styles.child} data={categories} renderItem={CategoryItem} />
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
  },
  child: {
    width: '100%',
  },
});
