import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  GestureResponderEvent,
  KeyboardAvoidingView,
  PixelRatio,
  PushNotificationIOS
} from "react-native";
import { Text, IconButton, Colors, Button, TextInput } from "react-native-paper";
import SetZoneModal from "../components/SetZoneModal";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { editUserProfile } from "../../store/session/actions";

// declare types for your props here
interface Props {
  navigation: any;
}

const theme = {
  colors: {
    placeholder: "#BEBEBE",
    text: "black"
  }
};

export default function EditSettingsScreen(props: Props) {
  const { navigation } = props;
  const USDAZone = useSelector((state: RootState) => state.session.USDA_zone);
  const username = useSelector((state: RootState) => state.session.username);
  const userID = useSelector((state: RootState) => state.session.userID);
  const profilePic = useSelector(
    (state: RootState) => state.session.profileURI
  );

  const [image, setImage] = useState(null);
  const [textZone, setTextZone] = useState(USDAZone);
  const [textName, setTextName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [textErr, setTextErr] = useState(false);

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

  function onSubmit() {
    if (textName && textName.length < 3) {
      setTextErr(true);
      return;
    }
    dispatch(
      editUserProfile(
        textName ? textName : username,
        textZone,
        image ? image : profilePic,
        userID
      )
    );
    setTextErr(false);
    navigation.goBack();
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Cancel",
      headerRight: () => (
        <IconButton
          icon="check-bold"
          color={Colors.lightGreen900}
          onPress={onSubmit}
        />
      )
    });
  }, [navigation, textName, textZone, image]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.containerPicture}>
            {(image && (
              <Image style={styles.profilePicture} source={{ uri: image }} />
            )) ||
              (!image && (
                <Image
                  style={styles.profilePicture}
                  source={{ uri: profilePic }}
                />
              ))}
            <Button
              color="#64A3A3"
              icon="camera"
              labelStyle={styles.buttonStyle}
              onPress={pickImage}
            >
              Change Profile Photo
            </Button>
          </View>
          <View style={styles.containerTest}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                paddingTop: 10
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.inputFontStyleLabelTop}>Username</Text>
              </View>
              <View style={{ flex: 2 }}>
                <TextInput
                  keyboardType="ascii-capable"
                  mode="flat"
                  maxLength={13}
                  theme={theme}
                  style={styles.inputFontStyle}
                  placeholder={username}
                  underlineColor="#fff"
                  value={textName}
                  onChangeText={textName => setTextName(textName)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                paddingTop: 10
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.inputFontStyleLabelBottom}>USDA Zone</Text>
              </View>
              <View style={{ flex: 2 }}>
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
            {textErr && (
              <Text style={styles.textError}>
                username must be between 3-13 characters long
              </Text>
            )}
          </View>
          <SetZoneModal
            displayModal={showModal}
            textZone={textZone}
            setTextZone={setTextZone}
            setShowModal={setShowModal}
            onExit={() => setShowModal(false)}
          />
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
    paddingTop: 10,
    height: windowHeight * 0.29
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
    backgroundColor: "#ffffff",
    height: 25,
    width: windowWidth * 0.6,
    color: "#666666",
    fontSize: 18
  },
  inputPickerStyle: {
    borderColor: "black",
    backgroundColor: "#ffffff",
    height: 40,
    width: windowWidth * 0.15,
    color: "#666666",
    fontSize: 18
  },
  inputFontStyleLabelTop: {
    color: "#666666",
    fontSize: 18,
    marginRight: 29,
    fontWeight: "500"
  },
  inputFontStyleLabelBottom: {
    color: "#666666",
    fontSize: 18,
    marginRight: 20,
    fontWeight: "500"
  },
  textError: {
    paddingTop: 30,
    color: "red"
  },
  buttonStyle: {
    textTransform: "none",
    fontSize: 18
  },
  zoneButton: {
    width: windowWidth * 0.38
  },
  contentStyle: {
    backgroundColor: Colors.grey300
  },
  labelStyle: {
    color: "black",
    fontSize: 12
  }
});
