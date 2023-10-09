import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import MainScreen from '../components/mainScreen';
import SplitScreen from '../components/splitScreen';
import NewSplitScreen from '../components/newSplitScreen'
import MainMapScreen from '../components/map/index';
import MapScreen from  '../components/map/ShowMapComponent';

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
     <Stack.Screen
      name='SplitScreen'
      component={SplitScreen}
    />
     <Stack.Screen
      name='NewSplitScreen'
      component={NewSplitScreen}
    />
    <Stack.Screen
      name='MapScreen'
      component={MapScreen}

    //   component={(props) => <MapScreen {...props} navigation={props.navigation} />}
    />
     <Stack.Screen
      name='MainMapScreen'
      component={MainMapScreen}

    //   component={(props) => <MainMapScreen {...props} navigation={props.navigation} />}
    />

  </Stack.Navigator>
  )}