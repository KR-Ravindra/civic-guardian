import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, Button } from 'react-native';
import ErrorBoundary from '../errorBoundry';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ShowMapScreen from './ShowMapComponent';


const MainMapScreen = () => {
    const stateOfMap = {
      "origin": {
        "latitude": 33.8704,
        "longitude": -117.9242
      },
      "destination": {
        "latitude": 34.01,
        "longitude": -118.11
      },
      "region": {
        // latitude: 34.0522,   // Latitude for Los Angeles
        // longitude: -118.2437, // Longitude for Los Angeles
        "latitude": 33.8704, // Latitude for fullerton
        "longitude": -117.9242, // Longitude for fullerton
        "latitudeDelta": 0.1, // Adjust this value for zoom level
        "longitudeDelta": 0.1, // Adjust this value for zoom level
      }

    };
    
    return (
        <View style={styles.container}>
        <ErrorBoundary>
          <View style={styles.container}>
          <ShowMapScreen pokemon={"pikachu"}></ShowMapScreen>
          <TouchableOpacity style={styles.button} onPress={() => {console.log("Hello")}}><Text>Generate Waypoints</Text></TouchableOpacity>
          </View>
        </ErrorBoundary>
        </View>
  );
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button:{
    marginTop: 60, 
    left: 20, 
    backgroundColor: 'Black',
    height: 40, 
    width: 150
  }
});

export default MainMapScreen;