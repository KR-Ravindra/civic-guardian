import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";

import loadGoogleMapsAPI from "./webMapComponent"; // Import the function
import MapStyle from "./mapStyle";
import ErrorBoundary from "../errorBoundry";
import floydWarshall from "../../apis/FloydWarshall";

let MapViewMob, MarkerMob, MapViewDirectionsMob;

if (Platform.OS === "android") {
  MapViewMob = require("react-native-maps").default;
  MarkerMob = require("react-native-maps").Marker;
  MapViewDirectionsMob = require("react-native-maps-directions").default;
}
let MapView;

if (Platform.OS === "web") {
  MapView = require("@preflower/react-native-web-maps").default;
}

const apiKey = "AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E"; //  Google Maps API key

// Create the debounce function
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    try {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (typeof func == "function") {
          func(...args);
        }
      }, delay);
    } catch (error) {
      console.log("Error in debounce", error);
    }
  };
};

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.stateOfMap;
    this.debouncedOnRegionChange = debounce(this.onRegionChange, 10);

  }

  // fetchRouteData(origin, waypoint, destination) {
  fetchRouteData(originLatLong, waypointLatLong, destinationLatLong) {
    console.log("Function is called");
    console.log("Waypoint in fetchRouteData is", waypointLatLong);

    const origin = `${originLatLong.latitude},${originLatLong.longitude}`;
    const destination = `${destinationLatLong.latitude},${destinationLatLong.longitude}`;
    const waypoint = `${waypointLatLong.latitude},${waypointLatLong.longitude}`;
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
          const coords = this.extractcoords(
            parsedData.routes[0].overview_polyline
          );
          this.setState({ coords });
        }
      })
      .catch((error) => {
        console.error("Error fetching route with routes api:", error);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.setState(this.props.stateOfMap);
    }
    if (prevProps.stateOfMap.plot.draw != this.props.stateOfMap.plot.draw) {
      if (Platform.OS === "web") {
          let best_waypoint;
          this.fetchRouteData(
            this.props.stateOfMap.plot.origin,
            this.props.stateOfMap.plot.waypoint,
            this.props.stateOfMap.plot.destination
          );
          }
      }
    }

  componentDidMount() {
    if (Platform.OS === "web") {
      loadGoogleMapsAPI(() => {
        this.setState({ googleMapsLoaded: true });
      });
    }
  }

  extractcoords(overviewPolyline) {
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
  }, 10);

  onRegionChangeComplete = (region) => {
    console.log("Region changed:", region);
  };

  onPress = (event) => {
    console.log("Map pressed:", event.nativeEvent.coordinate);
  };

  onDoublePress = (event) => {
    console.log("Map double pressed:", event.nativeEvent.coordinate);
  };

  onPanDrag = () => {
    console.log("Map panned or dragged");
  };

  render() {
    const {
      coords,
      region,
      origin,
      destination,
      markers,
      googleMapsLoaded,
      plot,
    } = this.state;
    // Import images with Expo's asset management
    const custom_pin = require("../../assets/custom_image.png");
    return (
      <View style={styles.container}>
        <ErrorBoundary>
          {googleMapsLoaded && Platform.OS === "web" ? (
            <View style={styles.container}>
              <MapView
                style={styles.map}
                initialRegion={this.state.region}
                region={this.state.region}
                onRegionChange={(new_region) => {
                  this.debouncedOnRegionChange(new_region);
                }}
                onRegionChangeComplete={this.onRegionChangeComplete}
                onPress={this.onPress}
                onDoublePress={this.onDoublePress}
                onPanDrag={this.onPanDrag}
                zoomEnabled={true}
                zoomControlEnabled={true}
                mapType="terrain"
              >
                <MapView.Marker coordinate={origin} title="Origin">
                  <View style={styles.markerContainer}>
                    <img
                      source={custom_pin}
                      style={styles.markerImage}
                    />
                  </View>
                </MapView.Marker>

                <MapView.Marker coordinate={destination} title="Destination">
                  <View style={styles.markerContainer}>
                    <img
                      source={custom_pin}
                      style={styles.markerImage}
                    />
                  </View>
                </MapView.Marker>
                 

                {markers.map((marker, index) => (
                  <MapView.Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                  />
                ))}
                {console.log("Coords are", coords) ||
                  (coords && (
                    <MapView.Polyline
                      coordinates={coords.map((coord) => ({
                        latitude: coord[0],
                        longitude: coord[1],
                      }))}
                      strokeWidth={4}
                      strokeColor="royalblue"
                    />
                  ))}
              </MapView>
              <TouchableOpacity onPress={this.props.onPressMarkers}>
                <Text>Generate Waypoints</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.onPressPlotter}>
                <Text>Generate Way</Text>
              </TouchableOpacity>
            </View>
          ) : Platform.OS === "android" ? (
            <View style={styles.container}>
              <MapViewMob
                style={styles.map}
                initialRegion={this.state.region}
                region={this.state.region}
                onRegionChange={(new_region) => {
                  this.debouncedOnRegionChange(new_region);
                }}
                mapType="terrain"
                customMapStyle={MapStyle}
              >
                <MarkerMob
                  coordinate={origin}
                  title="Origin">
                  <View style={styles.markerContainer}>
                  <Image
                    source={custom_pin}
                    style={styles.markerImage}
                  />
                </View>
                </MarkerMob>
                <MarkerMob
                  coordinate={destination}
                  title="Destination"
                  >
                  <View style={styles.markerContainer}>
                  <Image
                    source={custom_pin}
                    style={styles.markerImage}
                  />
                </View>
                </MarkerMob>
             

                {console.log("Markers are ", markers) ||
                  markers.map((marker, index) => (
                    <MarkerMob
                      key={index}
                      coordinate={marker.latlng}
                      title={marker.title}
                      description={marker.description}
                    />
                  ))}
                {plot.draw && (
                  <MapViewDirectionsMob
                    origin={origin}
                    waypoints={[
                      {
                        latitude: plot.waypoint.latitude,
                        longitude: plot.waypoint.longitude,
                      },
                    ]}
                    destination={destination}
                    apikey={apiKey}
                    strokeWidth={4}
                    strokeColor="hotpink"
                  />
                )}
              </MapViewMob>
              <TouchableOpacity onPress={this.props.onPressMarkers}>
                <Text>Generate Waypoints</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.onPressPlotter}>
                <Text>Generate Way</Text>
              </TouchableOpacity>
            </View>
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
  markerContainer: {
    width: 40, // Set the desired width
    height: 40, // Set the desired height
  },
  markerImage: {
    flex: 1,
    width: undefined, // This makes sure the width is set according to the parent container
    height: undefined, // This makes sure the height is set according to the parent container
  },
});