import React from 'react';
import * as Notifications from 'expo-notifications';
import {View, StyleSheet, Text, Modal, Dimensions} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import {Calendar as ReactCalendar} from 'react-native-calendars';
import {useState} from 'react';
import SetWaterFreqModal from './SetWaterFreqModal';

interface Props {
  displayModal: boolean;
  onExit: () => void;
}

// TODO make sure frontend can store date started for reminders
// if user chooses only once, let user choose what time notif will occur that day 
// use the history arrays stored in the backend to keep track of the dates
// if user clears reminders clear the history array for that particualr reminder 
// ISSUE TO ADDRESS: adding days that cause day date to go past 30/31. Make sure
//                   it rolls over to a new month 
// UI should be ready to go for demo though. Just need to adjust the plant profile UI. 

export default function SetWaterReminderModal(props: Props) {
  const {displayModal, onExit} = props;

  const [selectedDate, setSelectedDate] = useState('');
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [textWatFreq, setTextWatFreq] = useState('0');
  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <Button onPress={onExit}>Cancel</Button>
          <Text>Set Water Reminder Start Date</Text>
          <ReactCalendar
            onDayPress={day => setSelectedDate(day.dateString)}
            current={new Date().toISOString().split('T')[0]}
            minDate={new Date()}
            markedDates={{
              [selectedDate]: {selected: true, marked: false, selectedColor: '#00adf5'},
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayTextColor: 'black',
              todayTextColor: '#00adf5',
              dayTextColor: 'black',
              textDisabledColor: '#979797',
            }}
          />
          <View style={styles.frequencyContainer}>
            <Text>Frequency:</Text>
            <Button
              icon={showWaterModal ? 'chevron-up' : 'chevron-down'}
              mode="contained"
              contentStyle={styles.contentStyle}
              labelStyle={styles.labelStyle}
              style={styles.freqButton}
              onPress={() => setShowWaterModal(true)}
            >
              {textWatFreq === '0'
                ? 'Only once'
                : textWatFreq === '1'
                ? 'Every day'
                : 'Every ' + textWatFreq + ' days'}
            </Button>
            <SetWaterFreqModal
              displayModal={showWaterModal}
              textWatFreq={textWatFreq}
              setTextWatFreq={setTextWatFreq}
              setShowModal={setShowWaterModal}
              onExit={() => setShowWaterModal(false)}
            />
          </View>
          <Button
            mode="contained"
            color={Colors.green400}
            onPress={() => {
              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Time to water!",
                  body: 'Your plant needs to be watered!',
                },
                trigger: {
                  seconds: 5,
                },
              });
              onExit();
            }}
            style={styles.roundToggle}
          >
            <Text style={{color: Colors.white}}>Save</Text>
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
  frequencyContainer: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    alignItems: 'center',
    left: windowWidth * 0.11,
    width: windowWidth * 0.56,
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
    margin: 30,
    color: Colors.white,
  },
});
