import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, Button } from 'react-native';
import ErrorBoundary from '../errorBoundry';
import ShowMapScreen from './ShowMapComponent';
import getHubs from '../../apis/GetHubs';
import floydWarshall from '../../apis/FloydWarshallNode';

const MainMapScreen = () => {
    const dummyMarkers = [
      {
        latlng: {
          latitude: 33.8704,
          longitude: -117.9242,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 1",
        description: "Marker Description 1",
      },
      {
        latlng: {
          latitude: 33.875,
          longitude: -117.926,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 2",
        description: "Marker Description 2",
      },
      {
        latlng: {
          latitude: 33.865,
          longitude: -117.928,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 3",
        description: "Marker Description 3",
      },
      {
        latlng: {
          latitude: 33.872,
          longitude: -117.921,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 4",
        description: "Marker Description 4",
      },
      {
        latlng: {
          latitude: 33.869,
          longitude: -117.923,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        title: "Marker Title 5",
        description: "Marker Description 5",
      },
    ];

    const [newMarkers,setNewMarkers] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [bestWaypoint, setBestWaypoint] = useState({});
    let origin = null;
    let destination = null;

    const [stateOfMap, setStateOfMap] = useState({});
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Current location is ", position.coords);
          const { latitude, longitude } = position.coords;
          console.log("Registered location is ", latitude, longitude);
          const currentLocation = { "latitude": latitude, "longitude": longitude };
          console.log("Current location is ", currentLocation);
          setNewMarkers(getHubs(currentLocation))
        },
        (error) => {
          console.log("Error getting current location:", error);
        }
      )
    }, []);

    useEffect(() => {
      if (newMarkers) {
        console.log("Second Effect is triggered")
      const autoDestination = dummyMarkers[dummyMarkers.length - 1];
      const autoOrigin = dummyMarkers[dummyMarkers.length - 2];
      
      console.log("Auto Origin is ", autoOrigin.latlng.latitude)

      const destination = { "latitude": autoDestination.latlng.latitude, "longitude": autoDestination.latlng.longitude};
      const origin = { "latitude": autoOrigin.latlng.latitude, "longitude": autoOrigin.latlng.longitude};
      console.log("Destination marker:", destination);
      console.log("Origin marker:", origin);
      console.log("New Markers are ", newMarkers)
      }
    }, [newMarkers]);

    useEffect(() => {
      if (origin && destination) {
        console.log("Third Effect is triggered")
        setStateOfMap({
          coords: [],
          region: {
            latitude: destination.latitude,
            longitude: destination.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          origin: origin,
          destination: destination,
          markers: [],
          googleMapsLoaded: false,
          plot: {
            draw: false,
            origin: { latitude: origin.latitude, longitude: origin.longitude },
            destination: { latitude: destination.latitude, longitude: destination.longitude },
            waypoint: {latitude: 33.8589565, longitude: -117.9589782}
          }
        });
        console.log("State of map is ", stateOfMap)
      }
    }, [newMarkers]);

    if (!isLoading) {
      console.log("Loading is False")
      return <Text> Loading... </Text>;
    }

    const handleGenerateWay = () => {
      setIsLoading(true);
      // Call the API to get the best waypoint
      // Once the response is received, set the bestWaypoint state variable and setIsLoading to false
      floydWarshall(newMarkers).then((response) => {
        console.log("Response from API is ", response);
        setBestWaypoint(response);
        setIsLoading(false);
        // Update the stateOfMap object with the newMarkers and bestWaypoint values
        setStateOfMap({...stateOfMap,markers: newMarkers, googleMapsLoaded: true, plot: {...stateOfMap.plot, draw: (!stateOfMap.plot.draw), waypoint: response }});
      }).catch((error) => {
        console.log("Error from API is ", error);
        setIsLoading(false);
      });
    };

    return (
        <View style={styles.container}>
        <ErrorBoundary>
          <View style={styles.container}>
           { isLoading ? (<Text>Loading...</Text>) : (
          <ShowMapScreen 
            stateOfMap={stateOfMap} 
            onPressMarkers={() => { setStateOfMap({...stateOfMap,markers: dummyMarkers, googleMapsLoaded: true} )}}
            onPressPlotter={() => { handleGenerateWay(); }}
             ></ShowMapScreen>)}
            {isLoading && console.log("Loading with best waypoint as ", bestWaypoint.latlng)}
          </View>
        </ErrorBoundary>
        </View>
  );
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button:{
    marginTop: 60, 
    left: 20, 
    backgroundColor: 'Black',
    height: 40, 
    width: 150
  }
});

export default MainMapScreen;