import React, { useState } from 'react';
import ExpenseInput from '../entities/expense/ui/ExpenseInput.tsx';
import expensesMock from '../../expenses.mock.json';
import { CurrencyEnum } from '../shared/constants/currencyEnum.ts';

const HomeScreen = () => {
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.EUR);
  const [expenses, setExpenses] = useState(expensesMock);
  const addExpense = ({
    categoryId,
    paymentSourceId,
    amount,
  }: {
    categoryId: string;
    paymentSourceId: string;
    amount: number;
  }) => {
    const newExpense = {
      ...expenses[0],
      _id: Math.random().toString(),
      createdAt: new Date().toISOString(),
      amount,
      categoryId,
      paymentSourceId,
    };
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };
  return <ExpenseInput addExpense={addExpense} />;
};

export default HomeScreen;
