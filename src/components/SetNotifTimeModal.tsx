import React from "react";
import { View, StyleSheet, Text, Modal, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { editNotifTime } from "../../store/session/actions";
interface Props {
  displayModal: boolean;
  setShow: (val: boolean) => void;
}

export default function SetNotifTimeModal(props: Props) {
  const { displayModal, setShow } = props;
  const notif_time = useSelector(
    (state: RootState) => state.session.notif_time
  );
  const userID = useSelector((state: RootState) => state.session.userID);
  const [datetime, setDateTime] = useState(
    notif_time ? new Date(notif_time) : new Date()
  );

  const dispatch = useDispatch();

  const onChange = (event, selectedDateTime) => {
    const currentDateTime = selectedDateTime || datetime;
    setDateTime(currentDateTime);
  };

  // Date.prototype.toISOString = function() {
  //   var tzo = this.getTimezoneOffset(),
  //     dif = tzo >= 0 ? "+" : "-",
  //     pad = function(num) {
  //       var norm = Math.floor(Math.abs(num));
  //       return (norm < 10 ? "0" : "") + norm;
  //     };
  //   return (
  //     this.getFullYear() +
  //     "-" +
  //     pad(this.getMonth() + 1) +
  //     "-" +
  //     pad(this.getDate()) +
  //     "T" +
  //     pad(this.getHours()) +
  //     ":" +
  //     pad(this.getDays()) +
  //     ":" +
  //     pad(this.getSeconds()) +
  //     dif +
  //     pad(tzo / 60) +
  //     ":" +
  //     pad(tzo % 60)
  //   );
  // };

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Button onPress={() => setShow(false)}>Cancel</Button>
            <Button
              onPress={() => {
                //get timezone offset
                let offset = datetime.getTimezoneOffset();
                // Adds the offset in milliseconds
                let date = new Date(datetime.getTime() + (offset * 60 * 1000));
                const timestring = date.toLocaleTimeString();
                console.log(timestring);
                //dispatch(editNotifTime(timestring, userID));
                setShow(false);
              }}
            >
              Done
            </Button>
          </View>
          <DateTimePicker
            value={datetime}
            mode="time"
            display="default"
            onChange={onChange}
          />
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
    height: windowHeight * 0.45,
    width: windowWidth,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    shadowColor: "#000",

    //temporary
    borderWidth: 1,
    borderStyle: "solid"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
