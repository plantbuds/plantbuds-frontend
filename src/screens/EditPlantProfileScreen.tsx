import React, { useEffect, useState, useRef } from "react";
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
  SafeAreaView,
  TextInput as TextArea
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  editPlantPic,
  editPlantName,
  editNotes,
  editPlantNickname
} from "../../store/plantgroup/actions";

// declare types for your props here
interface Props {
  navigation: any;
}

let padding = false;

export default function EditPlantProfileScreen(props: Props) {
  const { navigation } = props;
  const notes = useSelector((state: RootState) => state.plantgroup.notes);
  const [image, setImage] = useState(null);
  const [textSciName, setTextSciName] = useState("");
  const [textNickname, setTextNickname] = useState("");
  const [textErr, setTextErr] = useState(false);
  const [textSciErr, setTextSciErr] = useState(false);
  const [textNotes, setTextNotes] = useState(notes);

  const plant_name = useSelector(
    (state: RootState) => state.plantgroup.plant_name
  );
  const plantID = useSelector((state: RootState) => state.plantgroup.plant_id);
  const nickname = useSelector((state: RootState) => state.plantgroup.nickname);
  const photo = useSelector((state: RootState) => state.plantgroup.photo);
  const dispatch = useDispatch();

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
              onPress={() => {
                if (textSciName) {
                  if (textSciName.length < 3) {
                    setTextSciErr(true);
                    return;
                  }
                  dispatch(editPlantName(textSciName, plantID));
                }
                if (textNickname) {
                  if (textNickname.length < 4) {
                    setTextErr(true);
                    return;
                  }
                  dispatch(editPlantNickname(textNickname, plantID));
                }
                if (image) {
                  dispatch(editPlantPic(image, plantID));
                }
                if (textNotes) {
                  dispatch(editNotes(textNotes, plantID));
                }
                if (!textErr && !textSciErr) {
                  navigation.navigate("PlantProfile");
                }
              }}
            >
              <Text style={styles.textTitleRight}>Done</Text>
            </Button>
          </View>
          <View style={styles.containerPicture}>
            {(image && (
              <Image style={styles.profilePicture} source={{ uri: image }} />
            )) ||
              (!image && (
                <Image style={styles.profilePicture} source={{ uri: photo }} />
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
                  maxLength={26}
                  style={styles.inputFontStyle}
                  placeholder={plant_name ? plant_name : "Enter name"}
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
                  maxLength={22}
                  style={styles.inputFontStyle}
                  underlineColor="#fff"
                  placeholder={nickname}
                  placeholderTextColor="#666"
                  value={textNickname}
                  theme={{ colors: { text: "#666" } }}
                  onChangeText={textNickname => setTextNickname(textNickname)}
                />
              </View>
            </View>
            <View style={styles.notesContainer}>
              <View>
                <Text style={styles.inputFontStyleLabelBottom}>Notes</Text>
              </View>
              <View>
                <TextArea
                  multiline={true}
                  style={styles.inputFontStyleMultiline}
                  placeholder="Add Notes"
                  placeholderTextColor="#666"
                  value={textNotes}
                  onChangeText={textNotes => setTextNotes(textNotes)}
                />
              </View>
              {textErr && (
                <Text style={styles.textError}>
                  nickname must be between 3-22 characters long
                </Text>
              )}
              {textSciErr && (
                <Text style={styles.textSciError}>
                  plantname must be between 3-26 characters long
                </Text>
              )}
            </View>
          </View>
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
    justifyContent: "flex-end",
    paddingBottom: 10
  },
  containerPicture: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 10,
    //height: windowHeight * 0.29
    bottom: windowHeight * 0.45
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
    height: windowHeight * 0.06,
    bottom: windowHeight * 0.45
  },
  profileRows: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#fff",
    bottom: windowHeight * 0.45
  },
  halfFlex: {
    flex: 1
  },
  notesContainer: {
    bottom: windowHeight * 0.45,
    paddingBottom: 10
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
    display: "flex",
    marginTop: 5,
    marginBottom: 25,
    borderWidth: 1,
    paddingVertical: 130,
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "#fff",
    borderRadius: 5,
    width: windowWidth * 0.9,
    justifyContent: "flex-start",
    height: windowHeight * 0.3,
    paddingHorizontal: 5,
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
  textError: {
    paddingTop: 0,
    color: "red"
  },
  textSciError: {
    paddingTop: 5,
    color: "red"
  }
});
