import React from 'react';
import { FlatList } from 'react-native';
import ExpensesDayGroup from './ExpensesDayGroup.tsx';
import { CurrencyEnum } from '../../../shared/constants/currencyEnum.ts';

export type TExpense = {
  _id: string;
  amount: number;
  categoryId: string;
  paymentSourceId: string;
  createdAt: string;
  comments?: string;
  currency: CurrencyEnum;
  exchangeRates: Record<CurrencyEnum, number>;
};
type TExpenseTableProps = {
  expenses: TExpense[];
};

const groupExpensesByDate = (expenses: TExpense[]) => {
  return expenses.reduce(
    (groups, expense) => {
      const date = new Date(expense.createdAt).toISOString().split('T')[0];

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(expense);

      return groups;
    },
    {} as Record<string, TExpense[]>,
  );
};

const ExpenseTable = ({ expenses }: TExpenseTableProps) => {
  return (
    <FlatList
      data={Object.entries(groupExpensesByDate(expenses))}
      keyExtractor={([date]) => date}
      renderItem={({ item: [date, expense] }) => <ExpensesDayGroup expenses={expense} date={date} />}
    />
  );
};

export default ExpenseTable;
