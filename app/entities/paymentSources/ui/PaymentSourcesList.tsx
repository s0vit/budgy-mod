import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { budgyApi } from '../../../api/budgyApi.ts';
import TitleText from '../../../ui-kit/TitleText.tsx';
import React from 'react';
import { PaymentSourcesItem } from './PaymentSourcesItem.tsx';

const PaymentSourcesList = () => {
  const { data: sources, isLoading } = useSelector(budgyApi.endpoints.paymentSourceControllerGetAll.select());
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (Array.isArray(sources) && !sources.length) {
    return <Text>No categories found</Text>;
  }

  return (
    <View style={styles.centeredContainer}>
      <TitleText title={'Sources'} />
      <FlatList style={styles.child} data={sources} renderItem={PaymentSourcesItem} />
    </View>
  );
};

export default PaymentSourcesList;

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
  },
  child: {
    width: '100%',
  },
});
