import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Animated, SafeAreaView, StatusBar} from 'react-native';
import { Button } from "react-native-paper";
import SearchBar from "../components/EncyclopediaSearchBar"
import EncyclopediaSearchComponent from "../components/EncyclopediaSearchBar";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function EncyclopediaSearchScreen(props: Props) {
  const { navigation } = props;
  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const [searchedTerm, setSearchedTerm] = useState('');
  const clampedScroll = Animated.diffClamp(
      Animated.add(
          scrollYValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          new Animated.Value(0),
      ),
      0,
      50,
  )

  return (
    <View style={styles.container}>
      <EncyclopediaSearchComponent navigation = {navigation} searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} clampedScroll={clampedScroll} ></EncyclopediaSearchComponent>
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
  buttonText: {
    color: "white"
  },
  innerButton: {
    padding: 10
  },
  button: {
    borderRadius: 50
  }
});
