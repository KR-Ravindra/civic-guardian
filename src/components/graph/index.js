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

  const fwmatrix = JSON.parse(localStorage.getItem("fwmatrix"));

  const edges = [
    { from: 1, to: 99, label: fwmatrix[0][5]["value"].toString() },
    { from: 1, to: 100, label: fwmatrix[0][6]["value"].toString() },
    { from: 2, to: 99, label: fwmatrix[1][5]["value"].toString() },
    { from: 2, to: 100, label: fwmatrix[1][6]["value"].toString() },
    { from: 3, to: 99, label: fwmatrix[2][5]["value"].toString() },
    { from: 3, to: 100, label: fwmatrix[2][6]["value"].toString() },
    { from: 4, to: 99, label: fwmatrix[3][5]["value"].toString() },
    { from: 4, to: 100, label: fwmatrix[3][6]["value"].toString() },
    { from: 5, to: 99, label: fwmatrix[4][5]["value"].toString() },
    { from: 5, to: 100, label: fwmatrix[4][6]["value"].toString() },
    { from: 101, to: 99, label: fwmatrix[4][6]["value"].toString(), color: "green" },
    { from: 101, to: 100, label: fwmatrix[4][6]["value"].toString(), color: "green" },
    { from: 99, to: 100, label: fwmatrix[4][6]["value"].toString(), color: "red" },
  ]

  // const edges = [
  //   { from: 1, to: 99, label: "" },
  //   { from: 1, to: 100, label: "" },
  //   { from: 2, to: 99, label: "" },
  //   { from: 2, to: 100, label: "" },
  //   { from: 3, to: 99, label: "" },
  //   { from: 3, to: 100, label: "" },
  //   { from: 4, to: 99, label: "" },
  //   { from: 4, to: 100, label: "" },
  //   { from: 5, to: 99, label: "" },
  //   { from: 5, to: 100, label: "" },
  //   { from: 101, to: 99, label: "", color: "green" },
  //   { from: 101, to: 100, label: "", color: "green" },
  //   { from: 99, to: 100, label: "", color: "red" },
  // ]

  const prenodes = JSON.parse(localStorage.getItem("nodes")).map((node) => {
    console.log("Node is ", { ...node, label: node.title + " " + node.id })
    if (node.title === "Source" || node.title === "Destination") {  
      return { ...node, label: node.title };
    } else {
    return { ...node, label: node.title + " " + node.id };
    }
  });
  const bestWaypoint = JSON.parse(localStorage.getItem("best_waypoint"));

  const nodes = prenodes.map((node) => {
    if (node.id === 99 || node.id === 100 || node.id === 101) {
      return { ...node, group: "green" };
    } else if (bestWaypoint["latitude"] == node.latlng.latitude) {
      return { ...node, group: "green", id: 101, label: node.title };
    } else {
      return node;
    }
  });


  localStorage.setItem("edges", JSON.stringify(edges))
  localStorage.setItem("nodes", JSON.stringify(nodes))

  console.log("Nodes are", JSON.parse(localStorage.getItem("nodes")))
  console.log("Edges are", JSON.parse(localStorage.getItem("edges")))


  const graph = {
    edges: edges,
    nodes: nodes,
  }

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
              edges: [{ from: 99, to: 100, label: "", color: "green" }],
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
              edges: [{ from: 99, to: 100, label: "TRAFFIC", color: "red" }],
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
              edges: [{ from: 99, to: 100, label: "TRAFFIC", color: "red" }],
            }}
          ></Graph>
        )}
        {step4 && (
          <Graph
            graphOptions={options}
            graphNodes={{
              ...graph,
              edges: [
                { from: 101, to: 99, label: "First Take This", color: "green" },
                { from: 101, to: 100, label: "Then Take This", color: "green" },
                { from: 99, to: 100, label: "TRAFFIC", color: "red" },
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