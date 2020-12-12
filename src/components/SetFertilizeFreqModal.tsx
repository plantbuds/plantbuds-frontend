import React from 'react';
import {View, StyleSheet, Text, Modal, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useState} from 'react';
import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

interface Props {
  displayModal: boolean;
  onExit: () => void;
  fertFreq: number;
  setFertFreq: React.Dispatch<React.SetStateAction<number>>;
  setShowModal: (val: boolean) => void;
}

export default function SetFertilizeFreqModal(props: Props) {
  const {displayModal, onExit, setFertFreq, setShowModal} = props;
  const fertilize_frequency = useSelector(
    (state: RootState) => state.plantgroup.fertilize_frequency
  );
  const [modalText, setModalText] = useState(fertilize_frequency);
  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Button onPress={onExit}>Cancel</Button>
            <Button
              onPress={() => {
                setFertFreq(modalText);
                setShowModal(false);
              }}
            >
              Done
            </Button>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
            <Picker
              selectedValue={modalText}
              style={{height: 40, width: 150, bottom: 50}}
              onValueChange={(itemValue: number) => setModalText(itemValue)}
            >
              <Picker.Item label="Only once" value={0} />
              <Picker.Item label="Daily" value={1} />
              <Picker.Item label="Weekly" value={7} />
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
    height: windowHeight * 0.45,
    width: windowWidth * 0.95,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',

    //temporary
    borderWidth: 1,
    borderStyle: 'solid',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
