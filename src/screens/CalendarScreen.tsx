import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import * as Calendar from "expo-calendar";
import { Calendar as ReactCalendar, CalendarList, Agenda } from 'react-native-calendars';

// declare types for your props here
interface Props {
  navigation: any;
}

export default function CalendarScreen(props: Props) {
  const { navigation } = props;
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      await Calendar.requestRemindersPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        
      }}
    >
      <Text>Calendar Module Example</Text>
      <ReactCalendar current={'2020-11-20'} onDayPress={(day) => {console.log('selected day', day)}} />
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
