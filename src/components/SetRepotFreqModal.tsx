import React from 'react';
import {View, StyleSheet, Text, Modal, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

interface Props {
  displayModal: boolean;
  onExit: () => void;
  textRepFreq: string;
  setTextRepFreq: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: (val: boolean) => void;
}

// TODO make sure frontend can store date started for reminders
// if user chooses only once, let user choose what time notif will occur that day 
// use the history arrays stored in the backend to keep track of the dates
// if user clears reminders clear the history array for that particualr reminder 
// ISSUE TO ADDRESS: adding days that cause day date to go past 30/31. Make sure
//                   it rolls over to a new month 
// UI should be ready to go for demo though. Just need to adjust the plant profile UI. 

export default function SetRepotFreqModal(props: Props) {
  const {displayModal, onExit, textRepFreq, setTextRepFreq, setShowModal} = props;
  const [modalText, setModalText] = useState(textRepFreq);

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Button onPress={onExit}>Cancel</Button>
            <Button
              onPress={() => {
                setTextRepFreq(modalText);
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
              onValueChange={(itemValue: string) => setModalText(itemValue)}
            >
              <Picker.Item label="1 Day" value="1" />
              <Picker.Item label="2 Days" value="2" />
              <Picker.Item label="3 Days" value="3" />
              <Picker.Item label="4 Days" value="4" />
              <Picker.Item label="5 Days" value="5" />
              <Picker.Item label="10 Days" value="10" />
              <Picker.Item label="15 Days" value="15" />
              <Picker.Item label="20 Days" value="20" />
              <Picker.Item label="25 Days" value="25" />
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
