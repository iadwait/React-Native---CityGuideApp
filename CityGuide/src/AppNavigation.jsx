import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import CityDetailScreen from './Screens/CityDetailScreen';

export default function AppNavigation() {
    const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="CityDetail" options={{ headerShown: false }} component={CityDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}