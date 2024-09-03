import React, { useState } from 'react';
import { TExpense } from './ExpenseTable.tsx';
import { spentThisPeriod, TPeriod } from '../../../shared/utils/spentThisPeriod.ts';
import { CurrencyEnum } from '../../../shared/constants/currencyEnum.ts';
import { View, Text, StyleSheet } from 'react-native';
import CurrencyPicker from '../../../widgets/CurrencyPicker.tsx';
import expenses from '../../../../expenses.mock.json';

const SpentThisPeriod = () => {
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.EUR);
  const thisMonthPeriod: TPeriod = {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  };

  const spent = spentThisPeriod(expenses, thisMonthPeriod, currency);
  return (
    <View style={styles.container}>
      <Text style={styles.totalAmount}>Spent this month: {spent} </Text>
      <CurrencyPicker currency={currency} setCurrency={setCurrency} />
    </View>
  );
};

export default SpentThisPeriod;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalAmount: {
    fontSize: 20,
    flex: 10,
    fontFamily: 'inter',
  },
});
