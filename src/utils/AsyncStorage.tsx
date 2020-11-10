import AsyncStorage from "@react-native-community/async-storage";

const EXPOTOKEN = "@EXPOTOKEN";

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
