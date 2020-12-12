import AsyncStorage from '@react-native-community/async-storage';
import {Value} from 'react-native-reanimated';

const EXPOTOKEN = '@EXPOTOKEN';
const WATERNOTIFID = '@WATERNOTIFID';
const REPOTNOTIFID = '@REPOTNOTIFID';
const FERTILIZENOTIFID = '@FERTILIZENOTIFID';

export async function storeExpoToken(data) {
  try {
    await AsyncStorage.setItem(EXPOTOKEN, data);
  } catch (error) {
    console.error(error);
  }
}

export async function getExpoToken() {
  try {
    let value = await AsyncStorage.getItem(EXPOTOKEN);
    return value;
  } catch (error) {
    console.error(error);
  }
}

export async function clearData() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
}
