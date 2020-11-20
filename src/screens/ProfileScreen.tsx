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
      <View style = {styles.button}>
        <Button title = "Edit" onPress={() => navigation.openDrawer()} />
      </View>

      <View style ={{flexDirection: 'row'}}>
        <View style = {{flexDirection: 'column'}}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: 'https://media1.fdncms.com/illinoistimes/imager/u/original/11623518/news01.jpg',
            }}
          />
        </View>
        <View style = {{flexDirection: 'column'}}>
          <Text>Name</Text>
          <Text>USDA Zone</Text>
        </View>
      </View>

      <Text> Notifications </Text>
      <View style={{flexDirection:'column'}}>
        <Text>Watering Reminder</Text>
        <Text>Repotting Reminder</Text>
        <Text>Fertilizing Reminder</Text>
      </View>

      <Text>Settings</Text>
      <Text>Notification Delivery</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6d3f0",
  },

  button : {
    alignItems: "flex-end",
    backgroundColor: 'lightblue', 
    borderRadius: 1
  }, 

  profilePicture : {
    flexDirection: 'column',
    borderColor: 'black',
    width: 150,
    height: 150,
    borderRadius: 100
  },

  notifications: {
    alignItems: "center",
    justifyContent: "center"
  }

});
