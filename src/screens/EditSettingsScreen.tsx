import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {Text, IconButton, Colors, Button, TextInput} from 'react-native-paper';
import SetZoneModal from '../components/SetZoneModal';
import * as ImagePicker from 'expo-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import {editUserProfile} from '../../store/session/actions';

// declare types for your props here
interface Props {
  navigation: any;
}

const theme = {
  colors: {
    placeholder: '#BEBEBE',
    text: 'black',
  },
};

export default function EditSettingsScreen(props: Props) {
  const {navigation} = props;
  const USDAZone = useSelector((state: RootState) => state.session.USDA_zone);
  const username = useSelector((state: RootState) => state.session.username);
  const userID = useSelector((state: RootState) => state.session.userID);
  const profilePic = useSelector((state: RootState) => state.session.profileURI);

  const [image, setImage] = useState(null);
  const [textZone, setTextZone] = useState(USDAZone);
  const [textName, setTextName] = useState(username);
  const [showModal, setShowModal] = useState(false);
  const [textErr, setTextErr] = useState(false);

  const dispatch = useDispatch();

  // check if user has given permission to access image gallery from phone
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // method that gets image from the phone
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function onSubmit() {
    if (textName && textName.length < 3) {
      setTextErr(true);
      return;
    }
    dispatch(
      editUserProfile(
        textName ? textName : username, 
        textZone, 
        image ? image : profilePic, 
        userID)
    );
    setTextErr(false);
    navigation.goBack();
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Cancel',
      headerRight: () => (
        <IconButton icon="check-bold" color={Colors.lightGreen900} onPress={onSubmit} />
      ),
    });
  }, [navigation, textName, textZone, image]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <View style={styles.photoContainer}>
            {(image && <Image style={styles.photo} source={{uri: image}} />) ||
              (!image && <Image style={styles.photo} source={{uri: profilePic}} />)}
            <Button icon="camera" color={Colors.lightGreen300} onPress={pickImage}>
              Change Photo
            </Button>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              mode='outlined'
              label='Username'
              keyboardType='ascii-capable'
              maxLength={13}
              theme={{ colors: { primary: Colors.lightGreen300 } }}
              placeholder={username}
              value={textName}
              onChangeText={textName => setTextName(textName)}
            />
            <View style={{ paddingTop: 10 }}>
              <Button
                icon={showModal ? 'chevron-up' : 'chevron-down'}
                mode='outlined'
                color={Colors.grey600}
                style={styles.zoneButton}
                contentStyle={{ justifyContent: 'flex-start' }}
                onPress={() => setShowModal(true)}
              >
                <Text style={{ color: Colors.grey600 }}>
                  {'USDA Zone: ' + textZone}
                </Text>
              </Button>
            </View>
            <SetZoneModal
              displayModal={showModal}
              textZone={textZone}
              setTextZone={setTextZone}
              setShowModal={setShowModal}
              onExit={() => setShowModal(false)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 30,
  },
  photoContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: Colors.grey400,
    borderWidth: 1,
  },
  formContainer: {
    paddingTop: 10,
    width: windowWidth * 0.85,
  },
  form: {
    paddingTop: 10,
  },
  zoneButton: {
    padding: 5,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: Colors.grey400,
    backgroundColor: Colors.grey50
  }
});
