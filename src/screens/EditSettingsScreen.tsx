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
  PixelRatio
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { CardStyleInterpolators } from "@react-navigation/stack";
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
  const [image, setImage] = useState(null);
  const [textZone, setTextZone] = useState("");
  const [textName, setTextName] = useState("");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
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
              onPress={() => navigation.navigate("Settings")}
            >
              <Text style={styles.textTitleLeft}>Cancel</Text>
            </Button>
            <Text style={styles.textTitle}>Edit Profile</Text>
            <Button
              labelStyle={styles.buttonStyle}
              onPress={() => navigation.navigate("Settings")}
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
                  source={{ uri: "https://i.imgur.com/oeojGAr.jpeg" }}
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
                backgroundColor: "#fff"
              }}
            >
              <View style={{flex:1}}>
                <Text style={styles.inputFontStyleLabelTop}>Username</Text>
              </View>
              <View style={{flex:2}}>
                <TextInput
                  mode="flat"
                  theme={theme}
                  style={styles.inputFontStyle}
                  placeholder="Name"
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
                backgroundColor: "#fff"
              }}
            >
              <View style={{flex:1}}>
                <Text style={styles.inputFontStyleLabelBottom}>USDA Zone</Text>
              </View>
              <View style={{flex:2}}>
                <TextInput
                  mode="flat"
                  theme={theme}
                  style={styles.inputFontStyle}
                  underlineColor="#fff"
                  placeholder="Zone #"
                  value={textZone}
                  onChangeText={textZone => setTextZone(textZone)}
                />
              </View>
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
  buttonStyle: {
    textTransform: "none",
    fontSize: 18
  }
});