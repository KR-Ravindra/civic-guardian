import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, {Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyle from './mapStyle'


export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        // latitude: 34.0522,   // Latitude for Los Angeles
            // longitude: -118.2437, // Longitude for Los Angeles
            latitude: 33.8704,   // Latitude for fullerton
            longitude: -117.9242, // Longitude for fullerton
            latitudeDelta: 0.1,//// Adjust this value for zoom level
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
    };
  }
 
  onRegionChange(region) {
    console.log('onRegionChange')
    this.setState({ region });
  }


  render() {
    return (
      <View style={styles.container}>
       <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={this.state.region}
              region={this.state.region}
              onRegionChange={(region) => this.onRegionChange(region)}
              customMapStyle={MapStyle}
              {...this.state.markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}
                />
              ))}
            /> 
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