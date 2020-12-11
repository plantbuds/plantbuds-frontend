import React from 'react';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import {View, StyleSheet, Text, Modal, Dimensions, Alert} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import {Calendar as ReactCalendar} from 'react-native-calendars';
import {useState} from 'react';
import {RootState} from '../../store/store';
import {useSelector, useDispatch} from 'react-redux';
import SetFertilizeFreqModal from './SetFertilizeFreqModal';
import {updateFertilizeNotif} from '../../store/plantgroup/actions';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  displayModal: boolean;
  onExit: () => void;
}

export default function SetFertilizeReminderModal(props: Props) {
  const {displayModal, onExit} = props;

  function setStartDateString() {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
    return localISOTime.split('T')[0];
  }

  const fertilize_history = useSelector((state: RootState) => state.plantgroup.fertilize_history);
  const fertilize_frequency = useSelector(
    (state: RootState) => state.plantgroup.fertilize_frequency
  );
  const fertilize_next_notif = useSelector(
    (state: RootState) => state.plantgroup.fertilize_next_notif
  );
  const receive_fertilize_notif = useSelector(
    (state: RootState) => state.session.receive_fertilizing_notif
  );
  const fertilize_notif_id = useSelector((state: RootState) => state.plantgroup.fertilize_notif_id);
  const [selectedDate, setSelectedDate] = useState(
    fertilize_history && fertilize_history.length > 0 ? fertilize_history[0] : setStartDateString()
  );
  const [selectedTime, setSelectedTime] = useState(
    fertilize_next_notif ? new Date(fertilize_next_notif) : new Date(Date.now())
  );
  const [showFertilizeModal, setShowFertilizeModal] = useState(false);
  const [fertFreq, setFertFreq] = useState(fertilize_frequency ? fertilize_frequency : 0);
  const plant_id = useSelector((state: RootState) => state.plantgroup.plant_id);
  const dispatch = useDispatch();

  function addDays(date: Date, days: number) {
    return moment()
      .set({
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
      })
      .add(days, 'days')
      .format('YYYY-MM-DD');
  }

  const onTimeChange = (event, selectedDateTime: Date) => {
    const currentDateTime = selectedDateTime || selectedTime;
    console.log('onTimeChange' + currentDateTime);
    setSelectedTime(currentDateTime);
  };

  const pushNotif = async () => {
    // setup new fertilize history array
    let fertilizeArray = [];
    const selectedDateObj = new Date(selectedDate + 'T00:00:00');

    // check to see if delta between reminder date and current date is negative
    let date = new Date(
      moment()
        .set({
          date: selectedDateObj.getDate(),
          month: selectedDateObj.getMonth(),
          year: selectedDateObj.getFullYear(),
          hour: selectedTime.getHours(),
          minute: selectedTime.getMinutes(),
          seconds: 0,
          millisecond: 0,
        })
        .format()
    );

    const currTime = new Date(Date.now()).getTime();
    const reminderTime = date.getTime();
    const delta = reminderTime - currTime;

    // set reminder to the next day if delta is negative
    if (delta <= 0) {
      date = new Date(
        moment()
          .set({
            date: selectedDateObj.getDate(),
            month: selectedDateObj.getMonth(),
            year: selectedDateObj.getFullYear(),
            hour: selectedTime.getHours(),
            minute: selectedTime.getMinutes(),
          })
          .add(1, 'days')
          .format()
      );
    }

    // initialize push notification history array for every day and every week frequencies
    if (fertFreq === 1 || fertFreq === 7) {
      for (let i = 0; i < 5; i++) {
        fertilizeArray.push(addDays(date, fertFreq * i));
      }
    } else {
      fertilizeArray.push(addDays(date, 0));
    }

    console.log(fertilizeArray);
    // schedule notification based on frequency
    switch (fertFreq) {
      case 0: {
        console.log('case 0');
        const fertilizeID = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to fertilize!',
            body: 'Your plant needs fertilizing',
          },
          trigger: {
            date: date,
          },
        });

        // update backend with fertilize notification array
        dispatch(updateFertilizeNotif(fertilizeArray, fertFreq, date, fertilizeID, plant_id));
        onExit();
        return;
      }
      case 1: {
        const fertilizeID = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to fertilize!',
            body: 'Your plant needs fertilizing',
          },
          trigger: {
            hour: selectedTime.getHours(),
            minute: selectedTime.getMinutes(),
          },
        });

        dispatch(updateFertilizeNotif(fertilizeArray, fertFreq, date, fertilizeID, plant_id));
        onExit();
        return;
      }
      case 7: {
        const fertilizeID = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to fertilize!',
            body: 'Your plant needs fertilizing',
          },
          trigger: {
            weekday: moment().day(),
          },
        });

        dispatch(updateFertilizeNotif(fertilizeArray, fertFreq, date, fertilizeID, plant_id));
        onExit();
        return;
      }
      default: {
        onExit();
      }
    }
  };

  const clearNotif = async () => {
    if (fertilize_notif_id) {
      console.log('clearing fertilize id');
      await Notifications.cancelScheduledNotificationAsync(fertilize_notif_id);
    }
    console.log('clearing notif history');
    dispatch(updateFertilizeNotif([], 0, null, null, plant_id));
  };

  const onSubmitSave = async () => {
    await clearNotif();
    console.log(" receive notif in on submit: " + receive_fertilize_notif)
    if (!receive_fertilize_notif) {
      Alert.alert(
        'Wait!',
        'Please turn on fertilize notifications for this reminder to go through',
        [{text: 'OK', onPress: onExit}]
      );
    } else {
      
      pushNotif();
    }
  };

  const onSubmitClear = async () => {
    await clearNotif();
    onExit();
  };
  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <Button onPress={onExit}>Cancel</Button>
          <Text style={styles.reminderTitle}>Set Fertilize Reminder</Text>
          <ReactCalendar
            enableSwipeMonths={true}
            onDayPress={day => setSelectedDate(day.dateString)}
            current={new Date().toISOString().split('T')[0]}
            minDate={new Date()}
            markedDates={{
              [selectedDate]: {selected: true, marked: false, selectedColor: 'green'},
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayTextColor: 'white',
              todayTextColor: '#00adf5',
              dayTextColor: 'black',
              textDisabledColor: '#979797',
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.reminderText}>Time:</Text>
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              style={{width: windowWidth * 0.24}}
              onChange={onTimeChange}
            />
          </View>
          <View style={styles.frequencyContainer}>
            <Text style={styles.frequencyText}>Frequency:</Text>
            <Button
              icon={showFertilizeModal ? 'chevron-up' : 'chevron-down'}
              mode="contained"
              contentStyle={styles.contentStyle}
              labelStyle={styles.labelStyle}
              style={styles.freqButton}
              onPress={() => setShowFertilizeModal(true)}
            >
              {!fertFreq || fertFreq === 0
                ? 'Only once'
                : fertFreq === 1
                ? 'Every day'
                : 'Every ' + fertFreq.toString() + ' days'}
            </Button>
            <SetFertilizeFreqModal
              displayModal={showFertilizeModal}
              fertFreq={fertFreq}
              setFertFreq={setFertFreq}
              setShowModal={setShowFertilizeModal}
              onExit={() => setShowFertilizeModal(false)}
            />
          </View>
          <Button
            mode="contained"
            color={Colors.green400}
            onPress={onSubmitSave}
            style={styles.roundToggle}
          >
            <Text style={{color: Colors.white}}>Save</Text>
          </Button>
          <Button
            mode="contained"
            color={Colors.red300}
            onPress={onSubmitClear}
            style={styles.roundToggle}
          >
            <Text style={{color: Colors.white}}>Clear Reminder</Text>
          </Button>
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
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 20,
    justifyContent: 'flex-start',
  },
  modalView: {
    width: windowWidth,
    height: windowHeight,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
  },
  reminderTitle: {
    fontSize: 22,
    alignSelf: 'center',
  },
  reminderText: {
    fontSize: 18,
  },
  textContainer: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    alignItems: 'center',
    left: windowWidth * 0.11,
    width: windowWidth * 0.6,
  },
  frequencyText: {
    fontSize: 18,
  },
  frequencyContainer: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    alignItems: 'center',
    left: windowWidth * 0.11,
    width: windowWidth * 0.6,
  },
  freqButton: {
    width: windowWidth * 0.32,
  },
  contentStyle: {
    backgroundColor: Colors.grey300,
    height: windowHeight * 0.04,
  },
  labelStyle: {
    fontSize: 9,
    color: 'black',
  },
  roundToggle: {
    borderRadius: 40,
    borderWidth: 2,
    padding: 4,
    marginHorizontal: 30,
    marginTop: 30,
    color: Colors.white,
  },
});
