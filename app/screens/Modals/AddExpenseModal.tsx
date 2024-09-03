import { createStackNavigator } from '@react-navigation/stack';
import ExpenseInput from '../../entities/expense/ui/ExpenseInput.tsx';

const Stack = createStackNavigator();

export const AddExpenseModal = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddExpense"
        component={ExpenseInput}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
