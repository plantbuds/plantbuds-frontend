import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
  Switch
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import SetNotifTimeModal from "../components/SetNotifTimeModal";
import {
  editWaterNotif,
  editRepotNotif,
  editFertilizingNotif
} from "../../store/session/actions";
import { CardStyleInterpolators } from "@react-navigation/stack";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function SettingsScreen(props: Props) {
  const { navigation } = props;
  const userID = useSelector((state: RootState) => state.session.userID);
  const username = useSelector((state: RootState) => state.session.username);
  const USDAZone = useSelector((state: RootState) => state.session.USDA_zone);
  const profilePic = useSelector(
    (state: RootState) => state.session.profileURI
  );
  const receive_water_notif = useSelector(
    (state: RootState) => state.session.receive_water_notif
  );
  const receive_fertilizing_notif = useSelector(
    (state: RootState) => state.session.receive_fertilizing_notif
  );
  const receive_repot_notif = useSelector(
    (state: RootState) => state.session.receive_repot_notif
  );
  const notif_time = useSelector(
    (state: RootState) => state.session.notif_time
  );
  const dispatch = useDispatch();
  const [waterNotif, setWaterNotif] = useState(false);
  const [repotNotif, setRepotNotif] = useState(receive_repot_notif);
  const [fertilizeNotif, setFertilizeNotif] = useState(receive_fertilizing_notif);
  const [show, setShow] = useState(false);

  const toggleWater = () => {
    setWaterNotif(previousState => !previousState);
    
    // previous state has not gone through yet, so need to manually flip boolean
    dispatch(editWaterNotif(!waterNotif, userID));
  };
  const toggleRepot = () => {
    setRepotNotif(previousState => !previousState);
    dispatch(editRepotNotif(!repotNotif, userID));
  };
  const toggleFertilize = () => {
    setFertilizeNotif(previousState => !previousState);
    dispatch(editFertilizingNotif(!fertilizeNotif, userID));
  };
  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.textTitle}></Text>
        <Button
          labelStyle={styles.buttonStyle}
          onPress={() => navigation.navigate("EditSettingsScreen")}
        >
          <Text style={styles.editButtonStyle}>Edit</Text>
        </Button>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.containerPicture}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: profilePic
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.usernameStyle}>{username}</Text>
          <Text style={styles.zoneStyle}>
            USDA Zone: {USDAZone ? USDAZone : "N/A"}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.notificationSettingStyle}> Notifications </Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.columnStyle}>
            <Text style={styles.optionsStyle}>Watering Reminder</Text>
          </View>
          <View style={styles.columnStyle}>
            <Switch
              style={styles.toggleStyle}
              trackColor={{ false: "#767577", true: "#34c759" }}
              thumbColor={waterNotif ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleWater}
              value={waterNotif}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.columnStyle}>
            <Text style={styles.optionsStyle}>Repotting Reminder</Text>
          </View>
          <View style={styles.columnStyle}>
            <Switch
              style={styles.toggleStyle}
              trackColor={{ false: "#767577", true: "#34c759" }}
              thumbColor={repotNotif ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleRepot}
              value={repotNotif}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.columnStyle}>
            <Text style={styles.optionsStyle}>Fertilizing Reminder</Text>
          </View>
          <View style={styles.columnStyle}>
            <Switch
              style={styles.toggleStyle}
              trackColor={{ false: "#767577", true: "#34c759" }}
              thumbColor={fertilizeNotif ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleFertilize}
              value={fertilizeNotif}
            />
          </View>
        </View>
      </View>
      <Text style={styles.notificationSettingStyle}>Settings</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.optionsStyle}>Notification Delivery</Text>
        <View style={styles.notifStyle}>
          <Text>{notif_time ? new Date(notif_time).toISOString().split("T")[1] : "N/A"}</Text>
        </View>
      </View>
      <Button onPress={showTimepicker}>Select a notification time</Button>
      <SetNotifTimeModal displayModal={show} setShow={setShow} />
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  buttonStyle: {
    textTransform: "none",
    fontSize: 18
  },

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  containerPicture: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 10,
    height: windowHeight * 0.23,
    marginLeft: 20
  },

  containerTest: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginLeft: 25,
    justifyContent: "space-between",
    textAlignVertical: "top",
    height: windowHeight * 0.08
  },

  editButtonStyle: {
    fontSize: 18,
    color: "#64A3A3",
    fontStyle: "normal",
    fontWeight: "normal"
  },

  notificationSettingStyle: {
    marginLeft: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#000",
    fontSize: 22,
    lineHeight: 30,
    paddingTop: 20
  },

  optionsStyle: {
    fontSize: 16,
    color: "#666666",
    fontStyle: "normal",
    fontWeight: "normal",
    marginLeft: 30,
    lineHeight: 30
  },
  notifStyle: {
    fontSize: 16,
    color: "#666666",
    fontStyle: "normal",
    fontWeight: "normal",
    justifyContent: "center",
    right: windowWidth * 0.16
  },
  profilePicture: {
    flexDirection: "column",
    borderColor: "black",
    width: 150,
    height: 150,
    borderRadius: 100
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    width: "100%",
    height: windowHeight * 0.06
  },

  textTitle: {
    fontSize: 24,
    color: "#000000",
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    marginLeft: 160
  },

  toggleStyle: {
    marginLeft: 80,
    transform: [{ scale: 0.8 }]
  },

  usernameStyle: {
    alignContent: "center",
    top: "30%",
    fontSize: 26,
    marginLeft: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#000",
    paddingBottom: 3
  },

  zoneStyle: {
    alignContent: "center",
    top: "30%",
    fontSize: 16,
    marginLeft: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#666666",
    paddingBottom: 3
  },

  columnStyle: {
    flex: 1,
    flexDirection: "column"
  }
});
