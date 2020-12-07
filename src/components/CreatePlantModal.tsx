import React, {useEffect, useState, useRef} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  GestureResponderEvent,
  ScrollView,
} from 'react-native';
import {
  Headline,
  Colors,
  Title,
  Text,
  Button,
  TextInput,
  IconButton,
  DefaultTheme,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import {createPlant, getAllPlants, setCreatedPlant} from '../../store/plantgroup/actions';
import {State} from 'react-native-gesture-handler';

// declare types for your props here
interface Props {
  navigation: any;
  displayModal: boolean;
  setDisplayCreatePlantModal: (val: boolean) => void;
}

export default function CreatePlantProfileModal(props: Props) {
  const {navigation, displayModal, setDisplayCreatePlantModal} = props;
  const defaultPhoto = 'http://i.imgur.com/4os1ZjY.png';
  const [image, setImage] = useState(defaultPhoto);
  const [textSciName, setTextSciName] = useState('');
  const [textNickname, setTextNickname] = useState('');
  const [textNotes, setTextNotes] = useState('');
  const [textErr, setTextErr] = useState(false);
  const [textSciErr, setTextSciErr] = useState(false);
  const username = useSelector((state: RootState) => state.session.username);
  const userID = useSelector((state: RootState) => state.session.userID);
  let plant_id = useSelector((state: RootState) => state.plantgroup.plant_id);
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
    dispatch(setCreatedPlant(true));
    dispatch(
      createPlant(
        userID,
        image,
        textSciName ? textSciName : 'Species',
        textNickname ? textNickname : 'My Plant',
        textNotes
      )
    );
    clearFields();
    dispatch(getAllPlants(username));
    navigation.navigate('PlantProfile');
    setDisplayCreatePlantModal(false);
  }

  function clearFields() {
    setTextSciErr(false);
    setTextSciName('');
    setTextNickname('');
    setTextNotes('');
    setImage(defaultPhoto);
  }

  return (
    <Modal animationType="slide" presentationStyle={'pageSheet'} visible={displayModal}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.topContainer}>
            <IconButton
              icon="close"
              size={30}
              color={Colors.grey400}
              onPress={() => {
                clearFields();
                setDisplayCreatePlantModal(false);
              }}
            />
            <Title style={{paddingTop: 10}}>Add a Plant</Title>
            <IconButton
              icon="check-bold"
              color={Colors.lightGreen900}
              size={30}
              onPress={onSubmit}
            />
          </View>
          <KeyboardAvoidingView behavior="position" enabled={true}>
            <View style={styles.photoContainer}>
              {(image && <Image style={styles.photo} source={{uri: image}} />) ||
                (!image && <Image style={styles.photo} source={{uri: defaultPhoto}} />)}
              <Button icon="camera" color={Colors.lightGreen300} onPress={pickImage}>
                Change Photo
              </Button>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                mode="outlined"
                label="Nickname"
                theme={{colors: {primary: Colors.lightGreen300}}}
                style={styles.form}
                keyboardType="ascii-capable"
                maxLength={22}
                placeholder="e.g. My Plant"
                value={textNickname}
                onChangeText={textNickname => setTextNickname(textNickname)}
              />
              <TextInput
                mode="outlined"
                label="Species"
                theme={{colors: {primary: Colors.lightGreen300}}}
                style={styles.form}
                keyboardType="ascii-capable"
                maxLength={26}
                placeholder="e.g. Aloe vera"
                value={textSciName}
                onChangeText={textSciName => setTextSciName(textSciName)}
              />
              <TextInput
                mode="outlined"
                label="Notes"
                multiline={true}
                theme={{colors: {primary: Colors.lightGreen300}}}
                dense={true}
                style={{...styles.form, height: 100, paddingVertical: 0}}
                keyboardType="ascii-capable"
                placeholder="e.g. Always keep in partial shade"
                value={textNotes}
                onChangeText={textNotes => setTextNotes(textNotes)}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  modalContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth,
    paddingTop: 10,
    zIndex: 2,
    backgroundColor: 'white',
  },

  photoContainer: {
    paddingTop: 15,
    alignItems: 'center',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: Colors.grey400,
    borderWidth: 1,
  },

  formContainer: {
    width: windowWidth * 0.85,
  },
  form: {
    paddingTop: 10,
  },
});
