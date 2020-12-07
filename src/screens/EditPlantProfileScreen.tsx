import React, { useEffect, useState, useRef } from 'react';
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
import { Text, Colors, IconButton, Button, TextInput, Portal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import DeletePlantModal from '../components/DeletePlantModal';
import { RootState } from '../../store/store';
import { deletePlant, getAllPlants, editPlantProfile } from '../../store/plantgroup/actions';

// declare types for your props here
interface Props {
  navigation: any;
}

export default function EditPlantProfileScreen(props: Props) {
  const { navigation } = props;
  const notes = useSelector((state: RootState) => state.plantgroup.notes);
  const username = useSelector((state: RootState) => state.session.username);
  const plantID = useSelector((state: RootState) => state.plantgroup.plant_id);
  const nickname = useSelector((state: RootState) => state.plantgroup.nickname);
  const photo = useSelector((state: RootState) => state.plantgroup.photo);
  const plant_name = useSelector((state: RootState) => state.plantgroup.plant_name);
  const [image, setImage] = useState(null);
  const [textSciName, setTextSciName] = useState(plant_name);
  const [textNickname, setTextNickname] = useState(nickname);
  const [textNotes, setTextNotes] = useState(notes);
  const [displayDeletePlantModal, setDisplayDeletePlantModal] = useState(false);
  const [textErr, setTextErr] = useState(false);
  const [textSciErr, setTextSciErr] = useState(false);

  const dispatch = useDispatch();

  // check if user has given permission to access image gallery from phone
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
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
    if (textSciName && textSciName.length < 3) {
      setTextSciErr(true);
      return;
    }
    if (textNickname && textNickname.length < 2) {
      setTextErr(true);
      return;
    }
    dispatch(
      editPlantProfile(
        plantID,
        image ? image : photo,
        textSciName ? textSciName : plant_name,
        textNickname ? textNickname : nickname,
        textNotes
      )
    );
    setTextSciErr(false);
    setTextErr(false);
    setTextSciName('');
    setTextNickname('');
    dispatch(getAllPlants(username));
    navigation.navigate('PlantProfile', {
      plantID: plantID,
    });
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Cancel',
      headerRight: () => (
        <IconButton icon="check-bold" color={Colors.lightGreen900} onPress={onSubmit} />
      ),
    });
  }, [navigation, textSciName, textNickname, image, textNotes]);

  return (
    <Portal.Host>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>

            <View style={styles.photoContainer}>
              {(image && <Image style={styles.photo} source={{ uri: image }} />) ||
                (!image && <Image style={styles.photo} source={{ uri: photo }} />)}
              <Button icon="camera" color={Colors.lightGreen300} onPress={pickImage}>
                Change Photo
              </Button>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                mode='outlined'
                label='Nickname'
                theme={{ colors: { primary: Colors.lightGreen300 } }}
                style={styles.form}
                keyboardType='ascii-capable'
                maxLength={22}
                placeholder={nickname}
                value={textNickname}
                onChangeText={textNickname => setTextNickname(textNickname)}
              />
              <TextInput
                mode='outlined'
                label='Species'
                theme={{ colors: { primary: Colors.lightGreen300 } }}
                style={styles.form}
                keyboardType='ascii-capable'
                maxLength={26}
                placeholder={plant_name ? plant_name : 'e.g. Aloe vera'}
                value={textSciName}
                onChangeText={textSciName => setTextSciName(textSciName)}
              />
              <View style={{ paddingTop: 15 }}>
              <TextInput
                mode='flat'
                label='Notes'
                multiline={true}
                theme={{ colors: { primary: Colors.lightGreen300 } }}
                dense={true}
                style={styles.notes}
                keyboardType='ascii-capable'
                placeholder={notes ? notes : 'Add notes'}
                value={textNotes}
                onChangeText={textNotes => setTextNotes(textNotes)}
              />
              </View>
              <Button
                style={styles.deleteButton}
                color={Colors.red400}
                mode="contained"
                onPress={() => setDisplayDeletePlantModal(true)}
              >
                <Text style={{ color: 'white' }}>Delete Plant</Text>
              </Button>
              <DeletePlantModal
                displayModal={displayDeletePlantModal}
                onPress={() => {
                  dispatch(deletePlant(plantID));
                  dispatch(getAllPlants(username));
                  navigation.navigate('Home');
                  setDisplayDeletePlantModal(false);
                }}
                onExit={() => setDisplayDeletePlantModal(false)}
              />
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Portal.Host>
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
    paddingTop: 15,
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
  notes: {
    borderRadius: 1, 
    borderColor: Colors.grey400, 
    backgroundColor: Colors.grey50, 
    height: 100
  },
  deleteButton: {
    alignSelf: 'stretch',
    borderRadius: 40,
    borderWidth: 2,
    padding: 4,
    margin: 30,
  }
});
