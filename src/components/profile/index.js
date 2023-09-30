import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, Button } from 'react-native';
import ErrorBoundary from '../errorBoundry';
import ShowMapScreen from './ShowMapComponent';
import getHubs from './GetHubs';

const MainMapScreen = () => {
    const newMarkers = [
      {
        latlng: {
          latitude: 33.8704,
          longitude: -117.9242,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 1",
        description: "Marker Description 1",
      },
      {
        latlng: {
          latitude: 33.875,
          longitude: -117.926,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 2",
        description: "Marker Description 2",
      },
      {
        latlng: {
          latitude: 33.865,
          longitude: -117.928,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 3",
        description: "Marker Description 3",
      },
      {
        latlng: {
          latitude: 33.872,
          longitude: -117.921,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 4",
        description: "Marker Description 4",
      },
      {
        latlng: {
          latitude: 33.869,
          longitude: -117.923,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 5",
        description: "Marker Description 5",
      },
    ];
    const origin = { latitude: 33.8704, longitude: -117.9242 };
    const destination = { latitude: 33.869, longitude: -117.923 };
    const [stateOfMap, setStateOfMap] = useState({
      coords: [],
      region: {
        latitude: 33.8704, // Latitude for fullerton
        longitude: -117.9242, // Longitude for fullerton
        latitudeDelta: 0.01, // Adjust this value for zoom level
        longitudeDelta: 0.01, // Adjust this value for zoom level
      },
      origin: origin, // Latitude and longitude for the origin marker
      destination: destination, // Latitude and longitude for the destination marker
      markers: [],
      googleMapsLoaded: false,
      plot: {
        draw: false,
        origin: { latitude: origin.latitude, longitude: origin.longitude },
        destination: { latitude: destination.latitude, longitude: destination.longitude },
        waypoint: {latitude: 33.875, longitude: -117.926}
      }
    })
    
    return (
        <View style={styles.container}>
        <ErrorBoundary>
          <View style={styles.container}>
          <ShowMapScreen 
            stateOfMap={stateOfMap} 
            onPressMarkers={() => { setStateOfMap({...stateOfMap,markers: newMarkers, googleMapsLoaded: true} );console.log("Modified state of map to ", stateOfMap)}}
            onPressPlotter={() => { setStateOfMap({...stateOfMap,markers: getHubs(stateOfMap.region), googleMapsLoaded: true, plot: true} );console.log("Modified state of map to ", stateOfMap)}}
             ></ShowMapScreen>
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