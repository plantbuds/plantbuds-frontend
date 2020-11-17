import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/Notifications";
import { removeAllNotificationListeners } from "expo-notifications";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { Button, StyleSheet, Text, View, Vibration, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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

      <View style={styles.searchBar}>
        <TextInput 
          //clearTextOnFocus = true
          defaultValue = "Search my plants"
        />
      </View>
    
      <View style={styles.fixToText}>
        <Button title="Sort" disabled onPress={() => navigation.openDrawer()}/>
        <Button title="Filter" disabled onPress={() => navigation.openDrawer()}/>
      </View>

      <Image
        style={styles.plantPicture}
        source={{
          uri: 'https://media1.fdncms.com/illinoistimes/imager/u/original/11623518/news01.jpg',
        }}
      />

      <Image
        style={styles.plantPicture}
        source={{
          uri: 'https://cse.ucsd.edu/sites/cse.ucsd.edu/files/faculty/gillespie17M-115x150.jpg',
        }}
      />
      
      <Button title="Sidebar" onPress={() => navigation.openDrawer()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    //justifyContent: "center"
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchBar: {
    borderColor: 'grey', 
    borderWidth: 2, 
  },

  plantPicture: {
    flexDirection: 'row',
<<<<<<< HEAD
    padding: 10,
=======
    padding: '10',
>>>>>>> bd46f3d (skeleton of the skeleton for homepage)
    borderColor: 'black',
    width: 143,
    height: 170,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> bd46f3d (skeleton of the skeleton for homepage)
