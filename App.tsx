import React from "react";
import { Provider } from "react-redux";
import { configureFonts, Colors, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";
import configureStore from "./store/store";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/AppStack";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
    }
    interface Theme {
    }
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme,
    primary: Colors.lightGreen900,
    accent: Colors.lightGreen300,
    background: Colors.grey50,
    surface: Colors.grey100,
    text: Colors.grey600,
    disabled: Colors.grey400,
    placeholder: Colors.grey400,
    backdrop: Colors.grey50,
    error: Colors.red400, 
    onSurface: Colors.grey600, 
    onBackground: Colors.grey600, 
    notification: Colors.lightGreen900,
  },
  fonts: configureFonts(),
};

export const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.lightGreen50} />
            <RootNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
