import React from 'react';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {Colors} from 'react-native-paper';
import {Dimensions, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../store/session/actions';
// declare types for your props here


export default function Sidebar(props: any) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        style={styles.signoutBtn}
        labelStyle={styles.fontStyle}
        label="Sign Out"
        onPress={() => {
          dispatch(logoutUser());
          
        }}
      />
    </DrawerContentScrollView>
  );
}

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  signoutBtn: {
    top: windowHeight * 0.50, //0.63
  },
  fontStyle: {
    color: Colors.lightGreen900,
  },
});
