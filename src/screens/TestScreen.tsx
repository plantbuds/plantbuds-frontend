import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View} from "react-native";
import {Button } from "react-native-paper";
import  { signInWithGoogleAsync }  from "../utils/GoogleOAuth";
// declare types for your props here
interface Props {
  navigation: any;
}

export default function TestScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Test screen to test out React Native Paper</Text>
      <Button icon="camera" mode="contained" style={styles.buttonInner}contentStyle={styles.button}>Press Me!</Button>
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
  button: {
      backgroundColor: 'blue',
      borderRadius: 50
  },
  buttonInner: {
      borderRadius: 50
  }
});
