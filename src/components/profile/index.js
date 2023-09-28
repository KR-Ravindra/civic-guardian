import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform
} from "react-native";

import loadGoogleMapsAPI from "./webMapComponent"; // Import the function
import MapStyle from "./mapStyle";
import { MapContainer, TileLayer,Marker,Polyline,Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';


const apiKey = "AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E"; //  Google Maps API key

let MapViewMob, MarkerMob, MapViewDirectionsMob;

if (Platform.OS === "android") {
  // Import components for mobile (Android)
  MapViewMob = require("react-native-maps").default;
  MarkerMob = require("react-native-maps").Marker;
  MapViewDirectionsMob =
    require("react-native-maps-directions").default;
}
let MapView

if (Platform.OS === "web") {
  // Import components for web
  MapView = require("react-native-web-maps").default;
  require('leaflet/dist/leaflet.css');

}

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        // latitude: 34.0522,   // Latitude for Los Angeles
        // longitude: -118.2437, // Longitude for Los Angeles
        latitude: 33.8704, // Latitude for fullerton
        longitude: -117.9242, // Longitude for fullerton
        latitudeDelta: 0.1, // Adjust this value for zoom level
        longitudeDelta: 0.1, // Adjust this value for zoom level
      },
      markerPosition: {
        latitude: 33.8704, // Initial latitude for marker
        longitude: -117.9242, // Initial longitude for marker
      },
      origin: { latitude: 33.8704, longitude: -117.9242 }, // Latitude and longitude for the origin marker
      destination: { latitude: 34.01, longitude: -118.11 }, // Latitude and longitude for the destination marker
      waypoint: { latitude: 33.995, longitude: -117.926 }, // Waypoint marker

      markers: [
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
        // Add more markers as needed
      ],
      googleMapsLoaded: false,
      routeCoordinates: [],// Store the route coordinates here
    };
  }

  componentDidMount() {
    // Load Google Maps API and initialize the map
    if (Platform.OS === "web") {
      loadGoogleMapsAPI(() => {
        this.setState({ googleMapsLoaded: true });
      });

     // Define waypoints as latitude and longitude coordinates
     const origin = "33.8704,-117.9242"; // Replace with your origin coordinates
     const waypoint = "33.995,-117.926"; // Replace with your waypoint coordinates
     const destination = "34.01,-118.11"; // Replace with your destination coordinates

     // Construct the URL for the Google Directions API request
     const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&waypoints=${waypoint}&destination=${destination}&key=${apiKey}`;

     // Make an API request to the Google Directions API
     fetch(apiUrl)
       .then((response) => response.json())
       .then((data) => {
         if (data.routes && data.routes.length > 0) {
           // Extract route coordinates from the API response
           const routeCoordinates = this.extractRouteCoordinates(
             data.routes[0].overview_polyline
           );
           this.setState({ routeCoordinates });
         }
       })
       .catch((error) => {
         console.error("Error fetching route:", error);
       });

  }
}

extractRouteCoordinates(polyline) {
  // Decodes the encoded polyline and returns an array of coordinates
  const points = window.google.maps.geometry.encoding.decodePath(
    polyline.points
  );
  return points.map((point) => [point.lat(), point.lng()]);
}



  onRegionChange(region) {
    this.setState({ region });
  }


  render() {
    const {
      googleMapsLoaded,
      markerPosition,
      origin,
      destination,
      waypoint,
      routeCoordinates,
      markers,
    } = this.state;
    const coordinates = [origin,waypoint, destination];
    console.log(routeCoordinates,'routeCoordinates');
    // const routeCoordinates = [source, way,dest];
   

    return (
      <View style={styles.container}>
 
          {googleMapsLoaded  && Platform.OS === "web" ? (
      
              // <MapView
              //   style={styles.map}
              //   initialRegion={this.state.region}
              //   region={this.state.region}
              //   onRegionChange={(region) => this.onRegionChange(region)}
              //   customMapStyle={MapStyle}
              // >
              //   <MapView.Marker coordinate={origin} title="Origin" />
              //   <MapView.Marker coordinate={waypoint} title="Waypoint" />
              //   <MapView.Marker coordinate={destination} title="Destination" />
              //   <MapView.Polyline   coordinates={[
              //   { latitude: 33.8704, longitude: -117.9242 },
              //   { latitude: 33.995, longitude: -117.926 },
              //   { latitude: 34.01, longitude: -118.11 },
              // ]}
              // strokeWidth={4}
              // strokeColor="blue" />


        
              // </MapView>
        
          // <Marker position={[origin.latitude,origin.longitude]} title="Origin" />
          //   <Marker position={[waypoint.latitude,waypoint.longitude]} title="Waypoint" />
          //   <Marker position={[destination.latitude,destination.longitude]} title="Destination" /> 
          <MapContainer
        center={[33.9, -117.9]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
          <Marker position={[33.8704, -117.9242]} title="Origin" />
          <Marker position={[33.995, -117.926]} title="Waypoint" />
           <Marker position={[34.01, -118.11]} title="Destination" />

        {/* Render the route as a polyline */}
        <Polyline positions={routeCoordinates} color="blue" weight={10} />
      </MapContainer>
    
          ) : Platform.OS === "android" ? (
            <MapViewMob
              style={styles.map}
              initialRegion={this.state.region}
              region={this.state.region}
              onRegionChange={(region) => this.onRegionChange(region)}
              customMapStyle={MapStyle}
            >
             
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
