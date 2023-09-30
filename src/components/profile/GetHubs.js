function getHubs(current_location)  {
    let hub = []

    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
 
    fetch(`${proxyUrl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${current_location.latitude},${current_location.longitude}&radius=2000&key=AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E`)
    .then(response => {
        if (response.ok){
            return response.json()
        }
    })
    .then((data) => {
        data.results.forEach((object, index) => {
          hub.push({
            latlng: {
              latitude: object.geometry.location.lat,
              longitude: object.geometry.location.lng,
            },
            title: object.name,
            description: object.types[0],
          });
        });
        console.log("Hubs:", hub);
        return hub;
      })
      .catch((error) => {
        console.error("Error Fetching Data", error);
      });

    return hub;
  }

export default getHubs;