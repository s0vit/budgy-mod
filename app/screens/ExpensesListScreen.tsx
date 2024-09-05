import React from 'react';
import ExpenseTable from '../entities/expense/ui/ExpenseTable.tsx';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../shared/constants/colors.ts';
import { useExpenseControllerGetOwnQuery } from '../api/budgyApi.ts';

const ExpensesListScreen = () => {
  const { data, isLoading, error } = useExpenseControllerGetOwnQuery({});
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error: {`${error}`}</Text>
      </View>
    );
  }
  return (
    <View style={styles.expensesContainer}>
      <ExpenseTable expenses={data} />
    </View>
  );
};

export default ExpensesListScreen;

const styles = StyleSheet.create({
  expensesContainer: {
    borderColor: colors.white60,
    borderTopWidth: 1,
    paddingTop: 5,
    flex: 7,
  },
});
