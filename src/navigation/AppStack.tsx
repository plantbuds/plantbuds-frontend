import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CalendarScreen from "../screens/CalendarScreen";
import LandingScreen from "../screens/LandingScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import Sidebar from "../components/Sidebar";

// Onboarding stack navigator 
const Stack = createStackNavigator();
const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

// Homepage stack navigator 
const AppStack = createStackNavigator();
const AppNavigator = () => {
  return (
    <AppStack.Navigator headerMode="none" initialRouteName="HomeScreen">
      <AppStack.Screen name="Home" component={HomeScreen} />
    </AppStack.Navigator>
  );
};

// Sidebar stack navigator
const AppDrawer = createDrawerNavigator();
const SidebarAppNavigator = () => {
  return (
    <AppDrawer.Navigator drawerContent={props => <Sidebar {...props} />}>
      <AppDrawer.Screen name="Home" component={AppNavigator} />
      <AppDrawer.Screen name="Settings" component={ProfileScreen} />
    </AppDrawer.Navigator>
  );
};

// RootNavigator to navigate between different stacks
const RootNavigator = () => {
  return SidebarAppNavigator();
  // If you want to work on home page flow/profile settings flow just change 'return OnboardingStack();' to 'return SidebarAppNavigator();'
  //TODO finish session reducer to enable switching from login flow to homepage flow
};

export default RootNavigator;
