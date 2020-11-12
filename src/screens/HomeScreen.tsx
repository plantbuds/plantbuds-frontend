import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/Notifications";
import { removeAllNotificationListeners } from "expo-notifications";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { Button, StyleSheet, Text, View, Vibration } from "react-native";

// declare types for your props here
interface Props {
  navigation: any;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export default function HomeScreen(props: Props) {
  useEffect(() => {
    // Get the expo token that identifies this device for notifs
    registerForPushNotificationsAsync();

    // Vibrate when receiving incoming notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(
      notif => {
        Vibration.vibrate();
        console.log(notif);
      }
    );
  }, []);

  const { navigation } = props;
  const notificationListener = useRef(null);

  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button title="Sidebar" onPress={() => navigation.openDrawer()} />
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
