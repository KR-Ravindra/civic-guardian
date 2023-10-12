import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


function getHubs(current_location)  {
    console.log("Hubs called with current location as ", current_location)
    let hub = []
    const apiKey = "AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E"

    let finalURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${current_location.latitude},${current_location.longitude}&radius=10000&type=gas_station&key=${apiKey}`;
    if (Platform.OS === "web") {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      finalURL = `${proxyUrl}${finalURL}`;
    }

    fetch(`${finalURL}`)
    .then(response => {
        if (response.ok){
            return response.json()
        }
    })
    .then((data) => {
        data.results.forEach((object, index) => {
          if (index < 5) {
          hub.push({
            latlng: {
              latitude: object.geometry.location.lat,
              longitude: object.geometry.location.lng,
            },
            title: object.name,
            description: object.types[0],
            id: index+1
          }); 
        }
        });
        console.log("Hubs are ", hub)
        if (Platform.OS === "web") {
          hub.push(JSON.parse(localStorage.getItem('origin')));
          hub.push(JSON.parse(localStorage.getItem('destination')));
          localStorage.setItem('nodes', JSON.stringify(hub));
          localStorage.setItem('hub', JSON.stringify(hub));
        }
        
        if (Platform.OS === "android" || Platform.OS === "ios") {
          return Promise.all([
            AsyncStorage.getItem('origin'),
            AsyncStorage.getItem('destination')
          ]).then(([origin, destination]) => {
            hub.push(JSON.parse(origin));
            hub.push(JSON.parse(destination));
            AsyncStorage.setItem("nodes", JSON.stringify(hub));
            AsyncStorage.setItem("hub", JSON.stringify(hub));
            return hub;
          });
        }

        return hub;
      })
      .catch((error) => {
        console.error("Error Fetching Data Here", error);
      });
    
    return hub;

  }

export default getHubs;