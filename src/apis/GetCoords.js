function fetchRouteData(originLatLong, waypointLatLong, destinationLatLong) {
    console.log("Function is called");
    console.log("Waypoint in fetchRouteData is", waypointLatLong);

    const origin = `${originLatLong.latitude},${originLatLong.longitude}`;
    const destination = `${destinationLatLong.latitude},${destinationLatLong.longitude}`;
    const waypoint = `${waypointLatLong.latitude},${waypointLatLong.longitude}`;
    // Update the proxy URL to "CORS Anywhere"
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiKey = "AIzaSyA0P4DLkwK2kdikcnu8NPS69mvYfwjCQ_E";
    // Construct the URL for the Google Directions API request
    const apiUrl = `${proxyUrl}https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&waypoints=${waypoint}&destination=${destination}&key=${apiKey}`;
    //  const apiUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&waypoints=${waypoint}&destination=${destination}&key=${apiKey}`;

    function extractcoords(overviewPolyline) {
        try {
          if (
            overviewPolyline &&
            window.google &&
            window.google.maps &&
            window.google.maps.geometry &&
            window.google.maps.geometry.encoding
          ) {
            // Decode the encoded polyline and return an array of coordinates
            const points = window.google.maps.geometry.encoding.decodePath(
              overviewPolyline.points
            );
            if (points && points.length > 0) {
              return points.map((point) => [point.lat(), point.lng()]);
            } else {
              console.error("No points found in the decoded polyline");
              // Return an empty array or handle this case according to your needs
              return [];
            }
          } else {
            console.error(
              "Google Maps JavaScript API not loaded or encoding library not available"
            );
            // Return an empty array or handle this case according to your needs
            return [];
          }
        } catch (error) {
          console.error("Error decoding polyline:", error);
          // Return an empty array or handle this case according to your needs
          return [];
        }
      }
    // Make an API request to the Google Directions API
    fetch(apiUrl)
      .then((response) => response.text()) // Get the response body as text
      .then((data) => {
        const parsedData = JSON.parse(data); // Parse the JSON string into an object
        if (parsedData.routes && parsedData.routes.length > 0) {
          // Extract route coordinates from the parsed data
          const coords = extractcoords(
            parsedData.routes[0].overview_polyline
          );
          console.log("Coords are ", coords)
          return coords;
        }
      })
      .catch((error) => {
        console.error("Error fetching route with routes api:", error);
      });
  }

export default fetchRouteData;