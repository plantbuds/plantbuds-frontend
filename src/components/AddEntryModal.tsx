import React from "react";
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  displayModal: boolean;
  onPress: () => void;
  onExit: () => void;
}

export default function AddEntryModal(props: Props) {
  const { displayModal, onExit } = props;

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <Button onPress={onExit}>Done</Button>
          <Text>Add Entry Modal!</Text>
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
  }
});
