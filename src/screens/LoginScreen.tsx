import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function LoginScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Profile!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
