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
import fetchRouteData from "../../apis/GetCoords";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../style/colors";

let LinearGradientWeb,LinearGradientMob;

let MapViewMob, MarkerMob, MapViewDirectionsMob;

if (Platform.OS === "android") {
  MapViewMob = require("react-native-maps").default;
  MarkerMob = require("react-native-maps").Marker;
  MapViewDirectionsMob = require("react-native-maps-directions").default;
  LinearGradientMob = require("react-native-linear-gradient").default;
}
let MapView;

if (Platform.OS === "web") {
  MapView = require("@preflower/react-native-web-maps").default;
  LinearGradientWeb = require("react-native-web-linear-gradient").default;
}

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

    // this.state = this.props.stateOfMap;
    this.state = {
      ...this.props.stateOfMap,
      showIcon: false, // Add a state variable to control icon visibility
    };
    this.debouncedOnRegionChange = debounce(this.onRegionChange, 10);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(this.props.stateOfMap);
    }

    if (prevProps.stateOfMap.plot.draw !== this.props.stateOfMap.plot.draw) {
      if (Platform.OS === "web") {
        try {
          const coords = await fetchRouteData(
            this.props.stateOfMap.plot.origin,
            this.props.stateOfMap.plot.waypoint,
            this.props.stateOfMap.plot.destination
          );
          this.setState({ coords });
        } catch (error) {
          console.error("Error fetching COORDS", error);
        }
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

  onPolylineClicked = () => {
    this.setState(() => ({ showIcon: true }));
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
      showIcon,
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
                showsPointsOfInterest={false}
              >
                <MapView.Marker coordinate={origin} title="Origin">
                  <View style={styles.markerContainer}>
                    <img source={custom_pin} style={styles.markerImage} />
                  </View>
                </MapView.Marker>

                <MapView.Marker coordinate={destination} title="Destination">
                  <View style={styles.markerContainer}>
                    <img source={custom_pin} style={styles.markerImage} />
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
                {coords && (
                  <MapView.Polyline
                    coordinates={coords.map((coord) => ({
                      latitude: coord[0],
                      longitude: coord[1],
                    }))}
                    strokeWidth={14}
                    strokeColor={showIcon ? "red" : "royalblue"}
                    tappable={true}
                    onClick={() => {
                      this.onPolylineClicked();
                    }}
                  />
                )}
              </MapView>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.props.onPressPlotter}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="map-marker-alt"
                      size={24}
                      color={Colors.white}
                      style={{ marginRight: 10 }}
                    />
                    <Text style={styles.buttonText}>Generate Way</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    marginTop: 10,
                    height: 35,
                    width: "40%",
                  }}
                >
                  <LinearGradientWeb
                    colors={[
                      "#FF7518",
                      "#FF7518",
                      "#FFC107",
                      "#FFC107",
                      "#FFC107",
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{
                      padding: 8,
                      borderRadius: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <FontAwesome5
                        name="map-pin"
                        size={24}
                        color={Colors.white}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.buttonText}>Region</Text>
                      <FontAwesome5
                        name="grip-lines"
                        size={24}
                        color={Colors.white}
                        style={{ marginleft: 10 }}
                      />
                      <Text style={styles.buttonText}>{region.latitude}</Text>
                      <FontAwesome5
                        name="grip-lines-vertical"
                        size={24}
                        color={Colors.white}
                        style={{ marginleft: 10 }}
                      />

                      <Text style={styles.buttonText}>{region.longitude}</Text>
                    </View>
                  </LinearGradientWeb>
                </TouchableOpacity>
              </View>
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
                <MarkerMob coordinate={origin} title="Origin">
                  <View style={styles.markerContainer}>
                    <Image source={custom_pin} style={styles.markerImage} />
                  </View>
                </MarkerMob>
                <MarkerMob coordinate={destination} title="Destination">
                  <View style={styles.markerContainer}>
                    <Image source={custom_pin} style={styles.markerImage} />
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
                    strokeWidth={14}
                    strokeColor="hotpink"
                  />
                )}
              </MapViewMob>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.props.onPressPlotter}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="map-marker-alt"
                      size={24}
                      color={Colors.white}
                      style={{ marginRight: 10 }}
                    />
                    <Text style={styles.buttonText}>Generate Way</Text>
                  </View>
                </TouchableOpacity>
                

                {/* <TouchableOpacity
                  style={{
                    alignItems: "center",
                    margin: 5,
                    height: 35,
                    width: "40%",
                  }}
                >
                  <LinearGradientMob
                    colors={[
                      "#FF7518",
                      "#FF7518",
                      "#FFC107",
                      "#FFC107",
                      "#FFC107",
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{
                      padding: 8,

                      borderRadius: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <FontAwesome5
                        name="map-pin"
                        size={24}
                        color={Colors.white}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.buttonText}>Region</Text>
                      <FontAwesome5
                        name="grip-lines"
                        size={24}
                        color={Colors.white}
                        style={{ marginleft: 10 }}
                      />
                      <Text style={styles.buttonText}>{region.latitude}</Text>
                      <FontAwesome5
                        name="grip-lines-vertical"
                        size={24}
                        color={Colors.white}
                        style={{ marginleft: 10 }}
                      />

                      <Text style={styles.buttonText}>{region.longitude}</Text>
                    </View>
                  </LinearGradientMob>
                </TouchableOpacity> */}
              </View>
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
    width: 40,
    height: 40,
  },
  markerImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  button: {
    backgroundColor: Colors.orange,
    padding: 8,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    height: 35,
    width: "20%",
  },

  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold",
    marginRight: 5,
    marginLeft: 5,
  },
});
