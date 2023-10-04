async function floydWarshall(nodes) {
    // makes a fetch call to localhost:8000/api/floyd_warshall
    console.log("Nodes are", nodes)
    const nodesList = nodes.map(node => ({ id: node.key, ...node }));
    console.log("Nodes list is", nodesList)
    const payload = {
        data: nodesList
    }
    console.log("Payload is", payload)

    let url = "http://localhost:8000/getBestWayPoint"

    fetch(url, {
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
    .then(data => {
        console.log("Data from backend :", data.latlng);
        return data.latlng;
    })
}

export default floydWarshall;