import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, useWindowDimensions, View, Platform } from 'react-native';
import NumberPad from './NumberPad';
import HorizontalList from '../../../widgets/HorizontalList/HorizontalList.tsx';
import ActionButtons from './ActionButtons';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { currencyEnum, currencyItems } from '../../../shared/constants/currencyEnum.ts';
import CustomPicker from '../../../widgets/CustomPicker.tsx';
import { colors } from '../../../shared/constants/colors.ts';
import Card from '../../../ui-kit/Card.tsx';
import SpentThisPeriod from './SpentThisPeriod.tsx';
import {
  useCategoryControllerGetAllQuery,
  useExpenseControllerCreateMutation,
  useExpenseControllerGetOwnQuery,
  usePaymentSourceControllerGetAllQuery,
} from '../../../api/budgyApi.ts';

const ExpenseInput = () => {
  const { data: expenses } = useExpenseControllerGetOwnQuery({});
  const { data: categories } = useCategoryControllerGetAllQuery();
  const { data: paymentSources } = usePaymentSourceControllerGetAllQuery();
  const [addExpense] = useExpenseControllerCreateMutation();

  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState('');
  const [currency, setCurrency] = useState<currencyEnum>(currencyEnum.EUR);

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
    if (!selectedCategory || !selectedPaymentSource) {
      Alert.alert('Oops', 'Please select category and payment source');
      return;
    }
    if (Number(amount) <= 0) {
      Alert.alert('Oops', 'Expense amount should be greater than 0');
      return;
    }

    addExpense({
      expenseInputDto: {
        categoryId: selectedCategory,
        paymentSourceId: selectedPaymentSource,
        amount: Number(amount),
        createdAt: getDateTime(date, time).toISOString(),
        currency,
      },
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
      <SpentThisPeriod expenses={expenses} />
    </Card>
  );

  return (
    <View style={isVertical && styles.androidOnly}>
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
              <CustomPicker value={currency} setValue={setCurrency} items={currencyItems} />
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
            <HorizontalList items={categories!} selectedItem={selectedCategory} setItem={setSelectedCategory} />
            <HorizontalList
              items={paymentSources!}
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
    </View>
  );
};

export default ExpenseInput;

const styles = StyleSheet.create({
  androidOnly: {
    marginTop: Platform.OS === 'android' ? 36 : 0,
  },
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
