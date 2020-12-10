import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard, Dimensions} from 'react-native';
import * as Notifications from 'expo-notifications';
import {storeWaterNotifID} from '../utils/AsyncStorage';
import {Button, Subheading, IconButton} from 'react-native-paper';
import SetNotifTimeModal from '../components/SetNotifTimeModal';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

// declare types for your props here
interface Props {
  navigation: any;
}

export default function TestScreen(props: Props) {
  const {navigation} = props;
  const [show, setShow] = useState(false);
  const notif_time = useSelector((state: RootState) => state.session.notif_time);

  const onSubmit = async () => {
    Keyboard.dismiss();

    // cool math stuff
    const currentTime = new Date().getTime();

    const notifTime = new Date(notif_time).getTime();

    const delta = notifTime - currentTime;

    console.log(delta);

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'test notification',
        body: 'this is a test notification',
      },
      trigger: delta,
    });
    const response = await Notifications.getAllScheduledNotificationsAsync();
    console.log(response);
    //storeWaterNotifID(response);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Subheading style={styles.optionsStyle}>Notification Time</Subheading>
        <Text>{notif_time ? new Date(notif_time).toLocaleTimeString() : 'N/A'}</Text>
        <IconButton icon="pencil" onPress={showTimepicker} />
      </View>
      <Button onPress={onSubmit}>Test Delta</Button>
      <SetNotifTimeModal displayModal={show} setShow={setShow} />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderStyle: "solid",
    width: windowWidth * 0.85,
    height: windowHeight * 0.047,
  },
  optionsStyle: {
    marginLeft: 30,
    lineHeight: 30,
  },
});
