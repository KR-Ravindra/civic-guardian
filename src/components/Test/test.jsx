import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import wayPointsData from './constant';


export default class TestScreen extends Component{

    state = {
        nearbyHubs : []
    }

    generateWaypoints() {
        
    }


    componentDidMount(){
        fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.90066,-117.88738&radius=2000&key=AIzaSyDiv6M-NdA1H0TzTzg6mP1apkD9PzOuKCY")
        .then(response => {
            if (response.ok){
                return response.json()
            }
        })
        .then(data => {
            let hub = []
            data.results.forEach((object, index) => {
                hub.push([object.geometry.location.lat, object.geometry.location.lat, object.name] )

            })
            this.setState({nearbyHubs: hub}, ()=>{console.log(this.state.hub)})

        })
        .catch(error => {
            console.error("Error Fetching Data", error)
        })

    }
    render(){

        const HubWayPoints = this.state.nearbyHubs.map((data, i) => {
            return(
                <Text>{i + "-" + data[0] + " " + data[1] + " " + data[2]}</Text>    
                )
                    
        })
  

    return(
        <SafeAreaView style={styles.container}>
            <Text>API Calls TEST</Text>
            {/* <Text>{this.state.nearbyHubs}</Text> */}
            {HubWayPoints}
        </SafeAreaView>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

