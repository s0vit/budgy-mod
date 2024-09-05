import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { budgyApi, Currency, Language, Theme, useUserConfigControllerUpdateConfigMutation } from '../api/budgyApi.ts';
import { selectUser } from '../entities/user/model/userSlice.ts';
import ProfileSettingsPicker from '../entities/user/ui/ProfileSettingsPicker.tsx';
import ProfileSettingsToggle from '../entities/user/ui/ProfileSettingsToggle.tsx';

const ProfileScreen = () => {
  const { data: userConfig, isLoading: isLoadingConfig } = useSelector(
    budgyApi.endpoints.userConfigControllerGetConfig.select(),
  );
  const [updateConfig, { isLoading: isUploadingConfig, error }] = useUserConfigControllerUpdateConfigMutation();
  const user = useSelector(selectUser);

  const isLoading = isUploadingConfig || isLoadingConfig;

  if (!userConfig || !user) {
    return null;
  }

  if (error) {
    Alert.alert('Error', 'Failed to update user config');
  }

  const handleSave = ({ label, value }: { label: keyof typeof userConfig; value: string | boolean }) => {
    const { _id, ...other } = userConfig;
    updateConfig({
      id: _id,
      userConfigInputDto: {
        ...other,
        [label]: value,
      },
    });
  };

  const currencyOptions = Object.keys(Currency).map((key) => ({
    label: Currency[key as keyof typeof Currency],
    value: Currency[key as keyof typeof Currency],
  }));

  const languageOptions = Object.keys(Language).map((key) => ({
    label: Language[key as keyof typeof Language],
    value: Language[key as keyof typeof Language],
  }));

  const themeOptions = Object.keys(Theme).map((key) => ({
    label: Theme[key as keyof typeof Theme],
    value: Theme[key as keyof typeof Theme],
  }));

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          {user.avatar && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
          <View>
            <Text style={styles.emailText}>{user.email}</Text>
            <Text style={styles.isVerified}>Email is {user.isVerified ? 'verified' : 'not verified'}</Text>
          </View>
        </View>

        <ProfileSettingsPicker
          value={userConfig.currency}
          handleSave={handleSave}
          items={currencyOptions}
          label="currency"
          isDisabled={isLoading}
        />
        <ProfileSettingsPicker
          value={userConfig.language}
          handleSave={handleSave}
          items={languageOptions}
          label="language"
          isDisabled={isLoading}
        />
        <ProfileSettingsPicker
          isDisabled={isLoading}
          value={userConfig.theme}
          handleSave={handleSave}
          items={themeOptions}
          label="theme"
        />

        <ProfileSettingsToggle
          isDisabled={isLoading}
          value={userConfig.showCategoryColours}
          handleSave={handleSave}
          label="showCategoryColours"
        />
        <ProfileSettingsToggle
          isDisabled={isLoading}
          value={userConfig.showSourceColours}
          handleSave={handleSave}
          label="showSourceColours"
        />
        <ProfileSettingsToggle
          isDisabled={isLoading}
          value={userConfig.showCategoryNames}
          handleSave={handleSave}
          label="showCategoryNames"
        />
        <ProfileSettingsToggle
          isDisabled={isLoading}
          value={userConfig.showSourceNames}
          handleSave={handleSave}
          label="showSourceNames"
        />
        <ProfileSettingsToggle
          value={userConfig.showSharedExpenses}
          handleSave={handleSave}
          isDisabled={isLoading}
          label="showSharedExpenses"
        />
        <ProfileSettingsToggle
          isDisabled={isLoading}
          value={userConfig.showSharedCategories}
          handleSave={handleSave}
          label="showSharedCategories"
        />
        <ProfileSettingsToggle
          isDisabled={isLoading}
          value={userConfig.showSharedSources}
          handleSave={handleSave}
          label="showSharedSources"
        />
        <ProfileSettingsToggle
          isDisabled={isLoading}
          value={userConfig.showExpensesInEachCurrency}
          handleSave={handleSave}
          label="showExpensesInEachCurrency"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  userInfoContainer: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(249,249,249,0.7)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  isVerified: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'inter',
  },
  emailText: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'inter',
  },
});

export default ProfileScreen;
