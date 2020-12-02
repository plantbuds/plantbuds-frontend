import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";
import { storeExpoToken, getExpoToken } from "../utils/AsyncStorage";

export async function registerForPushNotificationsAsync() {
  let token;
  try {

    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user

    // Stop here if the user did not grant permissions
    if (status !== "granted") {
      alert("Please enable notifications in settings");
      return;
    }
    
    const value = await getExpoToken();

    if (value === null) {
    
      // Get the token that identifies this device
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(status, token);
    
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    storeExpoToken(token);
  }
    
  } catch (error) {
    console.error(error);
  }
}
