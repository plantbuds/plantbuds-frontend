import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from '../screens/LandingScreen'

const Stack = createStackNavigator();
const OnboardingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Landing" component={LandingScreen}/>
        </Stack.Navigator>
    )
}
const RootNavigator = () => {
    return OnboardingStack(); 
}

export default RootNavigator;