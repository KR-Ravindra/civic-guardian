import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Button
} from "react-native";
import Colors from "../../style/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ErrorBoundary from "../errorBoundry";
import GraphStep4 from "./GraphStep4";


const GraphScreen = () => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);
  const handleButtonClick = () => {
    console.log("Hey There")
    setStep4(true);
    console.log("Step 1 is ", step1)
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
          { step4 && (
            <GraphStep4></GraphStep4>
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