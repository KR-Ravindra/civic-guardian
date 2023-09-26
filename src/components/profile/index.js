import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps'


export default class ProfileScreen extends Component{
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
      mapStyle=[
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ]
    
      render() {
        console.log('initial', this.state)
        return (
          <View style={styles.container}>
            {/* <MapView
            //   provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={this.state.region}
              region={this.state.region}
              onRegionChange={(region) => this.onRegionChange(region)}
            //   customMapStyle={this.mapStyle}
              {...this.state.markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}
                />
              ))}
            /> */}
            <Text>Hello</Text>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map:{
        flex: 1, // This ensures that the map takes up all available space
    }
});