import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import ExpensesDayGroup from './ExpensesDayGroup.tsx';
import { ExpenseOutputDto } from '../../../api/budgyApi.ts';
import { colors } from '../../../shared/constants/colors.ts';

type TExpenseTableProps = {
  expenses?: ExpenseOutputDto[] | undefined;
};

const groupExpensesByDate = (expenses: ExpenseOutputDto[]) => {
  return expenses.reduce(
    (groups, expense) => {
      const date = new Date(expense.createdAt).toISOString().split('T')[0];

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(expense);

      return groups;
    },
    {} as Record<string, ExpenseOutputDto[]>,
  );
};

const ExpenseTable = ({ expenses }: TExpenseTableProps) => {
  return expenses?.length === 0 ? (
    <Text style={styles.noExpensesText}>No expenses yet!</Text>
  ) : (
    <FlatList
      data={expenses ? Object.entries(groupExpensesByDate(expenses)) : []}
      keyExtractor={([date]) => date}
      renderItem={({ item: [date, expense] }) => <ExpensesDayGroup expenses={expense} date={date} />}
    />
  );
};

export default ExpenseTable;

const styles = StyleSheet.create({
  noExpensesText: {
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    backgroundColor: colors.accentDark,
    color: colors.white100,
    borderColor: colors.white60,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
  },
});
