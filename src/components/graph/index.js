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
            <GraphStep1></GraphStep1>
            )}
            { step2 && (
            <GraphStep2></GraphStep2>
            )}
            { step3&& (
            <GraphStep3></GraphStep3>
            )}
            { step4 && (
            <GraphStep4></GraphStep4>
            )}
          { step5 && (
            <GraphStep5></GraphStep5>
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