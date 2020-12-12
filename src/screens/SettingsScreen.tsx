import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View, Image, Dimensions, PixelRatio, Switch} from 'react-native';
import {
  Text,
  Colors,
  IconButton,
  Button,
  TextInput,
  Headline,
  Title,
  Divider,
  Subheading,
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import {editNotif} from '../../store/session/actions';

// declare types for your props here
interface Props {
  navigation: any;
}

export default function SettingsScreen(props: Props) {
  const {navigation} = props;
  const userID = useSelector((state: RootState) => state.session.userID);
  const username = useSelector((state: RootState) => state.session.username);
  const USDAZone = useSelector((state: RootState) => state.session.USDA_zone);
  const profilePic = useSelector((state: RootState) => state.session.profileURI);
  const receive_water_notif = useSelector((state: RootState) => state.session.receive_water_notif);
  const receive_fertilizing_notif = useSelector(
    (state: RootState) => state.session.receive_fertilizing_notif
  );
  const receive_repot_notif = useSelector((state: RootState) => state.session.receive_repot_notif);
  const dispatch = useDispatch();

  const [waterNotif, setWaterNotif] = useState(receive_water_notif);
  const [repotNotif, setRepotNotif] = useState(receive_repot_notif);
  const [fertilizeNotif, setFertilizeNotif] = useState(receive_fertilizing_notif);

  useEffect(() => {
    dispatch(editNotif(waterNotif, repotNotif, fertilizeNotif, userID));
  }, [waterNotif, repotNotif, fertilizeNotif]);

  function toggleWater() {
    setWaterNotif(toggled => !toggled);
    
  }
  function toggleRepot() {
    setRepotNotif(toggled => !toggled);
   
  }
  function toggleFertilize() {
    setFertilizeNotif(toggled => !toggled);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="pencil"
          color={Colors.lightGreen900}
          onPress={() => navigation.navigate('EditSettingsScreen')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.containerPicture}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: profilePic,
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Headline style={styles.usernameStyle}>{username}</Headline>
          <Title style={styles.zoneStyle}>USDA Zone: {USDAZone ? USDAZone : 'N/A'}</Title>
        </View>
      </View>
      <View>
        <Title style={styles.notificationSettingStyle}> Notifications </Title>
      </View>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.columnStyle}>
            <Text style={styles.optionsStyle}>Watering Reminder</Text>
          </View>
          <View style={styles.columnStyle}>
            <Switch
              style={styles.toggleStyle}
              trackColor={{false: '#767577', true: '#34c759'}}
              thumbColor={waterNotif ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleWater}
              value={waterNotif}
            />
          </View>
          <Divider />
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.columnStyle}>
            <Text style={styles.optionsStyle}>Repotting Reminder</Text>
          </View>
          <View style={styles.columnStyle}>
            <Switch
              style={styles.toggleStyle}
              trackColor={{false: '#767577', true: '#34c759'}}
              thumbColor={repotNotif ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleRepot}
              value={repotNotif}
            />
          </View>
          <Divider />
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.columnStyle}>
            <Text style={styles.optionsStyle}>Fertilizing Reminder</Text>
          </View>
          <View style={styles.columnStyle}>
            <Switch
              style={styles.toggleStyle}
              trackColor={{false: '#767577', true: '#34c759'}}
              thumbColor={fertilizeNotif ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleFertilize}
              value={fertilizeNotif}
            />
          </View>
          <Divider />
        </View>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderStyle: "solid",
    width: windowWidth * 0.85,
    height: windowHeight * 0.047,
  },
  containerPicture: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 10,
    height: windowHeight * 0.23,
    marginLeft: 20,
  },

  containerTest: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 25,
    justifyContent: 'space-between',
    textAlignVertical: 'top',
    height: windowHeight * 0.08,
  },

  notificationSettingStyle: {
    marginLeft: 15,
    lineHeight: 30,
    paddingTop: 20,
  },

  optionsStyle: {
    marginLeft: 30,
    lineHeight: 30,
  },
  notifStyle: {
    //justifyContent: 'center',
    //right: windowWidth * 0.16,
  },
  profilePicture: {
    flexDirection: 'column',
    borderColor: Colors.grey400,
    borderWidth: 2,
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  textTitle: {
    textAlign: 'center',
    marginLeft: 160,
  },

  toggleStyle: {
    marginLeft: 80,
    transform: [{scale: 0.8}],
  },

  usernameStyle: {
    alignContent: 'center',
    top: '30%',
    marginLeft: 10,
    paddingBottom: 3,
  },

  zoneStyle: {
    alignContent: 'center',
    top: '30%',
    marginLeft: 10,
    paddingBottom: 3,
  },

  columnStyle: {
    flex: 1,
    flexDirection: 'column',
  },
});
