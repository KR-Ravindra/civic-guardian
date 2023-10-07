import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../style/colors";
import { MaterialCommunityIcons,FontAwesome } from "@expo/vector-icons";

import Manual from "./manual"
import ErrorBoundary from "../errorBoundry";
import Graph from "./Graph";
import Toast from 'react-native-toast-message';
import ToastProvider from 'react-native-toast-message'



const GraphScreen = () => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);
  const [simulation, setSimulation] = useState(false);
  const [isModalVisible,setIsModalVisible]=useState(false)

  const options = {
    interaction: {
      selectable: true,
      hover: true,
    },
    autoResize: true,
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "black",
      width: 1,
      arrows: "to;from",
      dashes: false,
      smooth: {
        type: "dynamic",
        forceDirection: "horizontal",
        roundness: 0.5,
      },
      shadow: {
        enabled: true,
      },
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
        size: 16,
      },
    },
    height: "100%",
    width: "100%",
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.001,
        springLength: 200,
        springConstant: 0.08,
      },
      maxVelocity: 50,
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: {
        enabled: false,
        iterations: 1000,
        updateInterval: 2,
      },
    },
    groups: {
      green: {
        color: {
          border: "green",
          background: "green",
          highlight: {
            border: "green",
            background: "green",
          },
        },
        font: {
          color: "white",
        },
      },
    },
  };

  const graph = {
    edges: [
      { from: 1, to: 6, label: "" },
      { from: 1, to: 7, label: "" },
      { from: 2, to: 6, label: "" },
      { from: 2, to: 7, label: "" },
      { from: 3, to: 6, label: "" },
      { from: 3, to: 7, label: "" },
      { from: 4, to: 6, label: "" },
      { from: 4, to: 7, label: "" },
      { from: 5, to: 6, label: "First Take This", color: "green" },
      { from: 5, to: 7, label: "Then Take This", color: "green" },
      { from: 6, to: 7, label: "TRAFFIC", color: "red" },
    ],
    nodes: [
      {
        description: "department_store",
        latlng: {
          latitude: 33.8624839,
          longitude: -117.9221267,
        },
        label: "Costco Wholesale",
        id: 1,
      },
      {
        description: "local_government_office",
        latlng: {
          latitude: 33.8811773,
          longitude: -117.9264855,
        },
        label: "North Justice Center",
        id: 2,
      },
      {
        description: "restaurant",
        latlng: {
          latitude: 33.8690644,
          longitude: -117.9238634,
        },
        label: "The Old Spaghetti Factory",
        id: 3,
      },
      {
        description: "local_government_office",
        latlng: {
          latitude: 33.8819285,
          longitude: -117.9264468,
        },
        label: "Orange County Victim-Witness",
        id: 4,
      },
      {
        description: "restaurant",
        latlng: {
          latitude: 33.8708538,
          longitude: -117.9245297,
        },
        label: "Matador Cantina",
        group: "green",
        id: 5,
      },
      {
        description: "restaurant",
        latlng: {
          latitude: 33.8708538,
          longitude: -117.9245297,
        },
        label: "Source",
        group: "green",
        id: 6,
      },
      {
        description: "restaurant",
        latlng: {
          latitude: 33.8708538,
          longitude: -117.9245297,
        },
        label: "Destination",
        group: "green",
        id: 7,
      },
    ],
  };

const showToast = (message) => {
  Toast.show({
    type: 'info',
    position: 'top',
    text1: message,
  
  });
  
};
 

  const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
const  toggleModal = () => {
  setIsModalVisible(true)
};


const closeModal = () => {
  setIsModalVisible(false);
};

  const onSimulation = () => {
    setSimulation(true);
    setStep1(true);
    wait(2500)
      .then(() => showToast("Oops! Traffic Detected"))
      .then(() => {
        setStep1(false);
        setStep2(true);
      })
      .then(() => wait(2500))
      .then(() =>
        showToast(
          "Recalculating the best route! Determining popular hubs!",
          "OK"
        )
      )
      .then(() => {
        setStep2(false);
        setStep3(true);
      })
      .then(() => wait(2500))
      .then(() => showToast("Establishing the best possible route!", "OK"))

      .then(() => {
        setStep3(false);
        setStep4(true);
      })
      .then(() => wait(2500))
      .then(() => showToast("Generating the complete matrix!", "OK"))

      .then(() => {
        setStep4(false);
        setStep5(true);
      });
  };
  const onReset = () => {
    setStep1(false);
    setStep2(false);
    setStep3(false);
    setStep4(false);
    setStep5(false);
    setSimulation(false);
  };

  return (
    <View style={styles.container}>
      <ErrorBoundary>
      <ToastProvider/>
      <TouchableOpacity onPress={()=>{toggleModal()}} style={styles.button}>
      <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="graduation-cap"
                size={24}
                color={Colors.white}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.buttonText}>Learn</Text>
            </View>
      </TouchableOpacity>
        {!simulation && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onSimulation();
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="graphql"
                size={24}
                color={Colors.white}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.buttonText}>Simulate Now</Text>
            </View>
          </TouchableOpacity>
        )}
         {isModalVisible && <Manual isVisible={isModalVisible} onClosePress={()=>closeModal()}/>}

        {step1 && (
          <Graph
            graphOptions={options}
            graphNodes={{
              edges: [{ from: 6, to: 7, label: "", color: "green" }],
              nodes: [
                { ...graph.nodes[graph.nodes.length - 2] },
                { ...graph.nodes[graph.nodes.length - 1] },
              ],
            }}
          ></Graph>
        )}
        {step2 && (
          <Graph
            graphOptions={options}
            graphNodes={{
              edges: [{ from: 6, to: 7, label: "TRAFFIC", color: "red" }],
              nodes: [
                { ...graph.nodes[graph.nodes.length - 2] },
                { ...graph.nodes[graph.nodes.length - 1] },
              ],
            }}
          ></Graph>
        )}
        {step3 && (
          <Graph
            graphOptions={options}
            graphNodes={{
              ...graph,
              edges: [{ from: 6, to: 7, label: "TRAFFIC", color: "red" }],
            }}
          ></Graph>
        )}
        {step4 && (
          <Graph
            graphOptions={options}
            graphNodes={{
              ...graph,
              edges: [
                { from: 5, to: 6, label: "First Take This", color: "green" },
                { from: 5, to: 7, label: "Then Take This", color: "green" },
                { from: 6, to: 7, label: "TRAFFIC", color: "red" },
              ],
            }}
          ></Graph>
        )}
        {step5 && (
          <Graph graphOptions={options} graphNodes={graph}></Graph>
        )}
        {simulation && step5 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onReset();
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="graphql"
                size={24}
                color={Colors.white}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.buttonText}>Reset Simulation</Text>
            </View>
          </TouchableOpacity>
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