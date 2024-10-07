import { StyleSheet, Text } from 'react-native';
import { colors } from '../shared/constants/colors.ts';

const TitleText = ({ title }: { title: string }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    width: '80%',
    textAlign: 'center',
    fontFamily: 'interBlack',
    backgroundColor: colors.white100,
    padding: 10,
    color: colors.accentDark,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.black100,
    marginBottom: 50,
    overflow: 'hidden',
  },
});
