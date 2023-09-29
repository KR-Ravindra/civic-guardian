import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";

import loadGoogleMapsAPI from "./webMapComponent"; // Import the function
import MapStyle from "./mapStyle";
import ErrorBoundary from "../errorBoundry";
// import MapView, { Marker, Polyline } from "react-native-maps";

let MapViewMob, MarkerMob, MapViewDirectionsMob;

if (Platform.OS === "android") {
  MapViewMob = require("react-native-maps").default;
  MarkerMob = require("react-native-maps").Marker;
  MapViewDirectionsMob =
    require("react-native-maps-directions").default;
}
let MapView, Marker, Polyline;

if (Platform.OS === "web") {

  MapView = require('@preflower/react-native-web-maps').default;
  Polyline = require('@preflower/react-native-web-maps').default;
}

const apiKey = "AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E"; //  Google Maps API key

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
    this.state = this.props.stateOfMap;
    this.debouncedOnRegionChange = debounce(this.onRegionChange, 10);
    console.log("Props are ", this.props)
  }

  fetchRouteData() {

        // Define waypoints as latitude and longitude coordinates
        const origin = "33.8704,-117.9242"; // Replace with your origin coordinates
        const waypoint = "33.872,-117.921"; // Replace with your waypoint coordinates
        const destination = "33.869,-117.923"; // Replace with your destination coordinates

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
                parsedData.routes[0].overview_polyline,
              );
              this.setState({ coords });
            }
          })
          .catch((error) => {
            console.error("Error fetching route:", error);
          });
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      console.log("New Props are ", this.props)
      this.setState(this.props.stateOfMap);
      this.fetchRouteData();
    }
    
  }

  componentDidMount() {
    console.log("Component is mounted")
    if (Platform.OS === "web") {
      loadGoogleMapsAPI(() => {
        this.setState({ googleMapsLoaded: true });
        this.fetchRouteData();
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
    } = this.state;
    return (
      <View style={styles.container}>
        {console.log("Props are ", this.props)}
        {console.log("State is ", this.state)}
        <ErrorBoundary>
          {googleMapsLoaded && Platform.OS === "web" ? (
            <View style={styles.container}>
              <MapView
                style={styles.map}
                initialRegion={this.state.region}
                region={this.state.region}
                onRegionChange={(new_region) => {this.debouncedOnRegionChange(new_region)}}
                onRegionChangeComplete={this.onRegionChangeComplete}
                onPress={this.onPress}
                onDoublePress={this.onDoublePress}
                onPanDrag={this.onPanDrag}
                zoomEnabled={true}
                zoomControlEnabled={true}
              >
                <MapView.Marker coordinate={origin} title="Origin" />
                <MapView.Marker coordinate={destination} title="Destination" />

                { console.log("Markers are ", markers) || markers.map((marker, index) => (
                  <MapView.Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                  />
                ))}
                {console.log("Cords are", coords) || coords && (
                  <MapView.Polyline
                    coordinates={coords.map((coord) => ({
                      latitude: coord[0],
                      longitude: coord[1],
                    }))}
                    strokeWidth={4}
                    strokeColor="royalblue"
                  />
                )}
              </MapView>
              <TouchableOpacity onPress={this.props.onPress}><Text>Generate Waypoints</Text></TouchableOpacity>
            </View>
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