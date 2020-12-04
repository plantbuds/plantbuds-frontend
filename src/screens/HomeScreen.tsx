import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/Notifications";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPlants,
  getIndividualPlant,
  createPlant,
  setEditedPlant,
  setCreatedPlant,
  setDeletedPlant
} from "../../store/plantgroup/actions";

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
import CreatePlantModal from "../components/CreatePlantModal";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [displayCreatePlantModal, setDisplayCreatePlantModal] = useState(false);
  const username = useSelector((state: RootState) => state.session.username);
  const userID = useSelector((state: RootState) => state.session.userID);
  const plants = useSelector((state: RootState) => state.plantgroup.plants);
  const plant_id = useSelector((state: RootState) => state.plantgroup.plant_id);
  const editedPlant = useSelector(
    (state: RootState) => state.plantgroup.editedPlant
  );
  const createdPlant = useSelector(
    (state: RootState) => state.plantgroup.createdPlant
  );
  const deletedPlant = useSelector(
    (state: RootState) => state.plantgroup.deletedPlant
  );

  const dispatch = useDispatch();
  const onChangeSearch = (query: string) => setSearchQuery(query);

  // Use Effect for initial mounting of application
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
    })();
  }, []);

  // Listening for updates to plants array
  useEffect(() => {
    console.log("use effect with dp array in homescreen");
    if (createdPlant || editedPlant || deletedPlant) {
      dispatch(getAllPlants(username));
    }

    dispatch(setEditedPlant(false));
    dispatch(setCreatedPlant(false));
    dispatch(setDeletedPlant(false));
  }, [createdPlant, editedPlant, deletedPlant]);


  const { navigation } = props;
  const notificationListener = useRef(null);

  if (plants.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPlantsText}>
          Looks like you do not have any plants. Add a plant to get started!
        </Text>
        <FAB
          style={styles.fabInitial}
          color="white"
          icon="plus"
          onPress={() => {
            dispatch(createPlant(userID));
            setDisplayCreatePlantModal(true);
          }}
        />
        <CreatePlantModal
          setDisplayCreatePlantModal={setDisplayCreatePlantModal}
          navigation={navigation}
          displayModal={displayCreatePlantModal}
        />
      </View>
    );
  } else {
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
                    let plantID = parseInt(item.url.split("/")[5]);
                    console.log(
                      "calling get individual plant from home screen"
                    );
                    dispatch(getIndividualPlant(plantID));
                    navigation.navigate("PlantProfile", {
                      plantID: plantID
                    });
                  }}
                >
                  <View>
                    <Image style={styles.item} source={{ uri: item.photo }} />
                    <Text style={{ alignSelf: "center" }}>
                      {item.nickname && item.nickname.length > 19
                        ? item.nickname.substring(0, 18) + "..."
                        : item.nickname}
                    </Text>
                    <Text style={{ alignSelf: "center" }}>
                      {item.plantname && item.plant_name.length > 19
                        ? item.plant_name.substring(0, 18) + "..."
                        : item.plant_name}
                    </Text>
                    <Text style={{ alignSelf: "center" }}>
                      {item.url.split("/")[5]}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            />
            <FAB
              style={styles.fab}
              color="white"
              icon="plus"
              onPress={() => {
                dispatch(createPlant(userID));
                setDisplayCreatePlantModal(true);
              }}
            />
            <CreatePlantModal
              setDisplayCreatePlantModal={setDisplayCreatePlantModal}
              navigation={navigation}
              displayModal={displayCreatePlantModal}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
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
  },
  fabInitial: {
    backgroundColor: "#CBE4B1",
    alignSelf: "flex-end",
    right: windowWidth * 0.1,
    top: windowHeight * 0.3
  },
  noPlantsText: {
    width: windowWidth * 0.9,
    textAlign: "center",
    fontSize: 18
  }
});
