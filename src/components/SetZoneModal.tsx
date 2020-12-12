import React from 'react';
import {View, StyleSheet, Text, Modal, Dimensions} from 'react-native';
import {Button, Colors} from 'react-native-paper';
import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

interface Props {
  displayModal: boolean;
  onExit: () => void;
  textZone: string;
  setTextZone: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: (val: boolean) => void;
}

export default function SetZoneModal(props: Props) {
  const {displayModal, onExit, textZone, setTextZone, setShowModal} = props;
  const [modalZone, setModalZone] = useState(textZone);
  const USDAZone = useSelector((state: RootState) => state.session.USDA_zone);
  const onClose = () => {
    setModalZone(USDAZone);
    onExit();
  };
  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Button color={Colors.grey400} onPress={onClose}>
              Cancel
            </Button>
            <Button
              color={Colors.lightGreen900}
              onPress={() => {
                setTextZone(modalZone);
                setShowModal(false);
              }}
            >
              Done
            </Button>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
            <Picker
              selectedValue={modalZone}
              style={{height: 40, width: 150, bottom: 50}}
              onValueChange={(itemValue: string) => setModalZone(itemValue)}
            >
              <Picker.Item label="USDA Zone 1" value="1" />
              <Picker.Item label="USDA Zone 2" value="2" />
              <Picker.Item label="USDA Zone 3" value="3" />
              <Picker.Item label="USDA Zone 4" value="4" />
              <Picker.Item label="USDA Zone 5" value="5" />
              <Picker.Item label="USDA Zone 6" value="6" />
              <Picker.Item label="USDA Zone 7" value="7" />
              <Picker.Item label="USDA Zone 8" value="8" />
              <Picker.Item label="USDA Zone 9" value="9" />
              <Picker.Item label="USDA Zone 10" value="10" />
              <Picker.Item label="USDA Zone 11" value="11" />
              <Picker.Item label="USDA Zone 12" value="12" />
              <Picker.Item label="USDA Zone 13" value="13" />
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  // Specify the modal to appear from the bottom (dont change)
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
  },

  // Specify the height, width, etc of the modal
  modalView: {
    height: windowHeight * 0.4,
    width: windowWidth,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',

    //temporary
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.grey300,
  },

  doneButton: {
    borderRadius: 40,
    borderWidth: 2,
    padding: 4,
    margin: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
