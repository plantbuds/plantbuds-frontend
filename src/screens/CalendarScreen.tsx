import React, {useEffect, useState} from 'react';
import {Dimensions, Modal, Platform, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import {Calendar as ReactCalendar} from 'react-native-calendars';
import {Button, ToggleButton, Title, Checkbox, Switch} from 'react-native-paper';
import {IconButton, Colors} from 'react-native-paper';
import AddEntryModal from '../components/AddEntryModal';

// declare types for your props here
interface Props {
  navigation: any;
}

var entries = {
  '2020-11-21': [false, false, true],
  '2020-11-23': [true, false, false],
  '2020-11-10': [true, false, false],
  '2020-11-02': [true, false, true],
  '2020-11-03': [true, true, false],
};
export default function CalendarScreen(props: Props) {
  const {navigation} = props;
  const [displayAddEntryModal, setDisplayAddEntryModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [displayEditEntryModal, setDisplayEditEntryModal] = useState(false);
  const [waterStatus, setWaterStatus] = useState(false);
  const [repotStatus, setRepotStatus] = useState(false);
  const [fertilizeStatus, setFertilizeStatus] = useState(false);
  const [markings, setMarkings] = useState({});
  const waterDot = {key: 'water', color: 'blue'};
  const repotDot = {key: 'repot', color: 'brown'};
  const fertilizeDot = {key: 'fertilize', color: 'green'};

  const getDate = () => {
    const arr = new Date(selectedDate).toUTCString().split(' ');
    return arr[0] + ' ' + arr[1] + ' ' + arr[2] + ' ' + arr[3];
  };

  const updateCalendarMarkings = () => {
    var newMarkings = {};
    var selected = false;
    for (const [date, value] of Object.entries(entries)) {
      var dotData = [];
      var entry = {};
      if (value[0]) dotData.push(waterDot);
      if (value[1]) dotData.push(repotDot);
      if (value[2]) dotData.push(fertilizeDot);
      entry['dots'] = dotData;
      if (date === selectedDate) {
        entry['selected'] = true;
        selected = true;
      }
      newMarkings[date] = entry;
    }
    if (!selected) {
      newMarkings[selectedDate] = {selected: true};
    }
    setMarkings(newMarkings);
  };

  useEffect(() => {
    updateCalendarMarkings();
  }, [selectedDate, displayAddEntryModal]);

  return (
    <View style={styles.container}>
      <ReactCalendar
        onDayPress={day => {
          setSelectedDate(day.dateString);
          if (entries[selectedDate] != null) {
            setWaterStatus(entries[selectedDate][0]);
            setRepotStatus(entries[selectedDate][1]);
            setFertilizeStatus(entries[selectedDate][2]);
          } else {
            setWaterStatus(false);
            setRepotStatus(false);
            setFertilizeStatus(false);
          }
          updateCalendarMarkings();
        }}
        markedDates={markings}
        maxDate={new Date()}
        markingType={'multi-dot'}
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
      <Button onPress={() => setDisplayAddEntryModal(true)}>Add Entry for reminder</Button>
      <AddEntryModal
        selectedDate={selectedDate}
        displayModal={displayAddEntryModal}
        onPress={() => {
          setDisplayAddEntryModal(false);
        }}
        onExit={() => setDisplayAddEntryModal(false)}
        entries={entries}
        updateCalendarMarkings={() => updateCalendarMarkings}
      />
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  roundToggle: {
    borderRadius: 40,
    borderWidth: 2,
    padding: 4,
    margin: 30,
  },
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  modalView: {
    height: windowHeight * 0.35,
    width: windowWidth,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',

    //temporary
    borderWidth: 1,
    shadowColor: '#000',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    width: '90%',
  },
});
