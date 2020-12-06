import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CalendarScreen from "../screens/CalendarScreen";
import LandingScreen from "../screens/LandingScreen";
import TestScreen from "../screens/TestScreen";
import EditSettingsScreen from "../screens/EditSettingsScreen";
import EditPlantProfileScreen from "../screens/EditPlantProfileScreen";
import PlantProfileScreen from "../screens/PlantProfileScreen";
import EncyclopediaSearchScreen from "../screens/EncyclopediaSearchScreen";
import EncyclopediaProfileScreen from "../screens/EncyclopediaProfileScreen";
import Sidebar from "../components/Sidebar";

// Onboarding stack navigator 
const Stack = createStackNavigator();
const OnboardingNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

// Homepage stack navigator 
const AppStack = createStackNavigator();
const AppNavigator = () => {
  return (
    <AppStack.Navigator headerMode="none" initialRouteName="Home">
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="PlantProfile" component={PlantProfileScreen} />
      <AppStack.Screen name="EditPlantProfile" component={EditPlantProfileScreen} />
    </AppStack.Navigator>
  );
};

const SettingsStack = createStackNavigator(); 
const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator headerMode="none" initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="EditSettingsScreen" component={EditSettingsScreen}/>
    </SettingsStack.Navigator>
  )
}

const EncyclopediaStack = createStackNavigator(); 
const EncyclopediaNavigator = () => {
  return (
    <EncyclopediaStack.Navigator headerMode="none" initialRouteName="Search">
      <EncyclopediaStack.Screen name="Search" component={EncyclopediaSearchScreen}/>
      <EncyclopediaStack.Screen name="EncyclopediaProfile" component={EncyclopediaProfileScreen}/>
    </EncyclopediaStack.Navigator>
  )
}

// Sidebar stack navigator
const AppDrawer = createDrawerNavigator();
const SidebarAppNavigator = () => {
  return (
    <AppDrawer.Navigator drawerContent={props => <Sidebar {...props} />}>
      <AppDrawer.Screen options={{ headerTitle: "PlantBuds" }} name="Home" component={AppNavigator} />
      <AppDrawer.Screen name="Search" component={EncyclopediaNavigator} />
      <AppDrawer.Screen name="Settings" component={SettingsNavigator} />
    </AppDrawer.Navigator>
  );
};

// RootNavigator to navigate between different stacks
const RootNavigator = () => {
  const loggedIn = useSelector((state: RootState) => state.session.loggedIn);
    return (loggedIn) ? SidebarAppNavigator() : OnboardingNavigator();
    //return SidebarAppNavigator();
};

export default RootNavigator;
