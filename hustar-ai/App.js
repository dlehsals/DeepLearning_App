import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import ProductScreen from './ProductScreen';
import { StatusBar } from 'expo-status-bar';
import { StylesSheet, Text, View, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={MainScreen} />
        <Stack.Screen name="view" component={ProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
