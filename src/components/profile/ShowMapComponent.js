import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, Button } from 'react-native';
import loadGoogleMapsAPI from './webMapComponent'; // Import the function
import MapStyle from './mapStyle';
import ErrorBoundary from '../errorBoundry';
import waypoint_logo from '../../assets/splash.png';


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
}



const Map = (region, waypoints, origin, destination )  => {

    const [googleMapsLoaded, setGoogleMapsLoaded]= useState(true)
    const apiKey = 'AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E';
    const loadGoogleMapsAPI = (apiKey) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
          script.onload = () => resolve();
          script.onerror = () => reject();
          document.head.appendChild(script);
        });
      };
      loadGoogleMapsAPI(apiKey)
    return (
      <View style={styles.container}>
        <ErrorBoundary>
        {googleMapsLoaded && Platform.OS === 'web' ? (
          <MapView
            style={styles.map}
            initialRegion={region}
            region={region}
            onRegionChange={(region) => this.onRegionChange(region)}
            customMapStyle={MapStyle}
            provider={MapView.PROVIDER_GOOGLE}
            googleMapsApiKey={apiKey}
          >
            <MapView.Marker coordinate={origin} title="Origin" />
            <MapView.Marker coordinate={destination} title="Destination" />

            {waypoints && waypoints.length > 0 && waypoints.map((marker, index) => (
                <MapView.Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                image={marker.image}
                />
            ))}
          </MapView>
        ) : Platform.OS === 'android' ? (
          <MapViewMob
            style={styles.map}
            initialRegion={region}
            region={region}
            onRegionChange={(region) => this.onRegionChange(region)}
            customMapStyle={MapStyle}
          >

          <MarkerMob coordinate={origin} title="Origin" />
          <MarkerMob coordinate={destination} title="Destination" />
          <MapViewDirectionsMob
            origin={origin}
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
  };



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

export default Map;