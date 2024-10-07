import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import ExpenseItem from './ExpenseItem.tsx';
import Card from '../../../ui-kit/Card.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { budgyApi, ExpenseOutputDto } from '../../../api/budgyApi.ts';
import { useSelector } from 'react-redux';

type TExpensesDayGroupProps = {
  date: string;
  expenses: ExpenseOutputDto[];
};

const ExpensesDayGroup = ({ expenses, date }: TExpensesDayGroupProps) => {
  const { width, height } = useWindowDimensions();
  const { left, right } = useSafeAreaInsets();
  const isVertical = height > width;

  const { data, isLoading } = useSelector(budgyApi.endpoints.userConfigControllerGetConfig.select());

  if (isLoading || !data) {
    return null;
  }

  const totalAmount = expenses
    .reduce((acc, expense) => {
      const userCurrency = data.currency;
      return acc + expense.amount * expense.exchangeRates[userCurrency as keyof typeof expense.exchangeRates]; // TODO: fix ENUM link on backend
    }, 0)
    .toFixed(2);

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
        <Text style={styles.totalAmount}>
          {totalAmount} {data?.currency}
        </Text>
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
    marginLeft: 0,
  },
});
