import { currencyEnum } from '../constants/currencyEnum.ts';
import { ExpenseOutputDto } from '../../api/budgyApi.ts';

export type TPeriod = {
  from: Date;
  to: Date;
};

export const calculateSpentThisPeriod = (expenses: ExpenseOutputDto[], period: TPeriod, currency: currencyEnum) => {
  return expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= period.from && expenseDate <= period.to;
    })
    .reduce((acc, expense) => {
      const rates = expense.exchangeRates as Record<currencyEnum, number>;
      console.log(expense.amount, rates[currency]);
      return acc + expense.amount * rates[currency];
    }, 0)
    .toFixed(2);
};
