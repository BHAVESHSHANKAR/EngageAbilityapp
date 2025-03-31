import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './screens/HomePage';
import CareTakerSig from './screens/CareTakerSig';
import StartActivities from './screens/StartActivities';
import DeafandDumb from './screens/DeafandDumb';
import MentalDisability from './screens/MentalDisability';  
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="CareTaker" component={CareTakerSig} options={{headerShown:false}} />
        <Stack.Screen name="Activities" component={StartActivities} options={{headerShown:false}}/>
        <Stack.Screen name="DeafandDumb" component={DeafandDumb} options={{headerShown:false}}/>
        <Stack.Screen name="MentalDisability" component={MentalDisability} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
