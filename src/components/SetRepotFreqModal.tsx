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
  repFreq: number;
  setRepFreq: React.Dispatch<React.SetStateAction<number>>;
  setShowModal: (val: boolean) => void;
}

export default function SetRepotFreqModal(props: Props) {
  const {displayModal, onExit, repFreq, setRepFreq, setShowModal} = props;
  const repot_frequency = useSelector((state: RootState) => state.plantgroup.water_frequency);
  const [modalText, setModalText] = useState(repot_frequency);

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Button onPress={onExit}>Cancel</Button>
            <Button
              onPress={() => {
                setRepFreq(modalText);
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
              <Picker.Item label="1 Day" value={1} />
              <Picker.Item label="2 Days" value={2} />
              <Picker.Item label="3 Days" value={3} />
              <Picker.Item label="4 Days" value={4} />
              <Picker.Item label="5 Days" value={5} />
              <Picker.Item label="6 Days" value={6} />
              <Picker.Item label="7 Days" value={7} />
              <Picker.Item label="8 Days" value={8} />
              <Picker.Item label="9 Days" value={9} />
              <Picker.Item label="10 Days" value={10} />
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
