import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function PlantProfileScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Plant Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: "#fff"
    }
})