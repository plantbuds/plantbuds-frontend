import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import  { signInWithGoogleAsync }  from "../utils/GoogleOAuth";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function LoginScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.username}
        defaultValue="Username"
      />
      <TextInput
        style={styles.password}
        defaultValue="Password"
      />
      <Button title="Login(google oauth)" onPress={() =>signInWithGoogleAsync()}/>
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
