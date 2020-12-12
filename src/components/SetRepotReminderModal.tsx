import React from 'react';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import {View, StyleSheet, Text, Modal, Dimensions, Alert} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import {Calendar as ReactCalendar} from 'react-native-calendars';
import {useState} from 'react';
import {RootState} from '../../store/store';
import {useSelector, useDispatch} from 'react-redux';
import SetRepotFreqModal from './SetRepotFreqModal';
import {updateRepotNotif} from '../../store/plantgroup/actions';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  displayModal: boolean;
  onExit: () => void;
}

export default function SetRepotReminderModal(props: Props) {
  const {displayModal, onExit} = props;

  function setStartDateString() {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
    return localISOTime.split('T')[0];
  }

  const repot_history = useSelector((state: RootState) => state.plantgroup.repot_history);
  const repot_frequency = useSelector((state: RootState) => state.plantgroup.repot_frequency);
  const repot_next_notif = useSelector((state: RootState) => state.plantgroup.repot_next_notif);
  const receive_repot_notif = useSelector((state: RootState) => state.session.receive_repot_notif);
  const repot_notif_id = useSelector((state: RootState) => state.plantgroup.repot_notif_id);
  const [selectedDate, setSelectedDate] = useState(
    repot_history && repot_history.length > 0 ? repot_history[0] : setStartDateString()
  );
  const [selectedTime, setSelectedTime] = useState(
    repot_next_notif ? new Date(repot_next_notif) : new Date(moment().add(5, "minutes").format())
  );
  const [showRepotModal, setShowRepotModal] = useState(false);
  const [repFreq, setRepFreq] = useState(repot_frequency ? repot_frequency : 0);
  const plant_id = useSelector((state: RootState) => state.plantgroup.plant_id);
  const plant_name = useSelector((state: RootState) => state.plantgroup.plant_name);
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
    // setup new repot history array
    let repotArray = [];
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
    if (repFreq === 1 || repFreq === 7) {
      for (let i = 0; i < 5; i++) {
        repotArray.push(addDays(date, repFreq * i));
      }
    } else {
      repotArray.push(addDays(date, 0));
    }

    console.log(repotArray);
    // schedule notification based on frequency
    switch (repFreq) {
      case 0: {
        console.log('case 0');
        const repotID = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to repot!',
            sound:  'default',
            body: `Your ${plant_name ? plant_name : "plant"} needs repotting`,
          },
          trigger: {
            date: date,
          },
        });

        // update backend with repot notification array
        dispatch(updateRepotNotif(repotArray, repFreq, date, repotID, plant_id));
        onExit();
        return;
      }
      case 1: {
        console.log('case 1');
        const repotID = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to repot!',
            sound:  'default',
            body: `Your ${plant_name ? plant_name : "plant"} needs repotting`,
          },
          trigger: {
            hour: selectedTime.getHours(),
            minute: selectedTime.getMinutes(),
          },
        });

        dispatch(updateRepotNotif(repotArray, repFreq, date, repotID, plant_id));
        onExit();
        return;
      }
      case 7: {
        console.log('case 7');
        const repotID = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to repot!',
            sound:  'default',
            body: `Your ${plant_name ? plant_name : "plant"} needs repotting`,
          },
          trigger: {
            weekday: moment().day(),
          },
        });

        dispatch(updateRepotNotif(repotArray, repFreq, date, repotID, plant_id));
        onExit();
        return;
      }
      default: {
        onExit();
      }
    }
  };

  const clearNotif = async () => {
    if (repot_notif_id) {
      console.log('clearing repot id');
      await Notifications.cancelScheduledNotificationAsync(repot_notif_id);
    }
    console.log('clearing notif history');
    dispatch(updateRepotNotif([], 0, null, null, plant_id));
  };

  const onSubmitSave = async () => {
    await clearNotif();

    if (!receive_repot_notif) {
      Alert.alert('Wait!', 'Please turn on repot notifications for this reminder to go through', [
        {text: 'OK', onPress: onExit},
      ]);
    } else {
      console.log('repFreq value' + repFreq.toString());
      await pushNotif();
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
          <Text style={styles.reminderTitle}>Set Repot Reminder</Text>
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
              icon={showRepotModal ? 'chevron-up' : 'chevron-down'}
              mode="contained"
              contentStyle={styles.contentStyle}
              labelStyle={styles.labelStyle}
              style={styles.freqButton}
              onPress={() => setShowRepotModal(true)}
            >
              {!repFreq || repFreq === 0
                ? 'Only once'
                : repFreq === 1
                ? 'Every day'
                : 'Every ' + repFreq.toString() + ' days'}
            </Button>
            <SetRepotFreqModal
              displayModal={showRepotModal}
              repFreq={repFreq}
              setRepFreq={setRepFreq}
              setShowModal={setShowRepotModal}
              onExit={() => setShowRepotModal(false)}
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
