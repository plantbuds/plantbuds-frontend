import React from 'react';
import {View, StyleSheet, Text, Modal, Dimensions, Image} from 'react-native';
import {Button} from 'react-native-paper';

interface Props {
  displayModal: boolean;
  onPress: () => void;
  onExit: () => void;
}
export default function DeletePlantModal(props: Props) {
  const {displayModal, onExit, onPress} = props;

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.textView}>
            <Text style={styles.textReminder}>Wait!</Text>
            <Text style={styles.textSend}>Are you sure you want to delete your plant?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={onPress}>Yes</Button>
            <Button onPress={onExit}>No</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 8,
    elevation: 5,
  },
  textView: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  textReminder: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  textSend: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
