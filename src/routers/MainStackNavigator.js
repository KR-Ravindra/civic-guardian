import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';

const Stack = createStackNavigator();

export const MainStackNavigator = ({}) => {
  return (
      <Stack.Navigator
          initialRouteName={'Tab'}
          header={null}
          headerMode='none'
          mode={'card'}
      >
          <Stack.Screen
              name='Tab'
              component={TabNavigator}
          />
      </Stack.Navigator>
  )}