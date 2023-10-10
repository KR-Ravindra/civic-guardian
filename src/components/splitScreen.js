import React from "react";
import { View } from "react-native";
import MapScreen from "./map/index";

const SplitScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
      <View style={{ flex: 1 }}>
        <MapScreen navigation={navigation} />
      </View>
    </View>
  );
};

export default SplitScreen;
