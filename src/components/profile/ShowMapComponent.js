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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = props.stateOfMap;
  }

  componentDidMount() {
    // Load Google Maps API and initialize the map
    if (Platform.OS === "web") {
      loadGoogleMapsAPI(() => {
        this.setState({ googleMapsLoaded: true });
      });
    }
  }


  onRegionChange(region) {
    this.setState({ region });
  }


  render() {
    const {
      region,
      origin,
      destination,
      markers,
      googleMapsLoaded,
    } = this.state;
    return (
      <View style={styles.container}>
        {console.log("Booted", markers)}
        {console.log("Origin", origin)}
        {console.log("destination", destination)}
        <ErrorBoundary>
          {googleMapsLoaded && Platform.OS === "web" ? (
            <View style={styles.container}>
              <MapView
                style={styles.map}
                initialRegion={this.state.region}
                region={this.state.region}
                onRegionChange={(region) => this.onRegionChange(region)}
              >
                <MapView.Marker coordinate={origin} title="Origin" />
                <MapView.Marker coordinate={destination} title="Destination" />

                {console.log("Markers are: ", markers) || markers.map((marker, index) => (
                  <MapView.Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                  />
                ))}
                <MapView.Polyline
                  coordinates={[origin, destination]}
                  apiKey={apiKey}
                  strokeWidth={4}
                  strokeColor="blue"
                />

              </MapView>
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