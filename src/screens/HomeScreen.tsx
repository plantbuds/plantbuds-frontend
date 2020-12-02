import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/Notifications";
import { useSelector, useDispatch } from "react-redux";
import { getAllPlants } from "../../store/plantgroup/actions";
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

import { FAB } from "react-native-paper";
import { RootState } from "../../store/store";

// declare types for your props here
interface Props {
  navigation: any;
}

const theme = {
  colors: {
    placeholder: "#BEBEBE",
    text: "#959695"
  }
};

export default function HomeScreen(props: Props) {
  // local state
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const username = useSelector((state: RootState) => state.session.username);
  const plants = useSelector((state: RootState) => state.plantgroup.plants);
  
  const dispatch = useDispatch(); 
  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    (async () => {
      // Get the expo token that identifies this device for notifs
      await registerForPushNotificationsAsync();

      // Vibrate when receiving incoming notifications
      notificationListener.current = Notifications.addNotificationReceivedListener(
        notif => {
          Vibration.vibrate();
          console.log(notif);
        }
      );

      dispatch(getAllPlants(username));
      setLoading(false);
    })();
  }, []);

  const { navigation } = props;
  const notificationListener = useRef(null);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (plants.length === 0) {
    return (
      <View>
        <Text>Looks like you do not have any plants! Add a plant to get started!</Text>
        <FAB
            style={styles.fab}
            color="white"
            icon="plus"
            onPress={() => alert("Add Plant")}
          />
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

          <FlatList
            numColumns={2}
            columnWrapperStyle={styles.displayWrapper}
            keyExtractor={item => item.url.split("/")[5]}
            data={plants}
            renderItem={({ item }) => (
              <TouchableHighlight
                key={item.key}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => {
                  navigation.navigate("PlantProfile", {
                    itemName: item.nickname,
                    itemURI: item.photo,
                    //TODO add any other plant information that needs to be passed to the plant profile screen.
                  });
                }}
              >
                <View>
                  <Image
                    style={styles.item}
                    source={{ uri: item.photo }}
                  />
                  <Text style={{ alignSelf: "center" }}>{item.nickname}</Text>
                  <Text style={{ alignSelf: "center" }}>{item.url.split("/")[5]}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
          <FAB
            style={styles.fab}
            color="white"
            icon="plus"
            onPress={() => alert("Add Plant")}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// use these values when doing width and height of components or containers to maintain consistent sizing across different iphone screens
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
    width: windowWidth * 0.85,
    height: windowHeight * 0.06
  },
  searchBarInput: {
    backgroundColor: "#F2F2F2",
    height: windowHeight * 0.05,
    right: windowWidth * 0.03
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
    height: windowHeight * 0.31,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  fab: {
    backgroundColor: "#CBE4B1",
    alignSelf: "flex-end",
    bottom: 30,
    right: windowWidth * 0.1
  }
});
