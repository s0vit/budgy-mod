import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Input from './Input.tsx';
import { colors } from '../shared/constants/colors.ts';
import ColorPicker, { Panel4, Swatches } from 'reanimated-color-picker';
import { getContrastText } from '../shared/utils/getContrastText.ts';
import TitleText from './TitleText.tsx';
import { CategoryInputDto, PaymentSourceInputDto } from '../api/budgyApi.ts';
import Button from './Button.tsx';
import { CategoryItem } from '../entities/categories/ui/CategoryItem.tsx';

type TAddNewCategoryModalProps = {
  open?: boolean;
  onClose: () => void;
  isCreatingDisabled?: boolean;
  forceClose?: boolean;
  handleCreate: ({ comments, color, title }: CategoryInputDto | PaymentSourceInputDto) => void;
};

const AddNewItemModal = ({
  onClose,
  open,
  handleCreate,
  isCreatingDisabled,
  forceClose,
}: TAddNewCategoryModalProps) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const [itemColor, setItemColor] = useState(`#${randomColor}`);

  const onSelectColor = ({ hex }: { hex: string }) => {
    setItemColor(hex);
  };

  const contrastTextColor = getContrastText(itemColor);

  const handleCreateItem = useCallback(() => {
    handleCreate({ title: itemName, color: itemColor, comments: itemDescription });
  }, [handleCreate, itemColor, itemDescription, itemName]);

  useEffect(() => {
    if (forceClose) {
      onClose();
    }
  }, [forceClose, onClose]);

  return (
    <Modal visible={open} animationType="slide">
      <View style={styles.container}>
        <TitleText title={'Create new'} />
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text>X</Text>
        </Pressable>
        <View style={styles.exampleContainer}>
          <CategoryItem
            item={{
              color: itemColor,
              title: itemName,
              comments: itemDescription,
              _id: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              userId: '',
            }}
          />
        </View>
        <ColorPicker value={itemColor} onComplete={onSelectColor}>
          <Panel4 />
          <Swatches swatchStyle={styles.swatch} colors={w3c12BasicColors} />
        </ColorPicker>
        <View>
          <Text style={styles.helperText}>Enter title</Text>
          <Input
            placeholder={'title'}
            value={itemName}
            onChangeText={setItemName}
            extraStyles={{ backgroundColor: itemColor }}
            textInputExtraStyles={{ color: contrastTextColor }}
          />
        </View>
        <View>
          <Text style={styles.helperText}>Enter description</Text>
          <Input
            placeholder={'description'}
            value={itemDescription}
            onChangeText={setItemDescription}
            extraStyles={{ backgroundColor: itemColor }}
            textInputExtraStyles={{ color: contrastTextColor }}
          />
        </View>
        <Button
          onPress={handleCreateItem}
          isDisabled={isCreatingDisabled || !itemName.length}
          extraStyles={styles.createButton}
        >
          Create
        </Button>
      </View>
    </Modal>
  );
};

export default AddNewItemModal;

const styles = StyleSheet.create({
  exampleContainer: {
    flex: 1,
    maxHeight: 63,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    padding: 10,
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
  helperText: {
    color: colors.black100,
    fontSize: 12,
    fontFamily: 'interBold',
    marginHorizontal: 10,
  },
  swatch: {
    width: 30,
    height: 30,
    borderRadius: 5,
    margin: 5,
  },
  createButton: {
    marginTop: 30,
    width: '100%',
  },
});

const w3c12BasicColors = [
  '#800000',
  '#FF0000',
  '#800080',
  '#FF00FF',
  '#008000',
  '#00FF00',
  '#808000',
  '#FFFF00',
  '#000080',
  '#0000FF',
  '#008080',
  '#00FFFF',
];
