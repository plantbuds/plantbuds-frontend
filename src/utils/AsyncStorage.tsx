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

export async function storeWaterNotifID(data) {
  try {
    await AsyncStorage.setItem(WATERNOTIFID, data);
    return Value;
  } catch (error) {
    console.error(error);
  }
}

export async function getWaterNotifID() {
  try {
    let value = await AsyncStorage.getItem(WATERNOTIFID);
    return value;
  } catch (error) {
    console.error(error);
  }
}

export async function storeRepotNotifID(data) {
  try {
    await AsyncStorage.setItem(REPOTNOTIFID, data);
    return Value;
  } catch (error) {
    console.error(error);
  }
}

export async function getRepotNotifID() {
  try {
    let value = await AsyncStorage.getItem(REPOTNOTIFID);
    return value;
  } catch (error) {
    console.error(error);
  }
}

export async function storeFertilizeNotifID(data) {
  try {
    await AsyncStorage.setItem(FERTILIZENOTIFID, data);
    return Value;
  } catch (error) {
    console.error(error);
  }
}

export async function getFertilizeNotifID() {
  try {
    let value = await AsyncStorage.getItem(FERTILIZENOTIFID);
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
