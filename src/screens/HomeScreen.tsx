import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/Notifications";
import { removeAllNotificationListeners } from "expo-notifications";
import { Searchbar } from "react-native-paper";
import {
  Button,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  View,
  Dimensions,
  Vibration,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView
} from "react-native";

// declare types for your props here
interface Props {
  navigation: any;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

const theme = {
  colors: {
    placeholder: "#BEBEBE",
    text: "#959695"
  }
};

export default function HomeScreen(props: Props) {
  const [loading, setLoading] = useState(true);
  const [plants, setPlant] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    (async () => {
      // Get the expo token that identifies this device for notifs
      registerForPushNotificationsAsync();

      // Vibrate when receiving incoming notifications
      notificationListener.current = Notifications.addNotificationReceivedListener(
        notif => {
          Vibration.vibrate();
          console.log(notif);
        }
      );

      const url = "https://api.randomuser.me/?results=40";
      const response = await fetch(url);
      const data = await response.json();
      setPlant(data.results);
      setLoading(false);
    })();
  }, []);

  const { navigation } = props;
  const notificationListener = useRef(null);

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  if (!plants) {
    return (
      <View>
        <Text>didn't get a plant</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Searchbar
            theme={theme}
            inputStyle={styles.searchBarInput}
            style={styles.searchBar}
            placeholder="Search my plants"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />

          <View style={styles.fixToText}>
            <Button
              title="Sort"
              disabled
              onPress={() => navigation.openDrawer()}
            />
            <Button
              title="Filter"
              disabled
              onPress={() => navigation.openDrawer()}
            />
          </View>

          <FlatList
            numColumns={2}
            columnWrapperStyle={styles.displayWrapper}
            keyExtractor={item => item.login.uuid}
            data={plants}
            renderItem={({ item }) => (
              <TouchableHighlight
                key={item.key}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => alert("Pressed!")}
              >
                <View>
                  <Image
                    style={styles.item}
                    source={{ uri: item.picture.large }}
                  />
                  <Text style={{ alignSelf: "center" }}>{item.name.first}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
          <Button title="Sidebar" onPress={() => navigation.openDrawer()} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  searchBar: {
    borderColor: "grey",
    backgroundColor: "#F2F2F2",
    borderWidth: 2,
    borderRadius: 50,
    marginTop: 20,
    width: windowWidth * 0.8
  },
  searchBarInput: {
    backgroundColor: "#F2F2F2"
  },
  plantPicture: {
    flexDirection: "row",
    padding: 10,
    borderColor: "black",
    width: 143,
    height: 170
  },
  item: {
    width: 143,
    height: 142.93,
    borderRadius: 30
  },
  displayWrapper: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
