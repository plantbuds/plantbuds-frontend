import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import * as Notifications from 'expo-notifications';
import {Button} from 'react-native-paper';

// declare types for your props here
interface Props {
  navigation: any;
}

export default function TestScreen(props: Props) {
  const {navigation} = props;

  const onSubmit = async (e: any) => {
    Keyboard.dismiss();

    const trigger = (new Date().getTime() + Number(e.nativeEvent.text));

    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleNotificationAsync({
      content: {
        title: "test notification", 
        body: "this is a test notification",
      }, trigger,
      });
    const response = await Notifications.getAllScheduledNotificationsAsync()
    console.log(response);
  };

  return (
    <View style={styles.container}>
      <TextInput onSubmitEditing={onSubmit} placeholder={'time in ms'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  innerButton: {
    padding: 10,
  },
  button: {
    borderRadius: 50,
  },
});
