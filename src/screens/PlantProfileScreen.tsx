import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  PixelRatio,
  Switch
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { getIndividualPlant } from "../../store/plantgroup/actions";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import SetReminderModal from "../components/SetReminderModal";
import AddEntryModal from "../components/AddEntryModal";
import { Calendar as ReactCalendar } from "react-native-calendars";

// declare types for your props here
interface Props {
  navigation: any;
  route: any;
  plantID: string;
}

var entries = {
  "2020-11-21": [false, false, true],
  "2020-11-23": [true, false, false],
  "2020-11-10": [true, false, false],
  "2020-11-02": [true, false, true],
  "2020-11-03": [true, true, false]
};

const greenBlueBrown = {
  container: {
    backgroundColor: "white",
    borderWidth: 4,
    borderBottomColor: "#1CA7EC",
    borderTopColor: "#31e627",
    borderLeftColor: "#AA6F5D",
    borderRightColor: "#1CA7EC"
  },
  text: {
    bottom: 3,
    color: "black"
  }
};
const brown = {
  container: {
    backgroundColor: "white",
    borderWidth: 4,
    borderBottomColor: "#AA6F5D",
    borderTopColor: "#AA6F5D",
    borderLeftColor: "#AA6F5D",
    borderRightColor: "#AA6F5D"
  },
  text: {
    bottom: 3,
    color: "black"
  }
};
const green = {
  container: {
    backgroundColor: "white",
    borderWidth: 4,
    borderBottomColor: "#31e627",
    borderTopColor: "#31e627",
    borderLeftColor: "#31e627",
    borderRightColor: "#31e627"
  },
  text: {
    bottom: 3,
    color: "black"
  }
};
const blue = {
  container: {
    backgroundColor: "white",
    borderWidth: 4,
    borderBottomColor: "#1CA7EC",
    borderTopColor: "#1CA7EC",
    borderLeftColor: "#1CA7EC",
    borderRightColor: "#1CA7EC"
  },
  text: {
    bottom: 3,
    color: "black"
  }
};

const blueBrown = {
  container: {
    backgroundColor: "white",
    borderWidth: 4,
    borderBottomColor: "#1CA7EC",
    borderTopColor: "#AA6F5D",
    borderLeftColor: "#1CA7EC",
    borderRightColor: "#AA6F5D"
  },
  text: {
    bottom: 3,
    color: "black"
  }
};
const blueGreen = {
  container: {
    backgroundColor: "white",
    borderWidth: 4,
    borderBottomColor: "#1CA7EC",
    borderTopColor: "#31e627",
    borderLeftColor: "#1CA7EC",
    borderRightColor: "#31e627"
  },
  text: {
    bottom: 3,
    color: "black"
  }
};
const greenBrown = {
  container: {
    backgroundColor: "white",
    borderWidth: 4,
    borderBottomColor: "#31e627",
    borderTopColor: "#AA6F5D",
    borderLeftColor: "#31e627",
    borderRightColor: "#AA6F5D"
  },
  text: {
    bottom: 3,
    color: "black"
  }
};

