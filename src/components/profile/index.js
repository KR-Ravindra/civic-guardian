import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, Button } from 'react-native';
import ErrorBoundary from '../errorBoundry';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ShowMapScreen from './ShowMapComponent';
import loadGoogleMapsAPI from './webMapComponent';


const MainMapScreen = () => {
    const [region, setRegion] = useState({
      latitude: 33.8704, 
      longitude: -117.9242, 
      latitudeDelta: 0.1, 
      longitudeDelta: 0.1, 
    }) 
    const [origin, setOrigin] = useState({ latitude: 33.8704, longitude: -117.9242 }) // Latitude and longitude for the origin marker
    const [destination, setDestination] = useState({ latitude: 34.0100, longitude: -118.1100 }) // Latitude and longitude for the destination marker

    const [waypoints, setWaypoints] = useState([
      {
        coordinate: { latitude: 33.8704, longitude: -117.9242 ,  latitudeDelta: 0.1, longitudeDelta: 0.1},
        title: 'Marker Title 1',
        description: 'Marker Description 1',
      },
      {
        coordinate: { latitude: 33.8750, longitude: -117.9260,latitudeDelta: 0.1, longitudeDelta: 0.1,  },
        title: 'Marker Title 2',
        description: 'Marker Description 2',
      },
      {
        coordinate: { latitude: 33.8650, longitude: -117.9280, latitudeDelta: 0.1, longitudeDelta: 0.1, },
        title: 'Marker Title 3',
        description: 'Marker Description 3',
      },
      {
        coordinate: { latitude: 33.8720, longitude: -117.9210 ,latitudeDelta: 0.1, longitudeDelta: 0.1, },
        title: 'Marker Title 4',
        description: 'Marker Description 4',
      },
      {
        coordinate: { latitude: 33.8690, longitude: -117.9230,latitudeDelta: 0.1, longitudeDelta: 0.1,  },
        title: 'Marker Title 5',
        description: 'Marker Description 5',
      },

    ])

    
    return (
        <View style={styles.container}>
        <ErrorBoundary>
          <View style={styles.container}>
          <ShowMapScreen region={region} origin={origin} destination={destination} waypoints={waypoints}></ShowMapScreen>
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