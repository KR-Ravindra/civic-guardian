import { Platform } from "react-native";

function getHubs(current_location)  {
    let hub = []
    const apiKey = "AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E"

    let finalURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${current_location.latitude},${current_location.longitude}&radius=2000&type=gas_station&key=${apiKey}`;
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
          }); 
        }
        });
        return hub;
      })
      .catch((error) => {
        console.error("Error Fetching Data Here", error);
      });
    
    console.log("Hubs:", hub);
    return hub;
  }

export default getHubs;