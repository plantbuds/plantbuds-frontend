import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Vibration, TextInput, Button } from "react-native";
import  { signInWithGoogleAsync }  from "../utils/GoogleOAuth";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function SignupScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Signup</Text>
      <TextInput
        style={styles.username}
        defaultValue="Username"
      />
      <TextInput
        style={styles.password}
        defaultValue="Password"
      />
      <Button
        title="SIGN UP(google auth?)"
        onPress={() =>signInWithGoogleAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF1E6",
    alignItems: "center",
    justifyContent: "center"
  },
  username: {

  },
  password: {

  }
});
