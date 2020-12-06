import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {Platform} from 'react-native';
import {storeExpoToken, getExpoToken} from '../utils/AsyncStorage';

export async function registerForPushNotificationsAsync() {
  let token;
  try {
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      alert("Please enable notifications in your iPhone's Settings");
      return;
    }

    // Check if user has stored the expo push token already in Async Storage
    const value = await getExpoToken();
    console.log("Async Storage's expo token value = : " + value);

    if (value === null) {
      // Get the token that identifies this device
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(status);
      console.log(token);

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      storeExpoToken(token);
    }
  } catch (error) {
    console.error(error);
  }
}
