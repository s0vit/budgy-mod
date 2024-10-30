import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { budgyApi, CategoryInputDto, usePaymentSourceControllerCreateMutation } from '../../../api/budgyApi.ts';
import TitleText from '../../../ui-kit/TitleText.tsx';
import React, { useState } from 'react';
import { PaymentSourcesItem } from './PaymentSourcesItem.tsx';
import { colors } from '../../../shared/constants/colors.ts';
import AddNewItemModal from '../../../ui-kit/AddNewItemModal.tsx';

const PaymentSourcesList = () => {
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const { data: sources, isLoading } = useSelector(budgyApi.endpoints.paymentSourceControllerGetAll.select());
  const [createPaymentSource, { isLoading: isLoadingPS, isSuccess: isSuccessPS }] =
    usePaymentSourceControllerCreateMutation();

  const handleCreatePaymentSource = ({ title, comments, color }: CategoryInputDto) => {
    createPaymentSource({ paymentSourceInputDto: { title, comments: comments || '', color } });
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (Array.isArray(sources) && !sources.length) {
    return <Text>No categories found</Text>;
  }

  return (
    <View style={styles.centeredContainer}>
      <TitleText title={'Sources'} />
      <FlatList
        style={styles.child}
        data={sources}
        renderItem={PaymentSourcesItem}
        ListHeaderComponent={() => (
          <Pressable onPress={setIsAddNewModalOpen.bind(null, true)} style={styles.addNew}>
            <Text>Add new</Text>
          </Pressable>
        )}
      />
      {isAddNewModalOpen && (
        <AddNewItemModal
          open={isAddNewModalOpen}
          onClose={setIsAddNewModalOpen.bind(null, false)}
          handleCreate={handleCreatePaymentSource}
          isCreatingDisabled={isLoadingPS}
          forceClose={isSuccessPS}
        />
      )}
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
  addNew: {
    margin: 10,
    backgroundColor: colors.white60,
    justifyContent: 'center',
    padding: 10,
  },
});
