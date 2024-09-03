import { TExpense } from '../../entities/expense/ui/ExpenseTable.tsx';
import { CurrencyEnum } from '../constants/currencyEnum.ts';

export type TPeriod = {
  from: Date;
  to: Date;
};

export const spentThisPeriod = (expenses: TExpense[], period: TPeriod, currency: CurrencyEnum) => {
  return expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= period.from && expenseDate <= period.to;
    })
    .reduce((acc, expense) => {
      return acc + expense.amount / expense.exchangeRates[currency];
    }, 0);
};
