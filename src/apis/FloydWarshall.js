async function floydWarshall(nodes) {
    // makes a fetch call to localhost:8000/api/floyd_warshall
    let waypoint = {};
    console.log("Nodes are", nodes)
    const nodesList = nodes.map(node => ({ id: node.key, ...node }));
    console.log("Nodes list is", nodesList)
    const payload = {
        data: nodesList
    }
    console.log("Payload is", payload)

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
        waypoint = data;
        return data;
    })
    .catch(error => {
        console.log("Error from backend :", error);
    });
    console.log("waypoint is ", waypoint)
    return waypoint;
}

export default floydWarshall;