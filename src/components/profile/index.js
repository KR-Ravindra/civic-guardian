import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import MapView, {Marker } from 'react-native-web-maps';


let MapViewmob,MarkerMob;

if (Platform.OS === 'android') {
  // Import MapView and Marker for mobile
  MapViewmob = require('react-native-maps').default;
  MarkerMob = require('react-native-maps').Marker;
}

import loadGoogleMapsAPI from './webMapComponent'; // Import the function
import MapStyle from './mapStyle';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        // latitude: 34.0522,   // Latitude for Los Angeles
        // longitude: -118.2437, // Longitude for Los Angeles
        latitude: 33.8704,   // Latitude for fullerton
        longitude: -117.9242, // Longitude for fullerton
        latitudeDelta: 0.1, // Adjust this value for zoom level
        longitudeDelta: 0.1,  // Adjust this value for zoom level
      },
      markers: [
        {
          latlng: { latitude: 34.0522, longitude: -118.2437 },
          title: 'Marker Title 1',
          description: 'Marker Description 1',
        },
        {
          latlng: { latitude: 34.0634, longitude: -118.3581 },
          title: 'Marker Title 2',
          description: 'Marker Description 2',
        },
        {
          latlng: { latitude: 34.0522, longitude: -118.2437 },
          title: 'Marker Title 3',
          description: 'Marker Description 3',
        },
        // Add more markers as needed
      ],
      googleMapsLoaded: false,
    };
  }

  onRegionChange(region) {
    console.log('onRegionChange');
    this.setState({ region });
  }

  componentDidMount() {
    // Load Google Maps API and initialize the map
    if (Platform.OS === 'web') {
      loadGoogleMapsAPI(() => {
        this.setState({ googleMapsLoaded: true });
      });
    }
  }

  render() {
    const { googleMapsLoaded } = this.state;

    return (
      <View style={styles.container}>
        {googleMapsLoaded && Platform.OS === 'web' ? ( // Conditional rendering based on API load
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChange={(region) => this.onRegionChange(region)}
            customMapStyle={MapStyle}
          />
        ) : Platform.OS === 'android' ? (
          <MapViewmob
            style={styles.map}
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChange={(region) => this.onRegionChange(region)}
            customMapStyle={MapStyle}
          >
            {this.state.markers.map((marker, index) => (
              <MarkerMob
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapViewmob>
        ) : (
          <Text>LOADING....</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});