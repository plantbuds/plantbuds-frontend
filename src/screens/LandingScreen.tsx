import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/logo.png";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, createUser } from "../../store/session/actions";
import { Button } from "react-native-paper";
import {
  signInWithGoogleAsync,
  signUpWithGoogleAsync
} from "../utils/GoogleOAuth";

interface Props {
  navigation: any;
}

export default function LandingScreen(props: Props) {
  const { navigation } = props;
  const loggedIn = useSelector((state: RootState) => state.session.loggedIn);
  const username = useSelector((state: RootState) => state.session.username);
  const profileURI = useSelector(
    (state: RootState) => state.session.profileURI
  );
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    const accessToken = await signInWithGoogleAsync();
    if (typeof accessToken === "string") {
      dispatch(loginUser(accessToken));
    }
  };

  const signUpWithGoogle = async () => {
    const tokens = await signUpWithGoogleAsync();
    if (typeof tokens[0] === "string" && typeof tokens[1] === "string") {
        dispatch(createUser(tokens[0], tokens[1]));
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigation.navigate("Home");
    }
  }, [loggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Image
          style={{ width: "90%", height: undefined, aspectRatio: 700 / 161 }}
          source={logo}
        />
      </View>
      <View style={styles.signUp}>
        <Button
          mode="contained"
          color="#ECF1E6"
          style={[
            styles.wideRounded,
            { borderWidth: 2, borderColor: "#758764" }
          ]}
          onPress={() => signUpWithGoogle()}
        >
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </Button>
      </View>
      <View style={styles.login}>
        <Button
          color="#FFFFFF"
          mode="contained"
          style={styles.wideRounded}
          onPress={() => signInWithGoogle()}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wideRounded: {
    width: "85%",
    borderRadius: 20
  },
  loginButtonText: {
    color: "#758764",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1.28
  },
  container: {
    flex: 1,
    backgroundColor: "#ECF1E6"
  },
  titleBox: {
    position: "absolute",
    width: "100%",
    left: 5,
    top: 274,
    alignItems: "center"
  },
  signUp: {
    position: "absolute",
    left: 18,
    right: 17,
    top: "74%",
    display: "flex",
    alignItems: "center"
  },
  login: {
    position: "absolute",
    left: 18,
    right: 17,
    top: "82%",
    display: "flex",
    alignItems: "center",
    textAlign: "center"
  }
});
