import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import * as Calendar from "expo-calendar";
import { Calendar as ReactCalendar } from "react-native-calendars";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function CalendarScreen(props: Props) {
  const { navigation } = props;
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      await Calendar.requestRemindersPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync();
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ReactCalendar
       onDayPress={(day) => setSelectedDate(day.dateString)}
       current={new Date().toISOString().split('T')[0]}
       markedDates={{[selectedDate]: {selected: true, marked: false, selectedColor: '#00adf5'}}}
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
      <Text>{selectedDate}</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );

  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(
      each => each.source.name === "Default"
    );
    return defaultCalendars[0].source;
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Expo Calendar",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
