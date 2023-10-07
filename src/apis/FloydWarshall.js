
async function floydWarshall(nodes) {
    // makes a fetch call to localhost:8000/api/floyd_warshall
    console.log("FloydWarshall Called")
    let waypoint;
    const nodesList = nodes.map(node => ({ id: node.key, ...node }));
    const payload = {
        data: nodesList
    }

    let url = "http://localhost:8000/getBestWayPoint"

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok){
            return response.json()
        }
    })
    .then((data) => {
        console.log("Data: ", data);
        waypoint = getBestWaypoint(data);
        return waypoint;
    })
    .catch(error => {
        console.log("Error from backend :", error);
    });
    return waypoint;
}

function getBestWaypoint(data) {
    try{
        console.log("Returning ", data)
        return data.results;
    } catch {
        console.log("Error in getBestWaypoint");
        return null;
    }
}

export default floydWarshall;