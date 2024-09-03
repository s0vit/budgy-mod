import React from 'react';
import { CurrencyEnum } from '../shared/constants/currencyEnum.ts';
import Picker, { PickerStyle } from 'react-native-picker-select';
import { colors } from '../shared/constants/colors.ts';

type TCurrencyPickerProps = {
  currency: CurrencyEnum;
  setCurrency: (currency: CurrencyEnum) => void;
};

const currencyItems = Object.values(CurrencyEnum).map((currency) => ({ label: currency, value: currency }));

const CurrencyPicker = ({ currency, setCurrency }: TCurrencyPickerProps) => {
  return (
    <Picker
      style={styles}
      onValueChange={(itemValue: CurrencyEnum) => {
        setCurrency(itemValue);
      }}
      value={currency}
      items={currencyItems}
      fixAndroidTouchableBug={true}
      useNativeAndroidPickerStyle={false}
    />
  );
};

export default CurrencyPicker;

const styles: PickerStyle = {
  placeholder: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'inter',
    textAlign: 'center',
  },
  viewContainer: {
    backgroundColor: colors.white80,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white60,
    flex: 2,
    alignContent: 'center',
    justifyContent: 'center',
  },
  headlessAndroidContainer: {
    backgroundColor: colors.white80,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white60,
    marginRight: 10,
    flex: 2,
    alignContent: 'center',
    justifyContent: 'center',
  },
  inputAndroid: {
    color: colors.black100,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'inter',
  },
  inputIOS: {
    color: colors.black100,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'inter',
  },
};
