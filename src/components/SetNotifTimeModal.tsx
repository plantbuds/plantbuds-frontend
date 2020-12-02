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
  onExit: () => void;

}

export default function SetNotifTimeModal(props: Props) {
  const { displayModal, onExit } = props;
  const notif_time = useSelector((state:RootState) => state.session.notif_time);
  const userID = useSelector((state: RootState) => state.session.userID);
  const [datetime, setDateTime] = useState(notif_time ? getNotifDateTimeObj(notif_time) : new Date());
  
  const dispatch = useDispatch();
  
  const onChange = (event, selectedDateTime) => {
    const currentDateTime = selectedDateTime || datetime;
    setDateTime(currentDateTime);
  }  

  function getNotifDateTimeObj(notif_time: string) {
    const dateobj = new Date(); 
    const timeArray = notif_time.split(":");
    let timeVal = []
    for (var i = 0; i < timeArray.length; i++) {
       timeVal.push(parseInt(timeArray[i]));
    }
    dateobj.setHours(timeVal[0], timeVal[1], timeVal[2]);
    return dateobj;
}

  const getSelectedTime = (dateval: Date) => {
    return dateval.toTimeString().split(" ")[0];
  };

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <View style={styles.header}> 
          <Button onPress={onExit}>Cancel</Button>
          <Button onPress={() => {
              const time = getSelectedTime(datetime);
              console.log(time);
              //dispatch(editNotifTime(time, userID));
              onExit
          }}>Done</Button>
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
      flexDirection: 'row', 
      justifyContent: "space-between"
  }
});
