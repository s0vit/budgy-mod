import { TExpense } from '../../entities/expense/ui/ExpenseTable.tsx';
import { StackNavigationProp } from '@react-navigation/stack';

export type BottomTabParamList = {
  [BOTTOM_TAB_ROUTES.LOGIN]: undefined;
  [BOTTOM_TAB_ROUTES.EXPENSES]: undefined;
  [BOTTOM_TAB_ROUTES.SOURCES]: undefined;
  [BOTTOM_TAB_ROUTES.CATEGORIES]: undefined;
  [BOTTOM_TAB_ROUTES.ADD]: undefined;
  [BOTTOM_TAB_ROUTES.PROFILE]: undefined;
};

export type RootStackParamList = {
  [ROOT_STACK_ROUTES.MAIN]: undefined;
  [ROOT_STACK_ROUTES.ADD_EXPENSE_MODAL]: { expense?: TExpense };
  [ROOT_STACK_ROUTES.CATEGORY_MODAL]: { categoryId?: string };
  [ROOT_STACK_ROUTES.SOURCE_MODAL]: { sourceId?: string };
  [ROOT_STACK_ROUTES.PROFILE_MODAL]: undefined;
};

//types for useNavigation hook

export enum ROOT_STACK_ROUTES {
  MAIN = 'Main',
  ADD_EXPENSE_MODAL = 'AddExpenseModal',
  CATEGORY_MODAL = 'CategoryModal',
  SOURCE_MODAL = 'SourceModal',
  PROFILE_MODAL = 'ProfileModal',
}

export enum BOTTOM_TAB_ROUTES {
  LOGIN = 'Login',
  EXPENSES = 'Expenses',
  SOURCES = 'Sources',
  CATEGORIES = 'Categories',
  ADD = 'Add',
  PROFILE = 'Profile',
}

export type RootType = Record<ROOT_STACK_ROUTES, RootStackParamList[ROOT_STACK_ROUTES]>;
export type StackNavigation = StackNavigationProp<RootType, ROOT_STACK_ROUTES>;
