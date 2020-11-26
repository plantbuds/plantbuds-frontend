import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import SetReminderModal from "../components/SetReminderModal";
import AddEntryModal from "../components/AddEntryModal";

// declare types for your props here
interface Props {
  navigation: any;
  route: any;
  itemName: string;
  itemUri: string;
  //TODO add any other plant information
}

export default function PlantProfileScreen(props: Props) {
  const { navigation, route } = props;
  const { itemName, itemURI } = route.params;
  const [displayAddEntryModal, setDisplayAddEntryModal] = useState(false);
  const [displayReminderModal, setDisplayReminderModal] = useState(false);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("EditPlantProfile")}>
        Edit
      </Button>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column" }}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: itemURI
            }}
          />
          <Text>{itemName}</Text>
          <Button onPress={() => setDisplayReminderModal(true)}>
            Add start date for reminder (calendar + # of days modal)
          </Button>
          <Button onPress={() => setDisplayAddEntryModal(true)}>
            Add Entry for reminder
          </Button>
          <AddEntryModal
            displayModal={displayAddEntryModal}
            onPress={() => {
              setDisplayAddEntryModal(false);
            }}
            onExit={() => setDisplayAddEntryModal(false)}
          />
          <SetReminderModal
            displayModal={displayReminderModal}
            onPress={() => {
              setDisplayReminderModal(false);
            }}
            onExit={() => setDisplayReminderModal(false)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff"
  },
  button: {
    alignItems: "flex-end",
    backgroundColor: "lightblue",
    borderRadius: 1
  },
  profilePicture: {
    flexDirection: "column",
    borderColor: "black",
    width: 150,
    height: 150,
    borderRadius: 100
  }
});
