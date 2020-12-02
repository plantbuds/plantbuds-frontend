import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import {
  Button,
  ToggleButton,
  Title,
  Checkbox,
  Switch
} from "react-native-paper";

interface Props {
  displayModal: boolean;
  onPress: () => void;
  onExit: () => void;
  selectedDate: string;
  entries: any;
  updateCalendarMarkings: () => void;
}

export default function AddEntryModal(props: Props) {
  const {
    displayModal,
    onExit,
    entries,
    updateCalendarMarkings,
    selectedDate
  } = props;
  const [waterStatus, setWaterStatus] = useState(false);
  const [repotStatus, setRepotStatus] = useState(false);
  const [fertilizeStatus, setFertilizeStatus] = useState(false);

  const getDate = () => {
    const arr = new Date(selectedDate).toUTCString().split(" ");
    return arr[0] + " " + arr[1] + " " + arr[2] + " " + arr[3];
  };

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <Button onPress={onExit}>Done</Button>
          <Title style={{ color: "black", textAlign: "center" }}>
            Edit {getDate()}
          </Title>
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              justifyContent: "center"
            }}
          >
            <Switch
              value={waterStatus}
              color="#1CA7EC"
              onValueChange={() => setWaterStatus(!waterStatus)}
            ></Switch>
            <Switch
              value={repotStatus}
              color="#AA6F5D"
              onValueChange={() => setRepotStatus(!repotStatus)}
            ></Switch>
            <Switch
              value={fertilizeStatus}
              color="#31e627"
              onValueChange={() => setFertilizeStatus(!fertilizeStatus)}
            ></Switch>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              if (
                !waterStatus.valueOf() &&
                !repotStatus.valueOf() &&
                !fertilizeStatus.valueOf()
              ) {
                delete entries[selectedDate];
              } else {
                entries[selectedDate] = [
                  waterStatus.valueOf(),
                  repotStatus.valueOf(),
                  fertilizeStatus.valueOf()
                ];
              }
              updateCalendarMarkings();
              onExit();
            }}
            style={styles.roundToggle}
          >
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  // Specify the modal to appear from the bottom (dont change)
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "center"
  },

  // Specify the height, width, etc of the modal
  modalView: {
    height: windowHeight * 0.65,
    width: windowWidth,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",

    //temporary
    borderWidth: 1,
    shadowColor: "#000"
  },
  roundToggle: {
    borderRadius: 40,
    borderWidth: 2,
    padding: 4,
    margin: 30
  }
});
