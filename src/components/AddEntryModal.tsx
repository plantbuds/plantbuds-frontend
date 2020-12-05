import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import {
  Button,
  ToggleButton,
  Title,
  Checkbox,
  Switch,
  IconButton,
  Colors
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { setEditedEntry } from "../../store/plantgroup/actions";

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
  const dispatch = useDispatch();

  const getDate = () => {
    const arr = new Date(selectedDate).toUTCString().split(" ");
    return arr[0] + " " + arr[1] + " " + arr[2] + " " + arr[3];
  };

  useEffect(() => {
    let arr = entries[selectedDate];
    if (arr) {
      setWaterStatus(entries[selectedDate][0]);
      setRepotStatus(entries[selectedDate][1]);
      setFertilizeStatus(entries[selectedDate][2]);
    } else {
      setWaterStatus(false);
      setFertilizeStatus(false);
      setRepotStatus(false);
    }
  }, [displayModal]);
  // TODO: need to reset button status after saving

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <Button color={Colors.grey400} onPress={onExit}>
            Cancel
          </Button>
          <Title style={{ color: Colors.grey500, textAlign: "center" }}>
            Did you water, repot, or fertilize {"\n"} on {getDate()}?
          </Title>
          <Text style={{ color: Colors.grey500, textAlign: "center" }}>
            Tap to edit.
          </Text>
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              justifyContent: "center"
            }}
          >
            <IconButton
              icon={require("../../assets/water.png")}
              color={Colors.blue300}
              size={75}
              onPress={() => setWaterStatus(!waterStatus)}
              style={
                waterStatus
                  ? {
                      borderColor: Colors.blue300,
                      borderWidth: 2
                    }
                  : {}
              }
            />
            <IconButton
              icon={require("../../assets/repot.png")}
              color={Colors.brown300}
              size={75}
              onPress={() => setRepotStatus(!repotStatus)}
              style={
                repotStatus
                  ? {
                      borderColor: Colors.brown300,
                      borderWidth: 2
                    }
                  : {}
              }
            />
            <IconButton
              icon={require("../../assets/fertilize.png")}
              color={Colors.lightGreen300}
              size={75}
              onPress={() => setFertilizeStatus(!fertilizeStatus)}
              style={
                fertilizeStatus
                  ? {
                      borderColor: Colors.lightGreen300,
                      borderWidth: 2
                    }
                  : {}
              }
            />
          </View>
          <Button
            mode="contained"
            color={Colors.green400}
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
              dispatch(setEditedEntry(true));
              onExit();
            }}
            style={styles.roundToggle}
          >
            <Text style={{ color: Colors.white }}>Save</Text>
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
    height: windowHeight * 0.55,
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
    margin: 30,
    color: Colors.white
  }
});
