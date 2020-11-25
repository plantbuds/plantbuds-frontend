import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";

// declare types for your props here
interface Props {
  navigation: any;
  route: any;
  itemName: string;
  itemUri: string;
  //TODO add any other plant information
}

export default function PlantProfileScreen(props: Props) {
  const { navigation, route } = props;
  const { itemName, itemURI } = route.params;

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("EditPlantProfileScreen")}>
        Edit
      </Button>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column" }}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: itemURI
            }}
          />
           <Text>{itemName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    
  },
  button: {
    alignItems: "flex-end",
    backgroundColor: "lightblue",
    borderRadius: 1
  },
  profilePicture: {
    flexDirection: "column",
    borderColor: "black",
    width: 150,
    height: 150,
    borderRadius: 100
  }
});
