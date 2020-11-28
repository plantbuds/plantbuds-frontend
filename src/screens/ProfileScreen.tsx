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
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { CardStyleInterpolators } from "@react-navigation/stack";
// declare types for your props here
interface Props {
  navigation: any;
}

export default function ProfileScreen(props: Props) {
  const { navigation } = props;
  const [image, setImage] = useState(null);
  const [textZone, setTextZone] = useState("");
  const [textName, setTextName] = useState("");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
     <View style={styles.row}>
        <Text style={styles.textTitle}></Text>
        <Button
          labelStyle={styles.buttonStyle}
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <Text style={styles.editButtonStyle}>Edit</Text>
        </Button>
      </View>

      <View style ={{flexDirection: 'row'}}>
        <View style = {{flexDirection: 'column'}}>
          <View style = {styles.containerPicture}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: 'https://media1.fdncms.com/illinoistimes/imager/u/original/11623518/news01.jpg',
              }}
            />
          </View>
        </View>
        <View style = {{flexDirection: 'column'}}>
          <Text style = {styles.usernameStyle}>Name</Text>
          <Text style = {styles.zoneStyle}>USDA Zone</Text>
        </View>
      </View>

    
      <View>
      <Text style={styles.notificationSettingStyle}> Notifications </Text>
      </View>

      
      <View style={{flexDirection:'column'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.optionsStyle}>Watering  Reminder</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <Switch style={styles.toggleStyle}
              trackColor={{ false: "#767577", true: "#34c759" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}/>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.optionsStyle}>Repotting Reminder</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <Switch style={styles.toggleStyle}
              trackColor={{ false: "#767577", true: "#34c759" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}/>
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.optionsStyle}>Fertilizing Reminder</Text>
          </View>
          <View style={{flexDirection:'column'}}>
          <Switch style={styles.toggleStyle}
              trackColor={{ false: "#767577", true: "#34c759" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}/>
          </View>
        </View>
      </View>

      <Text style = {styles.notificationSettingStyle}>Settings</Text>
      <Text style = {styles.optionsStyle}>Notification Delivery</Text>

    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  buttonStyle: {
    textTransform: "none",
    fontSize: 18,
  },
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerPicture: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 10,
    height: windowHeight * 0.23,
    marginLeft:20
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
    fontWeight: "normal",
  },

  notificationSettingStyle:{
    marginLeft: 15, 
    fontStyle: "normal",
    fontWeight: "normal", 
    color: "#666666",
    fontSize: 22,
    lineHeight: 30,
    paddingTop: 20
  },

  optionsStyle:{
    fontSize: 16,
    color: '#666666',
    fontStyle: "normal",
    fontWeight: "normal", 
    marginLeft: 30,
    lineHeight: 30
  },
  
  profilePicture : {
    flexDirection: 'column',
    borderColor: 'black',
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
   
  toggleStyle:{
    marginLeft:80,
    transform: [{scale:.8}]
  },
    
  usernameStyle: {
    alignContent:'center',
    top:'30%',
    fontSize: 26, 
    marginLeft: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#000",
  },

  zoneStyle:{
    alignContent:'center',
    top:'30%',
    fontSize: 16, 
    marginLeft: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#666666",
  },
});
