import React from 'react';
import {View, StyleSheet, Text, Modal, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import DateTimePicker from '@react-native-community/datetimepicker';
import {editNotifTime} from '../../store/session/actions';
interface Props {
  displayModal: boolean;
  setShow: (val: boolean) => void;
}

export default function SetNotifTimeModal(props: Props) {
  const {displayModal, setShow} = props;
  const notif_time = useSelector((state: RootState) => state.session.notif_time);
  const userID = useSelector((state: RootState) => state.session.userID);
  const [datetime, setDateTime] = useState(notif_time ? new Date(notif_time) : new Date(Date.now()));

  const dispatch = useDispatch();

  const onSubmit = () => {
    console.log(datetime.toISOString());
    dispatch(editNotifTime(datetime.toISOString(), userID));
    setShow(false);
  };

  const onChange = (event, selectedDateTime) => {
    const currentDateTime = selectedDateTime || datetime;
    setDateTime(currentDateTime);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Button onPress={() => setShow(false)}>Cancel</Button>
            <Button onPress={onSubmit}>Done</Button>
          </View>
          <DateTimePicker value={datetime} mode="time" display="default" onChange={onChange} />
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
    width: windowWidth,
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
