async function floydWarshallNode(nodes) {
    // makes a fetch call to localhost:8000/api/floyd_warshall
    const nodesList = nodes.map(node => ({ id: node.key, ...node }));
    console.log("Nodes list is ", nodesList)
    const payload = {
        data: nodesList
    }

    let url = "http://localhost:8000/getBestWayPoint"

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("fwmatrix", JSON.stringify(data["fwmatrix"]))
        const waypoint = getBestWaypoint(data);
        return waypoint;
    } else {
        console.log("Error from backend :", response.status);
        return null;
    }
}

function getBestWaypoint(data) {
    try{
        console.log("Returning best waypoint ", data)
        return data["node"]["latlng"];
    } catch {
        console.log("Error in getBestWaypoint");
        return null;
    }
}

export default floydWarshallNode;