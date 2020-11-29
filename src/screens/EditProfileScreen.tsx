import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

// declare types for your props here
interface Props {
  navigation: any;
}

export default function EditProfileScreen(props: Props) {
  const { navigation } = props;
  const [image, setImage] = useState(null);

  // check if user has given permission to access image gallery from phone
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
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
      quality: 1,
    });

    console.log(result);
    
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile Screen!</Text>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button onPress={pickImage}>Pick an image from camera roll</Button>
      <Button
        mode="contained"
        color="green"
        labelStyle={styles.buttonText}
        contentStyle={styles.innerButton}
        style={styles.button}
        onPress={() => navigation.navigate("Profile")}
      >
        Done
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white"
  },

  innerButton: {
    padding: 10
  },

  button: {
    alignItems: "flex-end",
    backgroundColor: 'lightblue', 
    borderRadius: 50
  }
});