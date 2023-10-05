import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../style/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      isButtonDisabled: false,
    };
  }
  handleButtonClick = () => {
    this.setState({ isButtonDisabled: true });
  };
  render() {
    let {isButtonDisabled}=this.state
    return (
      <View style={styles.container}>
        {!isButtonDisabled && (
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleButtonClick}
          >
            <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons name="graphql" size={24} color={Colors.white}  style={{marginRight:10}}/>
                <Text style={styles.buttonText}>Simulation</Text>
            </View>
        
          </TouchableOpacity>
        )}
         {isButtonDisabled && (
          <TouchableOpacity
            style={styles.disableBtn}
          >
             <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons name="graphql" size={24} color={Colors.white} style={{marginRight:10}}/>
                <Text style={styles.buttonText}>Simulation</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: Colors.orange,
    padding: 8,
    margin: 5,
    borderRadius: 5,
    height: 35,
    width: "20%",
  },
  disableBtn:{
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