export default function PlantProfileScreen(props: Props) {
  const { navigation, route } = props;
  const { plantID } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [markings, setMarkings] = useState({});
  const [waterStatus, setWaterStatus] = useState(false);
  const [repotStatus, setRepotStatus] = useState(false);
  const [fertilizeStatus, setFertilizeStatus] = useState(false);
  const [displayAddEntryModal, setDisplayAddEntryModal] = useState(false);
  const [displayReminderModal, setDisplayReminderModal] = useState(false);

  const plant_name = useSelector((state: RootState)  => state.plantgroup.plant_name);
  const nickname = useSelector((state: RootState) => state.plantgroup.nickname);
  const photo = useSelector((state:RootState) => state.plantgroup.photo);
  const water_history = useSelector((state:RootState) => state.plantgroup.water_history);
  const fertilize_history = useSelector((state: RootState) => state.plantgroup.fertilize_history);
  const repot_history = useSelector((state: RootState) => state.plantgroup.repot_history);
  const notes = useSelector((state: RootState) => state.plantgroup.notes);

  const dispatch = useDispatch();

  const updateCalendarMarkings = () => {
    var markings = {};
    var selected = false;
    for (const [date, value] of Object.entries(entries)) {
      var entry = {};
      //Deep copy shenanigans
      if (value[0] == true && value[1] == false && value[2] == false) {
        entry["customStyles"] = JSON.parse(JSON.stringify(blue));
      } else if (value[0] == false && value[1] == true && value[2] == false) {
        entry["customStyles"] = JSON.parse(JSON.stringify(brown));
      } else if (value[0] == false && value[1] == false && value[2] == true) {
        entry["customStyles"] = JSON.parse(JSON.stringify(green));
      } else if (value[0] == true && value[1] == true && value[2] == false) {
        entry["customStyles"] = JSON.parse(JSON.stringify(blueBrown));
      } else if (value[0] == true && value[1] == false && value[2] == true) {
        entry["customStyles"] = JSON.parse(JSON.stringify(blueGreen));
      } else if (value[0] == false && value[1] == true && value[2] == true) {
        entry["customStyles"] = JSON.parse(JSON.stringify(greenBrown));
      } else if (value[0] == true && value[1] == true && value[2] == true) {
        entry["customStyles"] = JSON.parse(JSON.stringify(greenBlueBrown));
      } else {
      }
      if (date === selectedDate) {
        entry["selected"] = true;
        entry["customStyles"]["container"]["backgroundColor"] = "green";
        entry["customStyles"]["text"]["color"] = "white";
        selected = true;
      }
      markings[date] = entry;
    }
    if (!selected) {
      markings[selectedDate] = {
        selected: true,
        customStyles: { container: { backgroundColor: "green" } }
      };
    }
    setMarkings(markings);
  };

  useEffect(() => {
    dispatch(getIndividualPlant(plantID));
    updateCalendarMarkings();
  }, [selectedDate, displayAddEntryModal]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Button
          labelStyle={styles.buttonStyle}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.homeButtonStyle}>Plant Home</Text>
        </Button>
        <Text style={styles.textTitle}></Text>
        <Button
          labelStyle={styles.buttonStyle}
          onPress={() => navigation.navigate("EditPlantProfile")}
        >
          <Text style={styles.editButtonStyle}>Edit</Text>
        </Button>
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.containerPicture}>
              <Image
                style={styles.profilePicture}
                source={{
                  uri: photo
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.plantNameStyle}>{nickname}</Text>
              <Text style={styles.scientificZoneStyle}>{plant_name}</Text>
            {/*<Text style={styles.scientificZoneStyle}>Zone: #</Text>*/}
          </View>
        </View>

        <View style={{ paddingTop: 10 }}>
          <Text style={styles.NRTParentStyle}> Notes </Text>
          <Text style={styles.randomStyling}> Placeholder for notes! </Text>
        </View>

        <View>
          <Text style={styles.NRTParentStyle}> Reminders </Text>
        </View>

        <View style={styles.smallerPhoneStyling}>
          <Text style={styles.NRTChildStyle}>Watering Reminder</Text>
          <Text style={styles.NRTChildStyle}>Last Watered Date</Text>
        </View>
        <View style={styles.smallerPhoneStyling}>
          <Text style={styles.NRTChildStyle}>Repotting Reminder</Text>
          <Text style={styles.NRTChildStyle}>Last Repotted Date</Text>
        </View>
        <View style={styles.smallerPhoneStyling}>
          <Text style={styles.NRTChildStyle}>Fertilizing Reminder</Text>
          <Text style={styles.NRTChildStyle}>Last Fertilized Date</Text>
        </View>

        <View>
          <Text style={styles.NRTParentStyle}> Task History </Text>
          <ReactCalendar
            onDayPress={day => {
              setSelectedDate(day.dateString);
              if (entries[selectedDate] != null) {
                setWaterStatus(entries[selectedDate][0]);
                setRepotStatus(entries[selectedDate][1]);
                setFertilizeStatus(entries[selectedDate][2]);
              } else {
                setWaterStatus(false);
                setRepotStatus(false);
                setFertilizeStatus(false);
              }
              updateCalendarMarkings();
            }}
            markedDates={markings}
            maxDate={new Date()}
            markingType={"custom"}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayTextColor: "white",
              todayTextColor: "#00adf5",
              dayTextColor: "black",
              textDisabledColor: "#979797"
            }}
          />
          <Button onPress={() => setDisplayAddEntryModal(true)}>
            Edit Entry
          </Button>

          <Button onPress={() => setDisplayReminderModal(true)}>
            Add start date for reminder
          </Button>
          <AddEntryModal
            selectedDate={selectedDate}
            displayModal={displayAddEntryModal}
            onPress={() => {
              setDisplayAddEntryModal(false);
            }}
            onExit={() => setDisplayAddEntryModal(false)}
            entries={entries}
            updateCalendarMarkings={() => updateCalendarMarkings}
          />
          <SetReminderModal
            displayModal={displayReminderModal}
            onPress={() => {
              setDisplayReminderModal(false);
            }}
            onExit={() => setDisplayReminderModal(false)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff"
  },

  buttonStyle: {
    borderRadius: 1,
    fontSize: 18,
    textTransform: "none",
    color: "#64A3A3",
    fontStyle: "normal",
    fontWeight: "normal"
  },

  columnStyle: {
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },

  containerPicture: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 10,
    height: windowHeight * 0.23,
    marginLeft: 20
  },

  editButtonStyle: {
    alignItems: "flex-end"
  },

  homeButtonStyle: {
    alignItems: "flex-start"
  },

  profilePicture: {
    flexDirection: "column",
    borderColor: "black",
    width: 150,
    height: 150,
    borderRadius: 100
  },

  NRTChildStyle: {
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#666666",
    fontSize: 16,
    lineHeight: 30
  },

  NRTParentStyle: {
    marginLeft: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#000",
    fontSize: 22,
    lineHeight: 30,
    justifyContent: "space-around"
  },

  plantNameStyle: {
    alignContent: "center",
    top: "30%",
    fontSize: 26,
    marginLeft: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#000",
    paddingBottom: 3
  },

  randomStyling: {
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#666666",
    fontSize: 16,
    lineHeight: 30,
    marginLeft: 40
  },

  scientificZoneStyle: {
    alignContent: "center",
    top: "30%",
    fontSize: 16,
    marginLeft: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#666666",
    paddingBottom: 3
  },

  smallerPhoneStyling: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: windowWidth * 0.78
  },

  textTitle: {
    fontSize: 24,
    color: "#000000",
    fontStyle: "normal",
    fontWeight: "normal",
    width: "50%"
  }
});
