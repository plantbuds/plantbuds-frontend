import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store"
import SetZoneModal from "../components/SetZoneModal";
// declare types for your props here
interface Props {
  navigation: any;
}
export default function EditPlantProfileScreen(props: Props) {
  const { navigation } = props;
  const [image, setImage] = useState(null);
  const [textSciName, setTextSciName] = useState("");
  const [textNickname, setTextNickname] = useState("");
  const [textZone, setTextZone] = useState("5");
  const [showModal, setShowModal] = useState(false);
  const [textNotes, setTextNotes] = useState("");
  const [textWatFreq, setTextWatFreq] = useState("");
  const [textRepFreq, setTextRepFreq] = useState("");
  const [textFertFreq, setTextFertFreq] = useState("");

  const plant_name = useSelector((state: RootState)  => state.plantgroup.plant_name);
  const nickname = useSelector((state: RootState) => state.plantgroup.nickname);
  const photo = useSelector((state:RootState) => state.plantgroup.photo);
  const water_history = useSelector((state:RootState) => state.plantgroup.water_history);
  const fertilize_history = useSelector((state: RootState) => state.plantgroup.fertilize_history);
  const repot_history = useSelector((state: RootState) => state.plantgroup.repot_history);
  const notes = useSelector((state: RootState) => state.plantgroup.notes);

  // check if user has given permission to access image gallery from phone
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  // method that gets image from the phone
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Button
              labelStyle={styles.buttonStyle}
              onPress={() => navigation.navigate("PlantProfile")}
            >
              <Text style={styles.textTitleLeft}>Cancel</Text>
            </Button>
            <Text style={styles.textTitle}>Edit Plant Profile</Text>
            <Button
              labelStyle={styles.buttonStyle}
              onPress={() => navigation.navigate("PlantProfile")}
            >
              <Text style={styles.textTitleRight}>Done</Text>
            </Button>
          </View>
          <ScrollView>
            <View style={styles.containerPicture}>
              {(image && (
                <Image style={styles.profilePicture} source={{ uri: image }} />
              )) ||
                (!image && (
                  <Image
                    style={styles.profilePicture}
                    source={{ uri: "https://i.imgur.com/oeojGAr.jpeg" }}
                  />
                ))}
              <Button
                color="#64A3A3"
                icon="camera"
                labelStyle={styles.buttonStyle}
                onPress={pickImage}
              >
                Change Plant Photo
              </Button>
            </View>
            <View style={styles.containerTest}>
              <View style={styles.profileRows}>
                <View style={styles.halfFlex}>
                  <Text style={styles.inputFontStyleLabelBottom}>
                    Scientific Name
                  </Text>
                </View>
                <View style={styles.halfFlex}>
                  <TextInput
                    mode="flat"
                    style={styles.inputFontStyle}
                    placeholder="Name"
                    placeholderTextColor="#666"
                    underlineColor="#fff"
                    value={textSciName}
                    theme={{ colors: { text: "#666" } }}
                    onChangeText={textSciName => setTextSciName(textSciName)}
                  />
                </View>
              </View>
              <View style={styles.profileRows}>
                <View style={styles.halfFlex}>
                  <Text style={styles.inputFontStyleLabelBottom}>Nickname</Text>
                </View>
                <View style={styles.halfFlex}>
                  <TextInput
                    mode="flat"
                    style={styles.inputFontStyle}
                    underlineColor="#fff"
                    placeholder="Nickname"
                    placeholderTextColor="#666"
                    value={textNickname}
                    theme={{ colors: { text: "#666" } }}
                    onChangeText={textNickname => setTextNickname(textNickname)}
                  />
                </View>
              </View>
              <View style={styles.profileRows}>
                <View style={styles.halfFlex}>
                  <Text style={styles.inputFontStyleLabelBottom}>
                    USDA Zone
                  </Text>
                </View>
                <View style={styles.halfFlex}>
                  <Button
                    icon={showModal ? "chevron-up" : "chevron-down"}
                    mode="contained"
                    contentStyle={styles.contentStyle}
                    labelStyle={styles.labelStyle}
                    style={styles.zoneButton}
                    onPress={() => setShowModal(true)}
                  >
                    {"USDA Zone: " + textZone}
                  </Button>
                </View>
              </View>
              <View style={{ paddingTop: 10 }}>
                <View>
                  <Text style={styles.inputFontStyleLabelBottom}>Notes</Text>
                </View>
                <View>
                  <TextInput
                    multiline={true}
                    numberOfLines={5}
                    //mode="flat"
                    style={styles.inputFontStyleMultiline}
                    underlineColor="#fff"
                    placeholder="Add Notes"
                    placeholderTextColor="#666"
                    value={textNotes}
                    theme={{ colors: { text: "#666" } }}
                    onChangeText={textNotes => setTextNotes(textNotes)}
                  />
                </View>
              </View>
              <View style={styles.profileRows}>
                <View style={styles.halfFlex}>
                  <Text style={styles.inputFontStyleLabelBottom}>
                    Watering Frequency
                  </Text>
                </View>
                <View style={styles.halfFlex}>
                  <TextInput
                    keyboardType="number-pad"
                    mode="flat"
                    style={styles.inputFontStyle}
                    underlineColor="#fff"
                    placeholder="# Days"
                    placeholderTextColor="#666"
                    value={textWatFreq}
                    theme={{ colors: { text: "#666" } }}
                    onChangeText={textWatFreq => setTextWatFreq(textWatFreq)}
                  />
                </View>
              </View>
              <View style={styles.profileRows}>
                <View style={styles.halfFlex}>
                  <Text style={styles.inputFontStyleLabelBottom}>
                    Repotting Frequency
                  </Text>
                </View>
                <View style={styles.halfFlex}>
                  <TextInput
                    keyboardType="number-pad"
                    mode="flat"
                    style={styles.inputFontStyle}
                    underlineColor="#fff"
                    placeholder="# Days"
                    placeholderTextColor="#666"
                    value={textRepFreq}
                    theme={{ colors: { text: "#666" } }}
                    onChangeText={textRepFreq => setTextRepFreq(textRepFreq)}
                  />
                </View>
              </View>
              <View style={styles.profileRows}>
                <View style={styles.halfFlex}>
                  <Text style={styles.inputFontStyleLabelBottom}>
                    Fertilizing Frequency
                  </Text>
                </View>
                <View style={styles.halfFlex}>
                  <TextInput
                    keyboardType="number-pad"
                    mode="flat"
                    style={styles.inputFontStyle}
                    underlineColor="#fff"
                    placeholder="# Days"
                    placeholderTextColor="#666"
                    value={textFertFreq}
                    theme={{ colors: { text: "#666" } }}
                    onChangeText={textFertFreq => setTextFertFreq(textFertFreq)}
                  />
                </View>
              </View>
              <SetZoneModal
                displayModal={showModal}
                textZone={textZone}
                setTextZone={setTextZone}
                setShowModal={setShowModal}
                onExit={() => setShowModal(false)}
              />
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexWrap: "wrap",
    alignItems: "center",
    height: windowHeight 
  },
  containerPicture: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 10
    //height: windowHeight * 0.29
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    width: "100%",
    height: windowHeight * 0.06
  },
  profileRows: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#fff",
    paddingTop: 10
  },
  halfFlex: {
    flex: 1
  },
  textTitle: {
    fontSize: 24,
    color: "#000000",
    fontStyle: "normal",
    fontWeight: "normal"
  },
  textTitleLeft: {
    fontSize: 18,
    color: "#000000",
    fontStyle: "normal",
    fontWeight: "normal"
  },
  textTitleRight: {
    fontSize: 18,
    color: "#64A3A3",
    fontStyle: "normal",
    fontWeight: "normal"
  },
  profilePicture: {
    flexDirection: "column",
    borderColor: "#000000",
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 0.5
  },
  textContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputFontStyle: {
    borderColor: "black",
    backgroundColor: "#fff",
    height: 25,
    width: windowWidth * 0.45,
    color: "#666666",
    padding: 0,
    margin: 0,
    fontSize: 18
  },
  inputFontStyleMultiline: {
    borderColor: "black",
    backgroundColor: "#fff",
    width: windowWidth * 0.9,
    color: "#666666",
    fontSize: 18
  },
  inputFontStyleLabelBottom: {
    color: "#666666",
    fontSize: 18,
    marginRight: 20,
    fontWeight: "500"
  },
  buttonStyle: {
    textTransform: "none",
    fontSize: 18
  },
  zoneButton: {
    width: windowWidth * 0.38
  },
  contentStyle: {
    backgroundColor: "white"
  },
  labelStyle: {
    fontSize: 12
  }
});
