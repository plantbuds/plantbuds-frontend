import React, { useEffect, useState, useRef } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  GestureResponderEvent
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  editPlantPic,
  editPlantName,
  editPlantNickname,
  setCreatedPlant
} from "../../store/plantgroup/actions";

// declare types for your props here
interface Props {
  navigation: any;
  displayModal: boolean;
  setDisplayCreatePlantModal: (val: boolean) => void;
}

export default function CreatePlantProfileModal(props: Props) {
  const { navigation, displayModal, setDisplayCreatePlantModal } = props;
  const [image, setImage] = useState(null);
  const [textSciName, setTextSciName] = useState("");
  const [textNickname, setTextNickname] = useState("");
  const [textErr, setTextErr] = useState(false);
  const [textSciErr, setTextSciErr] = useState(false);

  const plantID = useSelector((state: RootState) => state.plantgroup.plant_id);
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
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function onSubmit(e: GestureResponderEvent) {
    e.preventDefault();
    try {
      //image ? await dispatch(editPlantPic(image, plantID)) : null ;
      //textSciName ? await dispatch(editPlantName(textSciName, plantID)) : null 
      //textNickname ? await dispatch(editPlantNickname(textNickname, plantID)) : null
      navigation.navigate("PlantProfile", {
        plantID: plantID
      });
      dispatch(setCreatedPlant(true));
      setDisplayCreatePlantModal(false);
    } catch (err) {

    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={displayModal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.bottomView}>
            <View style={styles.row}>
              <Text style={styles.textTitle}>Create Plant Profile</Text>
              <Button
                labelStyle={styles.buttonStyle}
                onPress={() => onSubmit}
              >
                <Text style={styles.textTitleRight}>Done</Text>
              </Button>
            </View>
            <View style={styles.containerPicture}>
              {(image && (
                <Image style={styles.profilePicture} source={{ uri: image }} />
              )) ||
                (!image && (
                  <Image
                    style={styles.profilePicture}
                    source={{ uri: photo }}
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
                  {textSciErr && (
                    <Text style={styles.textSciError}>
                      scientific name must be between 3-26 characters long
                    </Text>
                  )}
                </View>
                <View style={styles.halfFlex}>
                  <TextInput
                    mode="flat"
                    keyboardType="ascii-capable"
                    maxLength={26}
                    style={styles.inputFontStyle}
                    placeholder="Enter Name"
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
                  {textErr && (
                    <Text style={styles.textError}>
                      nickname must be between 2-22 characters
                    </Text>
                  )}
                </View>
                <View style={styles.halfFlex}>
                  <TextInput
                    mode="flat"
                    keyboardType="ascii-capable"
                    maxLength={22}
                    style={styles.inputFontStyle}
                    underlineColor="#fff"
                    placeholder="My Plant"
                    placeholderTextColor="#666"
                    value={textNickname}
                    theme={{ colors: { text: "#666" } }}
                    onChangeText={textNickname => setTextNickname(textNickname)}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    backgroundColor: "#fff",
    flexWrap: "wrap",
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "flex-start"
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
    width: windowWidth,
    height: windowHeight * 0.06
  },
  profileRows: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#fff"
  },
  halfFlex: {
    flex: 1
  },
  textTitle: {
    fontSize: 24,
    color: "#000000",
    fontStyle: "normal",
    paddingLeft: windowWidth * 0.24,
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
