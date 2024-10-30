import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { budgyApi, CategoryInputDto, useCategoryControllerCreateMutation } from '../../../api/budgyApi.ts';
import { CategoryItem } from './CategoryItem.tsx';
import TitleText from '../../../ui-kit/TitleText.tsx';
import { colors } from '../../../shared/constants/colors.ts';
import AddNewItemModal from '../../../ui-kit/AddNewItemModal.tsx';

const CategoriesList = () => {
  const { data: categories, isLoading } = useSelector(budgyApi.endpoints.categoryControllerGetAll.select());
  const [createCategory, { isLoading: isLoadingCategory, isSuccess: isSuccessCategory }] =
    useCategoryControllerCreateMutation();
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (Array.isArray(categories) && !categories.length) {
    return <Text>No categories found</Text>;
  }

  const handleCreateCategory = ({ title, comments, color }: CategoryInputDto) => {
    createCategory({ categoryInputDto: { title, comments, color } });
  };

  return (
    <View style={styles.centeredContainer}>
      <TitleText title={'Categories'} />
      <FlatList
        style={styles.child}
        data={categories}
        renderItem={CategoryItem}
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
          handleCreate={handleCreateCategory}
          isCreatingDisabled={isLoadingCategory}
          forceClose={isSuccessCategory}
        />
      )}
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
  addNew: {
    margin: 10,
    backgroundColor: colors.white60,
    justifyContent: 'center',
    padding: 10,
  },
});
