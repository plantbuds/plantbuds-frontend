import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Vibration } from "react-native";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/Notifications";
import { removeAllNotificationListeners } from "expo-notifications";

interface Props {
  navigation: any;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false, 
    shouldSetBadge: false, 
  }),
});

export default function LandingScreen(props: Props) {
  const { navigation } = props;
  const notificationListener = useRef(null);

  useEffect(() => {
    // Get the expo token that identifies this device for notifs
    registerForPushNotificationsAsync();

    // Vibrate when receiving incoming notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(notif => {
      Vibration.vibrate();
      console.log(notif);
    });

  }, []);

  return (
    <View style={styles.container}>
      <Text>Landing page for PlantBuds</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
