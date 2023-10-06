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

const GraphStep3 = (graphOptions) => {

  const graph = {
    edges: [
      { from: 6, to: 7, label: "TRAFFIC", color: "red"}
    ],
    nodes: [
      {
          "description": "department_store",
          "latlng": {
              "latitude": 33.8624839,
              "longitude": -117.9221267
          },
          "label": "Costco Wholesale",
          "id": 1
      },
      {
          "description": "local_government_office",
          "latlng": {
              "latitude": 33.8811773,
              "longitude": -117.9264855
          },
          "label": "North Justice Center",
          "id": 2
      },
      {
          "description": "restaurant",
          "latlng": {
              "latitude": 33.8690644,
              "longitude": -117.9238634
          },
          "label": "The Old Spaghetti Factory",
          "id": 3
      },
      {
          "description": "local_government_office",
          "latlng": {
              "latitude": 33.8819285,
              "longitude": -117.9264468
          },
          "label": "Orange County Victim-Witness",
          "id": 4
      },
      {
          "description": "restaurant",
          "latlng": {
              "latitude": 33.8708538,
              "longitude": -117.9245297
          },
          "label": "Matador Cantina",
          "id": 5
      },
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

export default GraphStep3;