import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function LandingScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Landing page for PlantBuds</Text>
      <Button
        title="Signup"
        onPress={() => navigation.navigate("Signup")}
      />
      <Button
        title="login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
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
