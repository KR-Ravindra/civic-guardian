import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
// import {MapView,Marker}  from 'react-native-web-maps';
// import {Marker} from 'react-native-web-maps';
// import MapViewDirections from 'react-native-maps-directions';

import loadGoogleMapsAPI from './webMapComponent'; // Import the function
import MapStyle from './mapStyle';
import ErrorBoundary from '../errorBoundry';


let MapViewMob, MarkerMob,MapViewDirectionsMob;

if (Platform.OS === 'android') {
  // Import components for mobile (Android)
  MapViewMob = require('react-native-maps').default;
  MarkerMob = require('react-native-maps').Marker;
  MapViewDirectionsMob = require('react-native-maps-directions').MapViewDirections;
}
let MapView, Marker,MapViewDirections,Polyline;

if (Platform.OS === 'web') {
  // Import components for web
  MapView = require('react-native-web-maps').default;
  Marker = require('react-native-web-maps').default;
  Polyline = require('react-native-web-maps').default;

  // MapViewDirections = require('react-native-maps-directions').MapViewDirections;
}

const apiKey = 'AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E'; //  Google Maps API key

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
      markerPosition: {
        latitude: 33.8704, // Initial latitude for marker
        longitude: -117.9242, // Initial longitude for marker
      },
      origin: { latitude: 33.8704, longitude: -117.9242 }, // Latitude and longitude for the origin marker
      destination: { latitude: 34.0100, longitude: -118.1100 }, // Latitude and longitude for the destination marker
      waypoint : { latitude: 33.9950, longitude: -117.9260 }, // Waypoint marker
  
      markers: [
        {
          latlng: { latitude: 33.8704, longitude: -117.9242 ,  latitudeDelta: 0.1, longitudeDelta: 0.1},
          title: 'Marker Title 1',
          description: 'Marker Description 1',
        },
        {
          latlng: { latitude: 33.8750, longitude: -117.9260,latitudeDelta: 0.1, longitudeDelta: 0.1,  },
          title: 'Marker Title 2',
          description: 'Marker Description 2',
        },
        {
          latlng: { latitude: 33.8650, longitude: -117.9280, latitudeDelta: 0.1, longitudeDelta: 0.1, },
          title: 'Marker Title 3',
          description: 'Marker Description 3',
        },
        {
          latlng: { latitude: 33.8720, longitude: -117.9210 ,latitudeDelta: 0.1, longitudeDelta: 0.1, },
          title: 'Marker Title 4',
          description: 'Marker Description 4',
        },
        {
          latlng: { latitude: 33.8690, longitude: -117.9230,latitudeDelta: 0.1, longitudeDelta: 0.1,  },
          title: 'Marker Title 5',
          description: 'Marker Description 5',
        },
        // Add more markers as needed
      ],
      googleMapsLoaded: false,
    };
  }

  componentDidMount() {
    // Load Google Maps API and initialize the map
    if (Platform.OS === 'web') {
      loadGoogleMapsAPI(() => {
        this.setState({ googleMapsLoaded: true });
      });
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }

 

  render() {
    const { googleMapsLoaded, markerPosition,origin,destination,waypoint,markers } = this.state;
    const coordinates = [
     { latitude: 33.8704, longitude: -117.9242 }, // Latitude and longitude for the origin marker
    { latitude: 34.0100, longitude: -118.1100 }, // Latitude and longitude for the destination marker
  // { latitude: 33.9950, longitude: -117.9260 },
    ];
    return (
      
      <View style={styles.container}>
        <ErrorBoundary>
        {googleMapsLoaded && markerPosition && Platform.OS === 'web' ? (
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChange={(region) => this.onRegionChange(region)}
            customMapStyle={MapStyle}
          >
          <MapView.Marker coordinate={origin} title="Origin" />
          <MapView.Marker coordinate={waypoint} title="Waypoint" />
          <MapView.Marker coordinate={destination} title="Destination" />
         
          <MapView.Polyline
          coordinates={coordinates}
          strokeWidth={4}
          strokeColor="blue"
        />

            {/* <MapViewDirections
            origin={origin}
            waypoints={[waypoint]}
            destination={destination}
            apikey={apiKey}
            strokeWidth={3}
            strokeColor="hotpink"
          />   */}
          </MapView>
        ) : Platform.OS === 'android' ? (
          <MapViewMob
            style={styles.map}
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChange={(region) => this.onRegionChange(region)}
            customMapStyle={MapStyle}
          >
             {/* {this.state.markers.map((marker, index) => (
              <MarkerMob
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))} */}
          <MarkerMob coordinate={origin} title="Origin" />
          <MarkerMob coordinate={waypoint} title="Waypoint" />
          <MarkerMob coordinate={destination} title="Destination" />
          <MapViewDirectionsMob
            origin={origin}
            waypoints={[waypoint]}
            destination={destination}
            apikey={apiKey}
            strokeWidth={4}
            strokeColor="hotpink"
          />
          </MapViewMob>
        ) : (
          <Text>LOADING....</Text>
        )}
  </ErrorBoundary>

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