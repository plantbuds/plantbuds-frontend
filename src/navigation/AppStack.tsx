import React from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {RootState} from '../../store/store';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Colors} from 'react-native-paper';
import {Image} from 'react-native';
import Sidebar from '../components/Sidebar';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TestScreen from "../screens/TestScreen";
import LandingScreen from '../screens/LandingScreen';
import EditSettingsScreen from '../screens/EditSettingsScreen';
import EditPlantProfileScreen from '../screens/EditPlantProfileScreen';
import PlantProfileScreen from '../screens/PlantProfileScreen';
import EncyclopediaSearchScreen from '../screens/EncyclopediaSearchScreen';
import EncyclopediaProfileScreen from '../screens/EncyclopediaProfileScreen';

// Onboarding stack navigator
const Onboarding = createStackNavigator();
const OnboardingNavigator = () => {
  return (
    <Onboarding.Navigator headerMode="none">
      <Onboarding.Screen name="Landing" component={LandingScreen} />
    </Onboarding.Navigator>
  );
};

// Base navigator
const Home = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Home.Navigator screenOptions={styles.screenOptions}>
      <Home.Screen options={{headerShown: false}} name="Home" component={DrawerNavigator} />

      <Home.Screen
        options={{title: 'Plant Profile'}}
        name="PlantProfile"
        component={PlantProfileScreen}
      />
      <Home.Screen
        options={{title: 'Edit Plant Profile'}}
        name="EditPlantProfile"
        component={EditPlantProfileScreen}
      />

      <Home.Screen options={{headerShown: false}} name="Profile" component={SettingsScreen} />
      <Home.Screen
        options={{title: 'Edit My Profile'}}
        name="EditSettingsScreen"
        component={EditSettingsScreen}
      />

      <Home.Screen
        options={{headerShown: false}}
        name="Encyclopedia"
        component={EncyclopediaSearchScreen}
      />
      <Home.Screen
        options={{title: 'Encyclopedia Entry'}}
        name="EncyclopediaProfile"
        component={EncyclopediaProfileScreen}
      />
    </Home.Navigator>
  );
};

// Navigation navigator (lol)
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawerStyle}
      drawerContentOptions={styles.drawerContentOptions}
      screenOptions={styles.screenOptions}
      drawerContent={props => <Sidebar {...props} />}
    >
      <Drawer.Screen
        options={{headerTitle: props => <HomeTitle {...props} />}}
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen name="Encyclopedia" component={EncyclopediaSearchScreen} />
      <Drawer.Screen options={{title: 'My Profile'}} name="Profile" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

// RootNavigator to navigate between different stacks
const RootNavigator = () => {
  const loggedIn = useSelector((state: RootState) => state.session.loggedIn);
  return loggedIn ? HomeNavigator() : OnboardingNavigator();
};

export default RootNavigator;

// Logo header for homepage
const HomeTitle = (props: any) => {
  return (
    <Image
      style={{resizeMode: 'contain', width: 100, height: 80}}
      source={require('../../assets/logo.png')}
    />
  );
};

// Drawer and header styles
const styles = {
  drawerStyle: {
    backgroundColor: Colors.lightGreen50,
  },
  drawerContentOptions: {
    activeTintColor: Colors.lightGreen900,
    activeBackgroundColor: Colors.lightGreen100,
    inactiveTintColor: Colors.lightGreen900,
  },
  screenOptions: {
    headerStyle: {
      backgroundColor: Colors.lightGreen50,
      borderColor: Colors.white,
    },
    headerTintColor: Colors.lightGreen900,
  },
};
