import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Vibration, Button, Image } from "react-native";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function ProfileScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePicture}
        source={{
          uri: 'https://media1.fdncms.com/illinoistimes/imager/u/original/11623518/news01.jpg',
        }}
      />
      <Text>Profile!</Text>
      <Text>Name</Text>
      <Text>USDA Zone</Text>
      <Text>Notifications</Text>
      <Text>Watering Reminder</Text>
      <Text>Repotting Reminder</Text>
      <Text>Fertilizing Reminder</Text>

      <Text>Settings</Text>
      <Text>Notification Delivery</Text>
      <Button title="Edit" onPress={() => navigation.openDrawer()} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  profilePicture : {
    flexDirection: 'column',
    padding: '10',
    borderColor: 'black',
    width: 150,
    height: 150,
    borderRadius: 100
  },
});
