import React from "react";

import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";

// declare types for your props here
interface Props {
  navigation: any;
}

export default function Sidebar(props: Props) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
