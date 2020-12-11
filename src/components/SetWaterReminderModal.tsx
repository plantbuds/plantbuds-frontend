import React from 'react';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import {View, StyleSheet, Text, Modal, Dimensions, Alert} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import {Calendar as ReactCalendar} from 'react-native-calendars';
import {useState} from 'react';
import {RootState} from '../../store/store';
import {useSelector, useDispatch} from 'react-redux';
import SetWaterFreqModal from './SetWaterFreqModal';
import {updateWaterNotif} from '../../store/plantgroup/actions';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  displayModal: boolean;
  onExit: () => void;
}

export default function SetWaterReminderModal(props: Props) {
  const {displayModal, onExit} = props;

  function setStartDateString() {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
    return localISOTime.split('T')[0];
  }

  const water_history = useSelector((state: RootState) => state.plantgroup.water_history);
  const water_frequency = useSelector((state: RootState) => state.plantgroup.water_frequency);
  const water_next_notif = useSelector((state: RootState) => state.plantgroup.water_next_notif);
  const receive_water_notif = useSelector((state: RootState) => state.session.receive_water_notif);
  const water_notif_id = useSelector((state: RootState) => state.plantgroup.water_notif_id);
  const [selectedDate, setSelectedDate] = useState(
    water_history && water_history.length > 0 ? water_history[0] : setStartDateString()
  );
  const [selectedTime, setSelectedTime] = useState(
    water_next_notif ? new Date(water_next_notif) : new Date(Date.now())
  );
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [watFreq, setWatFreq] = useState(water_frequency ? water_frequency : 0);
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
    // setup new water history array
    let waterArray = [];
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
    if (watFreq === 1 || watFreq === 7) {
      for (let i = 0; i < 5; i++) {
        waterArray.push(addDays(date, watFreq * i));
      }
    } else {
      waterArray.push(addDays(date, 0));
    }

    console.log(waterArray);
    // schedule notification based on frequency
    switch (watFreq) {
      case 0: {
        console.log('case 0');
        const waterID = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to water!',
            body: 'Your plant needs watering',
          },
          trigger: {
            date: date,
          },
        });

        // update backend with water notification array
        dispatch(updateWaterNotif(waterArray, watFreq, date, waterID, plant_id));
        onExit();
        return;
      }
      case 1: {
        console.log('case 1');
        const waterID = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to water!',
            body: 'Your plant needs watering',
          },
          trigger: {
            hour: selectedTime.getHours(),
            minute: selectedTime.getMinutes(),
          },
        });

        dispatch(updateWaterNotif(waterArray, watFreq, date, waterID, plant_id));
        onExit();
        return;
      }
      case 7: {
        console.log('case 7');
        const waterID = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to water!',
            body: 'Your plant needs watering',
          },
          trigger: {
            weekday: moment().day(),
          },
        });

        dispatch(updateWaterNotif(waterArray, watFreq, date, waterID, plant_id));
        onExit();
        return;
      }
      default: {
        onExit();
      }
    }
  };

  const clearNotif = async () => {
    if (water_notif_id) {
      console.log('clearing water id');
      Notifications.cancelScheduledNotificationAsync(water_notif_id);
    }
    console.log('clearing notif history');
    dispatch(updateWaterNotif([], 0, null, null, plant_id));
  };

  const onSubmitSave = async () => {
    clearNotif();

    if (!receive_water_notif) {
      Alert.alert('Wait!', 'Please turn on water notifications for this reminder to go through', [
        {text: 'OK', onPress: onExit},
      ]);
    } else {
      console.log('watFreq value' + watFreq.toString());
      pushNotif();
    }
  };

  const onSubmitClear = () => {
    clearNotif();
    onExit();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <Button onPress={onExit}>Cancel</Button>
          <Text style={styles.reminderTitle}>Set Water Reminder</Text>
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

          <View style={styles.textContainer}>
            <Text style={styles.reminderText}>Frequency:</Text>
            <Button
              icon={showWaterModal ? 'chevron-up' : 'chevron-down'}
              mode="contained"
              contentStyle={styles.contentStyle}
              labelStyle={styles.labelStyle}
              style={styles.freqButton}
              onPress={() => setShowWaterModal(true)}
            >
              {!watFreq || watFreq === 0 ? 'Only once' : watFreq === 1 ? 'Every day' : 'Every week'}
            </Button>
            <SetWaterFreqModal
              displayModal={showWaterModal}
              watFreq={watFreq}
              setWatFreq={setWatFreq}
              setShowModal={setShowWaterModal}
              onExit={() => setShowWaterModal(false)}
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
