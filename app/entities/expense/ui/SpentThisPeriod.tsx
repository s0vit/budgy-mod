import React, { useState } from 'react';
import { calculateSpentThisPeriod, TPeriod } from '../../../shared/utils/calculateSpentThisPeriod.ts';
import { currencyEnum, currencyItems } from '../../../shared/constants/currencyEnum.ts';
import { View, Text, StyleSheet } from 'react-native';
import CustomPicker from '../../../widgets/CustomPicker.tsx';
import { ExpenseOutputDto } from '../../../api/budgyApi.ts';

type TSpendThisPeriodProps = {
  expenses?: ExpenseOutputDto[];
};

const SpentThisPeriod = ({ expenses }: TSpendThisPeriodProps) => {
  const [currency, setCurrency] = useState<currencyEnum>(currencyEnum.EUR);
  const [period, setPeriod] = useState<'month' | 'week' | 'year'>('month');
  const thisMonthPeriod: TPeriod = {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  };
  const thisWeekPeriod: TPeriod = {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    to: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
  };
  const thisYearPeriod: TPeriod = {
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(new Date().getFullYear(), 11, 31),
  };

  const periodMap = {
    month: thisMonthPeriod,
    week: thisWeekPeriod,
    year: thisYearPeriod,
  };

  //TODO - implement select period

  const spent = calculateSpentThisPeriod(expenses || [], periodMap[period], currency);

  return (
    <View style={styles.container}>
      <Text style={styles.totalAmount}>Spent this month: {spent} </Text>
      <CustomPicker value={currency} setValue={setCurrency} items={currencyItems} />
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
