import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import MainScreen from '../components/mainScreen';

const Stack = createStackNavigator();

export const MainStackNavigator = ({}) => {
  return (
    <Stack.Navigator
    initialRouteName='Main'
    headerMode='none'
    mode='card'
  >
    <Stack.Screen
      name='Main'
      component={MainScreen}
    />
    <Stack.Screen
      name='Tab'
      component={TabNavigator}
    />
  </Stack.Navigator>
  )}