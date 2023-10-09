import React from "react";
import { View } from "react-native";
import GraphScreen from "./graph/index";
import MapScreen from "./map/index";

const NewSplitScreen = () => {
  return (
    <View style={{ flex: 1, flexDirection: "column", margin: 5 }}>
      <View style={{ flex: 1, height: "50%" }}>
        <MapScreen />
      </View>
      <View style={{ flex: 1, height: "50%" }}>
        <GraphScreen />
      </View>
    </View>
  );
};

export default NewSplitScreen;
