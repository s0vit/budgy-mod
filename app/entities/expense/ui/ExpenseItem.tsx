import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { addOpacityToColor } from '../../../shared/utils/addOpacityToColor.ts';
import { getContrastText } from '../../../shared/utils/getContrastText.ts';
import ExpenseItemMenuModal from './ExpenseItemMenuModal.tsx';
import { colors } from '../../../shared/constants/colors.ts';
import { budgyApi, ExpenseOutputDto } from '../../../api/budgyApi.ts';
import { useSelector } from 'react-redux';

type TExpenseItemProps = {
  item: ExpenseOutputDto;
};

const ExpenseItem = ({ item }: TExpenseItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: categories } = useSelector(budgyApi.endpoints.categoryControllerGetAll.select());
  const { data: paymentSources } = useSelector(budgyApi.endpoints.paymentSourceControllerGetAll.select());
  const categoryTitle = categories?.find((category) => category._id === item.categoryId)?.title || 'Unknown';
  const categoryColor = categories?.find((category) => category._id === item.categoryId)?.color || colors.white100;
  const paymentSourceColor =
    paymentSources?.find((paymentSource) => paymentSource._id === item.paymentSourceId)?.color || colors.white100;

  const editItem = (id: string) => {
    console.log('Edit item', id);
  };

  const removeItem = (id: string) => {
    console.log('Remove item', id);
  };

  return (
    <>
      <Pressable onLongPress={setIsMenuOpen.bind(null, true)} style={({ pressed }) => pressed && styles.pressedItem}>
        <View
          style={{
            ...styles.expenseItem,
            borderColor: categoryColor,
            backgroundColor: addOpacityToColor(categoryColor, 0.1),
          }}
        >
          <View style={styles.expenseDetails}>
            <Text style={styles.expenseCategory}>{categoryTitle}</Text>
            <View
              style={{
                ...styles.expenseAmount,
                backgroundColor: paymentSourceColor,
              }}
            >
              <Text
                style={{
                  color: getContrastText(paymentSourceColor),
                }}
              >
                {item.amount} {item.currency}
              </Text>
            </View>
          </View>
          <View style={styles.expenseDate}>
            <Text style={styles.comments}>{new Date(item.createdAt).toLocaleTimeString().slice(0, 5)}</Text>
          </View>
          <View style={styles.expenseDetails}>
            <Text style={styles.comments}>{item.comments}</Text>
          </View>
        </View>
      </Pressable>
      <ExpenseItemMenuModal
        open={isMenuOpen}
        onClose={setIsMenuOpen.bind(null, false)}
        edit={editItem.bind(null, item._id)}
        remove={removeItem.bind(null, item._id)}
      />
    </>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  comments: {
    fontSize: 12,
    fontFamily: 'inter',
    color: colors.black60,
  },
  expenseItem: {
    borderRadius: 5,
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
  },
  expenseCategory: {
    fontFamily: 'inter',
    fontSize: 16,
  },
  expenseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseDate: {
    fontSize: 12,
    fontFamily: 'inter',
    marginTop: 4,
  },
  expenseAmount: {
    borderRadius: 50,
    padding: 5,
    minWidth: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedItem: {
    opacity: 0.7,
  },
});
