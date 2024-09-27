import React from 'react';
import Picker, { PickerStyle } from 'react-native-picker-select';
import { colors } from '../shared/constants/colors.ts';

type TCurrencyPickerProps<T> = {
  value: T;
  items: { label: string; value: T }[];
  setValue: (value: T) => void;
};

const CustomPicker = <T,>({ value, setValue, items }: TCurrencyPickerProps<T>) => {
  return (
    <Picker
      style={styles}
      onValueChange={(itemValue: T) => {
        setValue(itemValue);
      }}
      value={value}
      items={items}
      fixAndroidTouchableBug={true}
      useNativeAndroidPickerStyle={false}
    />
  );
};

export default CustomPicker;

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
