import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../../../shared/constants/colors.ts';
import { UserConfigOutputDto } from '../../../api/budgyApi.ts';

type TProfileSettingsToggleProps = {
  value: boolean;
  handleSave: ({ label, value }: { label: keyof UserConfigOutputDto; value: boolean }) => void;
  label: keyof UserConfigOutputDto;
  isDisabled?: boolean;
};

const ProfileSettingsToggle = ({ label, value, handleSave, isDisabled }: TProfileSettingsToggleProps) => {
  const handleToggle = (newValue: boolean) => {
    handleSave({ label, value: newValue });
  };

  return (
    <View style={[styles.settingContainer, isDisabled && styles.disabledContainer]}>
      <Text style={styles.text}>{label}</Text>
      <Switch value={value} onValueChange={handleToggle} disabled={isDisabled} />
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

export default ProfileSettingsToggle;
