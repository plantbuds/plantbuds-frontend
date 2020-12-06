import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Dimensions,
  StyleSheet
} from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/session/actions";
// declare types for your props here
interface Props {
  navigation: any;
}

export default function Sidebar(props: Props) {
  const { navigation } = props;
  const dispatch = useDispatch(); 
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem style={styles.signoutBtn} label="Sign Out" onPress={() => {
        dispatch(logoutUser());
      }}/>
    </DrawerContentScrollView>
  );
}

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  signoutBtn: {
    top: windowHeight * 0.63
  }
})
