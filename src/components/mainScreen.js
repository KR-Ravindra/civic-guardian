import React, { useState } from "react";
import { View, Text,Platform } from "react-native";
import Colors from "../style/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Manual from "./graph/manual"


const MainScreen = ({ navigation }) => {
  const [isModalVisible,setIsModalVisible]=useState(false)

  const goToTabNavigator = () => {
      navigation.navigate('Tab');
  };

  const  toggleModal = () => {
    setIsModalVisible(true)
  };
  
  
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <View
        style={{ justifyContent: "center", alignItems: "flex-end", margin: 10 }}
      >
        <TouchableOpacity onPress={()=>{toggleModal()}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.orange,
              textDecorationLine: "underline",
            }}
          >
            Learn
          </Text>
        </TouchableOpacity>
      </View>
      {isModalVisible && <Manual isVisible={isModalVisible} onClosePress={()=>closeModal()}/>}

      <View
        style={{ flex: 1, paddingHorizontal: 140, justifyContent: "center" }}
      >
        <Text
          style={{ fontSize: 30, fontWeight: "bold", color: Colors.orange }}
        >
          Civic-Guardian
        </Text>
        <TouchableOpacity onPress={goToTabNavigator}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.orange,
              textDecorationLine: "underline",
            }}
          >
            Get-started
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MainScreen;
