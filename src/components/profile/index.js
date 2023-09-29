import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

import loadGoogleMapsAPI from "./webMapComponent"; // Import the function
import MapStyle from "./mapStyle";


const apiKey = "AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E"; //  Google Maps API key

let MapViewMob, MarkerMob, MapViewDirectionsMob;

if (Platform.OS === "android") {
  // Import components for mobile (Android)
  MapViewMob = require("react-native-maps").default;
  MarkerMob = require("react-native-maps").Marker;
  MapViewDirectionsMob = require("react-native-maps-directions").default;
}
let MapView;

if (Platform.OS === "web") {
  // Import components for web
  MapView = require("@preflower/react-native-web-maps").default;
}


// Create the debounce function
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};


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
      routeCoordinates: [], // Store the route coordinates here
    };
    this.debouncedOnRegionChange = debounce(this.onRegionChange, 300); 
  }

  componentDidMount() {
    // Load Google Maps API and initialize the map
    if (Platform.OS === "web") {
      loadGoogleMapsAPI(() => {
        this.setState({ googleMapsLoaded: true });

        // Define waypoints as latitude and longitude coordinates
        const origin = "33.8704,-117.9242"; // Replace with your origin coordinates
        const waypoint = "33.995,-117.926"; // Replace with your waypoint coordinates
        const destination = "34.01,-118.11"; // Replace with your destination coordinates

        // Update the proxy URL to "CORS Anywhere"
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        // Construct the URL for the Google Directions API request
        const apiUrl = `${proxyUrl}https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&waypoints=${waypoint}&destination=${destination}&key=${apiKey}`;
        //  const apiUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&waypoints=${waypoint}&destination=${destination}&key=${apiKey}`;

        // Make an API request to the Google Directions API
        fetch(apiUrl)
          .then((response) => response.text()) // Get the response body as text
          .then((data) => {
            const parsedData = JSON.parse(data); // Parse the JSON string into an object
            if (parsedData.routes && parsedData.routes.length > 0) {
              // Extract route coordinates from the parsed data
              const routeCoordinates = this.extractRouteCoordinates(
                parsedData.routes[0].overview_polyline
              );
              this.setState({ routeCoordinates });
            }
          })
          .catch((error) => {
            console.error("Error fetching route:", error);
          });
      });
    }
  }

  extractRouteCoordinates(overviewPolyline) {
    try {
      if (
        overviewPolyline &&
        window.google &&
        window.google.maps &&
        window.google.maps.geometry &&
        window.google.maps.geometry.encoding
      ) {
        // Decode the encoded polyline and return an array of coordinates
        const points = window.google.maps.geometry.encoding.decodePath(
          overviewPolyline.points
        );
        if (points && points.length > 0) {
          return points.map((point) => [point.lat(), point.lng()]);
        } else {
          console.error("No points found in the decoded polyline");
          // Return an empty array or handle this case according to your needs
          return [];
        }
      } else {
        console.error(
          "Google Maps JavaScript API not loaded or encoding library not available"
        );
        // Return an empty array or handle this case according to your needs
        return [];
      }
    } catch (error) {
      console.error("Error decoding polyline:", error);
      // Return an empty array or handle this case according to your needs
      return [];
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  //  Create a debounced version of onRegionChange
  debouncedOnRegionChange = debounce((newRegion) => {
    // Check if the new region has valid latitude and longitude
    if (
      !isNaN(newRegion.latitude) &&
      !isNaN(newRegion.longitude) &&
      isFinite(newRegion.latitude) &&
      isFinite(newRegion.longitude)
    ) {
      // Update the state only if the new region has valid coordinates
      this.setState({ region: newRegion });
    }
  }, 100);

  render() {
    const {
      googleMapsLoaded,
      origin,
      destination,
      waypoint,
      routeCoordinates,
      markers
    } = this.state;

    return (
      <View style={styles.container}>
        {googleMapsLoaded && Platform.OS === "web" ? (
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChange={this.debouncedOnRegionChange}
            customMapStyle={MapStyle}

          >
             <MapView.Marker coordinate={origin} title="Origin" />
              <MapView.Marker coordinate={destination} title="Destination" />

                { markers.map((marker, index) => (
                  <MapView.Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                  />
                ))}
    
            {console.log("Cords are", routeCoordinates) || routeCoordinates && (
                  <MapView.Polyline
                    coordinates={routeCoordinates.map((coord) => ({
                      latitude: coord[0],
                      longitude: coord[1],
                    }))}
                    strokeWidth={4}
                    strokeColor="blue"
                  />
                )}

          </MapView>
        ) : Platform.OS === "android" ? (
          <MapViewMob
            style={styles.map}
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChange={(region) => this.onRegionChange(region)}
            customMapStyle={MapStyle}
          >
            <MarkerMob coordinate={origin} title="Origin" />
            <MarkerMob coordinate={destination} title="Destination" />
                { markers.map((marker, index) => (
                  <MarkerMob
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                  />
                ))}
           
            <MapViewDirectionsMob
              origin={origin}
              waypoints={[waypoint]}
              destination={destination}
              apikey={apiKey}
              strokeWidth={4}
              strokeColor="blue"
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
