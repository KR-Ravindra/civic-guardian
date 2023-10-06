import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import Colors from "../../style/colors";
import ErrorBoundary from "../errorBoundry";

let GraphWeb, GraphMob;

if (Platform.OS === "web") {
  GraphWeb = require("react-vis-network-graph").default;
}

if (Platform.OS === "android") {
  GraphMob = require("react-native-vis-network").default;
}

const GraphStep2 = (graphOptions) => {

  const graph = {
    edges: [
     
      { from: 6, to: 7, label: "TRAFFIC", color: "red"}
    ],
    nodes: [
        {
          "description": "restaurant",
          "latlng": {
              "latitude": 33.8708538,
              "longitude": -117.9245297
          },
          "label": "Source",
          "group": "green",
          "id": 6
      },
      {
        "description": "restaurant",
        "latlng": {
            "latitude": 33.8708538,
            "longitude": -117.9245297
        },
        "label": "Destination",
        "group": "green",
        "id": 7
    }
    ]
  };



  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <ErrorBoundary>
            <GraphWeb
              graph={graph}
              options={graphOptions.graphOptions}
            />
          </ErrorBoundary>
      ) : Platform.OS === "android" ? (
        <View style={styles.container}>
          <GraphMob
            data={graph}
            options={graphOptions.graphOptions}
          />
        </View>
      ) : (
        <Text>LOADING....</Text>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GraphStep2;