import React, { useEffect, useState } from "react";
import { Image,StyleSheet, Text, View} from "react-native";
import logo from '../../assets/logo.png';
import { Button } from 'react-native-paper';
import {signInWithGoogleAsync} from "../utils/GoogleOAuth";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function LandingScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Image style={{width: '90%', height: undefined, aspectRatio: 700 / 161}} source={logo}/>
      </View>
      <View style={styles.signUp}>
        <Button mode="contained" color="#ECF1E6" style={[styles.wideRounded,{borderWidth: 2,borderColor:"#758764"}]}
            onPress={()=>{signInWithGoogleAsync()}}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </Button>
      </View>
      <View style={styles.login}>
        <Button color="#FFFFFF" mode="contained" style={styles.wideRounded} onPress={()=>{signInWithGoogleAsync()}}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wideRounded:{
    width:'85%', borderRadius:20
  },
  loginButtonText:{
    color:"#758764",fontWeight:"bold",fontSize:17,letterSpacing: 1.28
  },
  container: {
    flex: 1, backgroundColor: "#ECF1E6"
  },
  titleBox: {
    position: 'absolute',
    width: '100%',
    left: 5,
    top: 274,
    alignItems: 'center',
  },
  signUp: {
    position: 'absolute',
    left: 18,
    right: 17,
    //top: `calc(50% - 16px/2)`,
    top: '74%',
    display: 'flex',
    alignItems: 'center',
  },
  login: {
    position: 'absolute',
    left: 18,
    right: 17,
    //top: `calc(50% - 16px/2)`,
    top: '82%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  
});
