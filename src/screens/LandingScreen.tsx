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
      <View style={styles.titleBox}>
        <Text style={styles.loadTitle}>PlantBuds</Text>
      </View>
      
      <View style={styles.signUpText}>
        <Button
          title="Signup"
          color="#758764"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
      <View style={styles.loginText}>
        <Button
          title="login"
          color="#758764"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF1E6",
    //alignItems: "center",
    //justifyContent: "center"
  },
  titleBox: {
    position: 'absolute',
    width: '100%',
    height: 77,
    left: 5,
    top: 274,
    alignItems: 'center',
  },
  loadTitle: {
    //fontFamily: 'Ribeye Marrow',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 64,
    lineHeight: 87,
    letterSpacing: 0.05,
    color: '#758764',
  
  },
  signUp: {
    /* ↳ ☁️ Elevation */
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '0%',
    borderRadius: 4,
  },
  signUpText: {

    position: 'absolute',
    left: 18,
    right: 17,
    //top: `calc(50% - 16px/2)`,
    top: '75%',

    //fontFamily: Roboto;
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 16,
    /* identical to box height, or 89% */
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 1.25,
    textTransform: 'uppercase',


  },
  loginText: {
    position: 'absolute',
    left: 18,
    right: 17,
    //top: `calc(50% - 16px/2)`,
    top: '85%',

    //fontFamily: Roboto;
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 16,
    /* identical to box height, or 89% */
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  },
  
});
