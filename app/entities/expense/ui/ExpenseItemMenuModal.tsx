import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../shared/constants/colors.ts';

type TExpenseItemMenuProps = {
  open?: boolean;
  onClose: () => void;
  remove: () => void;
  edit: () => void;
};

const ExpenseItemMenuModal = ({ open, onClose, remove, edit }: TExpenseItemMenuProps) => {
  return (
    <Modal visible={open} animationType="slide">
      <View style={styles.container}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text>X</Text>
        </Pressable>
        <View style={styles.menuContainer}>
          <Text style={styles.menuHeaderText}>Menu</Text>
          <Pressable onPress={remove} style={styles.menuButton}>
            <Text>Delete</Text>
          </Pressable>
          <Pressable onPress={edit} style={styles.menuButton}>
            <Text>Edit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.white80,
  },
  menuContainer: {
    padding: 10,
    gap: 10,
    width: '100%',
    backgroundColor: colors.white80,
    borderRadius: 5,
    marginTop: 'auto',
    marginBottom: 30,
  },
  menuHeaderText: {
    fontSize: 20,
    fontFamily: 'interBold',
  },
  menuButton: {
    padding: 10,
    backgroundColor: colors.white60,
    borderRadius: 5,
  },
});

export default ExpenseItemMenuModal;
