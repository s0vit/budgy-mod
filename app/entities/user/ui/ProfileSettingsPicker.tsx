import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Picker from 'react-native-picker-select';
import { colors } from '../../../shared/constants/colors.ts';
import { UserConfigOutputDto } from '../../../api/budgyApi.ts';

type TProfileSettingsPickerProps<T extends keyof UserConfigOutputDto> = {
  value: UserConfigOutputDto[T];
  handleSave: ({ label, value }: { label: T; value: UserConfigOutputDto[T] }) => void;
  items: { label: string; value: UserConfigOutputDto[T] }[];
  label: T;
  isDisabled?: boolean;
};

const ProfileSettingsPicker = <T extends keyof UserConfigOutputDto>({
  value,
  handleSave,
  items,
  label,
  isDisabled,
}: TProfileSettingsPickerProps<T>) => {
  const handlePickerChange = (newValue: UserConfigOutputDto[T]) => {
    handleSave({ label, value: newValue });
  };

  return (
    <View style={[styles.settingContainer, isDisabled && styles.disabledContainer]}>
      <Text style={styles.text}>{label}</Text>
      <Picker
        disabled={isDisabled}
        value={value}
        style={pickerSelectStyles}
        onValueChange={handlePickerChange}
        items={items}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    backgroundColor: colors.white80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.black100,
  },
  disabledContainer: {
    opacity: 0.9,
  },
  text: {
    fontSize: 16,
    fontFamily: 'inter',
  },
});

const pickerSelectStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.black60,
    borderRadius: 4,
    color: colors.black100,
    paddingRight: 10,
    fontFamily: 'interBold',
    width: 100,
    textAlign: 'right',
    backgroundColor: colors.white100,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.black60,
    borderRadius: 4,
    color: colors.black100,
    paddingRight: 10,
    fontFamily: 'interBold',
    width: 150,
    textAlign: 'right',
    backgroundColor: colors.white100,
  },
});

export default ProfileSettingsPicker;
