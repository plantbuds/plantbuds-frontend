import React, { useEffect } from "react";
import { StyleSheet, Text, View, Vibration } from "react-native";
import { Notifications } from "expo";
import { registerForPushNotificationsAsync } from "../utils/Notifications";

interface Props {
  navigation: any;
}

export default function LandingScreen(props: Props) {
  const { navigation } = props;

  useEffect(() => {
    // Get the expo token that identifies this device for notifs
    registerForPushNotificationsAsync();

    // Vibrate when receiving incoming notifications
    Notifications.addListener(notif => {
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
