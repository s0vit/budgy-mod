import React from 'react';
import { FlatList } from 'react-native';
import ExpensesDayGroup from './ExpensesDayGroup.tsx';
import { ExpenseOutputDto } from '../../../api/budgyApi.ts';

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
  return (
    <FlatList
      data={expenses ? Object.entries(groupExpensesByDate(expenses)) : []}
      keyExtractor={([date]) => date}
      renderItem={({ item: [date, expense] }) => <ExpensesDayGroup expenses={expense} date={date} />}
    />
  );
};

export default ExpenseTable;
