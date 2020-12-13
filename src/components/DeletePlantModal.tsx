import React from 'react';
import {Dialog, Button, Text, Portal, Colors} from 'react-native-paper';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

interface Props {
  displayModal: boolean;
  onPress: () => void;
  onExit: () => void;
}
export default function DeletePlantModal(props: Props) {
  const {displayModal, onExit, onPress} = props;
  const deletedPlant = useSelector((state: RootState) => state.plantgroup.deletedPlant);

  return (
    <Portal>
        <Dialog dismissable={false} visible={displayModal}>
          <Dialog.Title>Wait!</Dialog.Title>
          <Dialog.Content>
            <Text>You will lose this plant's settings and calendar entries. {'\n'}</Text>
            <Text style={{fontWeight: 'bold'}}>Are you sure you want to delete your plant?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={Colors.grey400} onPress={onExit} disabled={deletedPlant}>
              Cancel
            </Button>
            <Button color={Colors.red400} onPress={onPress} disabled={deletedPlant}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
    </Portal>
  );
}
