import React from 'react';
import ExpenseTable from '../entities/expense/ui/ExpenseTable.tsx';
import { StyleSheet, View } from 'react-native';
import { colors } from '../shared/constants/colors.ts';
import expensesMock from './../../expenses.mock.json';

const ExpensesListScreen = () => {
  return (
    <View style={styles.expensesContainer}>
      <ExpenseTable expenses={expensesMock} />
    </View>
  );
};

export default ExpensesListScreen;

const styles = StyleSheet.create({
  expensesContainer: {
    borderColor: colors.white60,
    borderTopWidth: 1,
    paddingTop: 5,
    flex: 7,
  },
});
