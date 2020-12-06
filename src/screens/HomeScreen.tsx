import React, {useEffect, useRef, useState} from 'react';
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync} from '../utils/Notifications';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAllPlants,
  getIndividualPlant,
  getMatchingPlants,
  setEditedPlant,
  setCreatedPlant,
  setDeletedPlant,
} from '../../store/plantgroup/actions';

import {Colors, FAB, Headline, Text, Searchbar} from 'react-native-paper';
import {
  Button,
  StyleSheet,
  Platform,
  FlatList,
  View,
  Dimensions,
  Vibration,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import CreatePlantModal from '../components/CreatePlantModal';
import {RootState} from '../../store/store';

// declare types for your props here
interface Props {
  navigation: any;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen(props: Props) {
  const {navigation} = props;
  const notificationListener = useRef(null);

  // local state
  const [searchQuery, setSearchQuery] = useState('');
  const [submit, setSubmit] = useState(false);
  const [displayCreatePlantModal, setDisplayCreatePlantModal] = useState(false);
  const username = useSelector((state: RootState) => state.session.username);
  const userID = useSelector((state: RootState) => state.session.userID);
  const plants = useSelector((state: RootState) => state.plantgroup.plants);
  const plant_id = useSelector((state: RootState) => state.plantgroup.plant_id);
  const editedPlant = useSelector((state: RootState) => state.plantgroup.editedPlant);
  const createdPlant = useSelector((state: RootState) => state.plantgroup.createdPlant);
  const deletedPlant = useSelector((state: RootState) => state.plantgroup.deletedPlant);

  const dispatch = useDispatch();
  const onChangeSearch = (query: string) => {
    if (query.length == 0) {
      setSubmit(false);
      dispatch(getAllPlants(username));
    }
    setSearchQuery(query);
  };

  function queryTemporarySearch() {
    setSubmit(true);
    console.log("searching plants");
    dispatch(getMatchingPlants(searchQuery, username));
  }

  // Use Effect for initial mounting of application
  useEffect(() => {
    (async () => {
      // Get the expo token that identifies this device for notifs
      await registerForPushNotificationsAsync();

      // Vibrate when receiving incoming notifications
      notificationListener.current = Notifications.addNotificationReceivedListener(notif => {
        Vibration.vibrate();
      });

      dispatch(getAllPlants(username));
    })();
  }, []);

  useEffect(() => {
    if (!submit) {
      console.log("use effect that listens to changes to plants array")
      dispatch(getAllPlants(username));
    }
  }, [JSON.stringify(plants)]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {plants && plants.length === 0 ? (
            <Headline style={styles.noPlantsText}>
              Oh no, you don't have any plants yet! Tap the plus button below to get started.
            </Headline>
          ) : (
            <Searchbar
              keyboardType="ascii-capable"
              style={styles.searchBar}
              placeholder="Search my plants"
              onChangeText={onChangeSearch}
              onSubmitEditing={() => queryTemporarySearch()}
              value={searchQuery}
            />
          )}
          <FlatList
            numColumns={2}
            columnWrapperStyle={styles.displayWrapper}
            keyExtractor={item => item.url.split('/')[5]}
            data={plants}
            renderItem={({item}) => (
              <TouchableHighlight
                key={item.key}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => {
                  let plantID = parseInt(item.url.split('/')[5]);
                  dispatch(getIndividualPlant(plantID));
                  navigation.navigate('PlantProfile', {
                    plantID: plantID,
                  });
                }}
              >
                <View>
                  <Image style={styles.item} source={{uri: item.photo}} />
                  <Text style={{alignSelf: 'center'}}>
                    {item.nickname && item.nickname.length > 19
                      ? item.nickname.substring(0, 18) + '...'
                      : item.nickname}
                  </Text>
                  <Text style={{alignSelf: 'center'}}>
                    {item.plant_name && item.plant_name.length > 19
                      ? item.plant_name.substring(0, 18) + '...'
                      : item.plant_name}
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

// use these values when doing width and height of components or containers to maintain consistent sizing across different iphone screens
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchBar: {
    borderColor: Colors.grey300,
    backgroundColor: Colors.grey50,
    borderWidth: 2,
    borderRadius: 30,
    shadowOpacity: 0,
    marginTop: 20,
    width: windowWidth * 0.85,
    height: windowHeight * 0.06,
  },
  item: {
    width: 143,
    height: 142.93,
    borderRadius: 30,
  },

  displayWrapper: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.31,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  fab: {
    backgroundColor: Colors.lightGreen900,
    alignSelf: 'flex-end',
    bottom: 30,
    right: windowWidth * 0.1,
  },
  noPlantsText: {
    width: windowWidth * 0.9,
    textAlign: 'center',
    paddingTop: 50,
  },
});
