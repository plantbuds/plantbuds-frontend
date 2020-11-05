import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
  } from "react-native";

  interface Props {
    navigation: any;
  }

  export default function LandingScreen(props: Props) {
    const { navigation } = props;

    return (
      <View style={styles.container}>
        <Text>Landing page for PlantBuds</Text>
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