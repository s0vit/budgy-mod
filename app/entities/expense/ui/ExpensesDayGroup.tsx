import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { TExpense } from './ExpenseTable.tsx';
import ExpenseItem from './ExpenseItem.tsx';
import { colors } from '../../../shared/constants/colors.ts';
import Card from '../../../ui-kit/Card.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TExpensesDayGroupProps = {
  date: string;
  expenses: TExpense[];
};

const ExpensesDayGroup = ({ expenses, date }: TExpensesDayGroupProps) => {
  const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const { width, height } = useWindowDimensions();
  const { left, right } = useSafeAreaInsets();
  const isVertical = height > width;
  return (
    <Card
      extraStyles={{
        ...styles.container,
        marginRight: isVertical ? 0 : right,
        marginLeft: isVertical ? 0 : left,
      }}
    >
      <View style={styles.totalAmountContainer}>
        <Text>{new Date(date).toLocaleDateString()}</Text>
        <Text style={styles.totalAmount}>{totalAmount}</Text>
      </View>
      <View style={styles.expensesContainer}>
        {expenses.map((expense) => (
          <ExpenseItem key={expense._id} item={expense} />
        ))}
      </View>
    </Card>
  );
};

export default ExpensesDayGroup;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  totalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalAmount: {
    fontSize: 20,
    fontFamily: 'interBold',
  },
  expensesContainer: {
    marginLeft: 10,
  },
});
