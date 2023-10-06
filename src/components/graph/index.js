import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../style/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ErrorBoundary from "../errorBoundry";
import GraphStep1 from "./GraphStep1";
import GraphStep2 from "./GraphStep2";
import GraphStep3 from "./GraphStep3";
import GraphStep4 from "./GraphStep4";
import GraphStep5 from "./GraphStep5";





const GraphScreen = () => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);

  const options = {
    interaction:{
      selectable: true,
      hover: true
    },
    autoResize: true,
    layout: {
      hierarchical: false
    },
    edges: {
      color: "black",
      width: 1,
      arrows: 'to;from',
      dashes: false,
      smooth: {
        type: "dynamic",
        forceDirection: "horizontal",
        roundness: 0.5
      },
      shadow: {
        enabled: true
      }
    },
    nodes: {
      shape: "ellipse",
      size: 50,
      borderWidth: 5,
      color: {
        border: "red",
        background: "white",
      },
      font: {
        size: 16
      },
    },
    height: '100%',
    width: '100%',
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.001,
        springLength: 200,
        springConstant: 0.08
      },
      maxVelocity: 50,
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: {
        enabled: false,
        iterations: 1000,
        updateInterval: 2
      }
    },
    groups: {
      green: {
        color: {
          border: "green",
          background: "green",
          highlight: {
            border: "green",
            background: "green"
          }
        },
        font: {
          color: "white"
        }
      }
    }
  }

  const graph = {
    edges: [
      { from: 1, to: 6, label: "hello"},
      { from: 1, to: 7, label: "chjkscksjcbhsjkbcsh"},
      { from: 2, to: 6, label: "chjkscksjcbhsjkbcsh" },
      { from: 2, to: 7, label: "chjkscksjcbhsjkbcsh" },
      { from: 3, to: 6, label: "chjkscksjcbhsjkbcsh" },
      { from: 3, to: 7, label: "chjkscksjcbhsjkbcsh" },
      { from: 4, to: 6, label: "chjkscksjcbhsjkbcsh" },
      { from: 4, to: 7, label: "chjkscksjcbhsjkbcsh" },
      { from: 5, to: 6, label: "First Take This", color: "green"},
      { from: 5, to: 7, label: "Then Take This", color: "green" },
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
          "group": "green",
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
  const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const handleButtonClick = () => {
    setStep1(true);
    wait(1000)
    .then(() => { setStep1(false);setStep2(true)})
    .then(() => wait(1000))
    .then(() => { setStep2(false);setStep3(true)})

    .then(() => wait(1000))
    .then(() => { setStep3(false);setStep4(true)})
    .then(() => wait(1000))
    .then(() => {
      setStep4(false);
      setStep5(true);
  })
  };


  return (
    <View style={styles.container}>
      <ErrorBoundary>
        <TouchableOpacity style={styles.button} onPress={()=>{handleButtonClick()}}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="graphql"
            size={24}
            color={Colors.white}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Simulation</Text>
          </View>
        </TouchableOpacity>
          { step1 && (
            <GraphStep1 graphOptions={options}></GraphStep1>
            )}
            { step2 && (
            <GraphStep2  graphOptions={options}></GraphStep2>
            )}
            { step3&& (
            <GraphStep3  graphOptions={options}
            graphNodes={{...graph, edges: [
            { from: 6, to: 7, label: "TRAFFIC", color: "red"}]}}>
            </GraphStep3>
            )}
            { step4 && (
            <GraphStep4  graphOptions={options} 
            graphNodes={{...graph, edges: [{ from: 5, to: 6, label: "First Take This", color: "green"},
            { from: 5, to: 7, label: "Then Take This", color: "green" },
            { from: 6, to: 7, label: "TRAFFIC", color: "red"}]}}>
            </GraphStep4>
            )}
          { step5 && (
            <GraphStep5  graphOptions={options} graphNodes={graph}></GraphStep5>
            )}
      </ErrorBoundary>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: Colors.orange,
    padding: 8,
    margin: 5,
    borderRadius: 5,
    height: 35,
    width: "28%",
  },
  disableBtn: {
    backgroundColor: Colors.grey,
    padding: 8,
    margin: 5,
    borderRadius: 5,
    height: 35,
    width: "20%",
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default GraphScreen;