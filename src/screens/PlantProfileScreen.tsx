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
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { CardStyleInterpolators } from "@react-navigation/stack";
import SetReminderModal from "../components/SetReminderModal";
import AddEntryModal from "../components/AddEntryModal";
import { Calendar as ReactCalendar } from "react-native-calendars";

// declare types for your props here
interface Props {
  navigation: any;
  route: any;
  itemName: string;
  itemUri: string;
  //TODO add any other plant information
}

var entries = {
  "2020-11-21": [false, false, true],
  "2020-11-23": [true, false, false],
  "2020-11-10": [true, false, false],
  "2020-11-02": [true, false, true],
  "2020-11-03": [true, true, false]
};

export default function PlantProfileScreen(props: Props) {
  const { navigation, route } = props;
  const { itemName, itemURI } = route.params;

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
                  uri: itemURI
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.plantNameStyle}>{itemName}</Text>
            <Text style={styles.scientificZoneStyle}>Scientific Name</Text>
            <Text style={styles.scientificZoneStyle}>Zone: #</Text>
          </View>
        </View>

        <View>
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
        </View>

        <View style={styles.smallerPhoneStyling}>
          <Text style={styles.NRTChildStyle}>Watered</Text>
          <Text style={styles.NRTChildStyle}>Date Placeholder</Text>
        </View>
        <View style={styles.smallerPhoneStyling}>
          <Text style={styles.NRTChildStyle}>Repotted</Text>
          <Text style={styles.NRTChildStyle}>Date Placeholder</Text>
        </View>
        <View style={styles.smallerPhoneStyling}>
          <Text style={styles.NRTChildStyle}>Fertilized</Text>
          <Text style={styles.NRTChildStyle}>Date Placeholder</Text>
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
