// ExpenseInput.tsx
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import NumberPad from './NumberPad';
import HorizontalList from '../../../widgets/HorizontalList/HorizontalList.tsx';
import ActionButtons from './ActionButtons';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import categoriesMock from '../../../../category.mock.json';
import paymentSourcesMock from '../../../../paymentSources.mock.json';
import { CurrencyEnum } from '../../../shared/constants/currencyEnum.ts';
import CurrencyPicker from '../../../widgets/CurrencyPicker.tsx';
import { colors } from '../../../shared/constants/colors.ts';
import Card from '../../../ui-kit/Card.tsx';
import SpentThisPeriod from './SpentThisPeriod.tsx';
import expensesMock from '../../../../expenses.mock.json';

const ExpenseInput = () => {
  const [expenses, setExpenses] = useState(expensesMock);

  const addExpense = ({
    categoryId,
    paymentSourceId,
    amount,
    date,
  }: {
    categoryId: string;
    paymentSourceId: string;
    amount: number;
    date: string;
  }) => {
    const newExpense = {
      ...expenses[0],
      _id: Math.random().toString(),
      createdAt: date,
      amount,
      categoryId,
      paymentSourceId,
    };
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState('');
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.EUR);

  const [date, setDate] = useState(new Date());
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  const { width, height } = useWindowDimensions();

  const isVertical = height > width;

  const getDateTime = (date: Date, time: Date) => {
    const newDate = new Date(date);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    return newDate;
  };

  const handleSave = () => {
    addExpense({
      categoryId: selectedCategory,
      paymentSourceId: selectedPaymentSource,
      amount: Number(amount),
      date: getDateTime(date, time).toISOString(),
    });
    setAmount('0');
    setSelectedCategory('');
    setSelectedPaymentSource('');
  };

  const handleClear = () => {
    setAmount('0');
    setSelectedCategory('');
    setSelectedPaymentSource('');
  };

  const spentThisMonthCard = (
    <Card>
      <SpentThisPeriod />
    </Card>
  );

  return (
    <>
      {isVertical && spentThisMonthCard}
      <Card>
        <View
          style={{
            width: isVertical ? '100%' : '50%',
            flexDirection: isVertical ? 'column' : 'row',
            paddingTop: isVertical ? 0 : 24,
          }}
        >
          <View style={styles.inputWrapper}>
            <View style={styles.displayContainer}>
              <TextInput
                style={{
                  ...styles.display,
                  fontSize: isVertical ? 32 : 24,
                  padding: isVertical ? 10 : 5,
                }}
                value={amount}
                editable={false}
              />
              <CurrencyPicker currency={currency} setCurrency={setCurrency} />
            </View>
            <NumberPad setAmount={setAmount} />
          </View>
          <View
            style={{
              marginLeft: isVertical ? 0 : 10,
              paddingBottom: isVertical ? 0 : 5,
              height: isVertical ? 'auto' : '100%',
              justifyContent: 'space-between',
            }}
          >
            {!isVertical && spentThisMonthCard}
            <HorizontalList items={categoriesMock} selectedItem={selectedCategory} setItem={setSelectedCategory} />
            <HorizontalList
              items={paymentSourcesMock}
              selectedItem={selectedPaymentSource}
              setItem={setSelectedPaymentSource}
            />
            <View style={styles.dateContainer}>
              <Button title={time.toLocaleTimeString()} onPress={() => setTimeModalVisible(true)} />
              <Button title={date.toDateString()} onPress={() => setDateModalVisible(true)} />
              <TimePickerModal
                visible={timeModalVisible}
                hours={time.getHours()}
                minutes={time.getMinutes()}
                onDismiss={() => setTimeModalVisible(false)}
                onConfirm={({ hours, minutes }) => {
                  setTime(new Date(date.setHours(hours, minutes)));
                  setTimeModalVisible(false);
                }}
              />
              <DatePickerModal
                mode={'single'}
                locale={'en'}
                visible={dateModalVisible}
                date={date}
                onDismiss={() => setDateModalVisible(false)}
                onConfirm={(params) => {
                  const year = params.date?.getFullYear() || date.getFullYear();
                  const month = params.date?.getMonth() || date.getMonth();
                  const day = params.date?.getDate() || date.getDate();
                  setDate(new Date(date.setFullYear(year, month, day)));
                  setDateModalVisible(false);
                }}
                endDate={new Date()}
                startDate={new Date()}
              />
            </View>
            <ActionButtons handleSave={handleSave} handleClear={handleClear} />
          </View>
        </View>
      </Card>
    </>
  );
};

export default ExpenseInput;

const styles = StyleSheet.create({
  inputWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  display: {
    backgroundColor: colors.white80,
    color: colors.black100,
    fontFamily: 'inter',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white60,
    flex: 9,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
    marginTop: 5,
    backgroundColor: colors.white100,
    shadowColor: colors.black100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
