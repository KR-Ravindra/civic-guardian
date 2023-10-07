async function floydWarshall(nodes) {
    // makes a fetch call to localhost:8000/api/floyd_warshall
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
        console.log("Type of data: ", data);
        const dict = {};
        for (const key in data) {
          dict[key] = data[key];
        }
        console.log("Dictionary: ", dict);
        waypoint = dict;
        return waypoint;
    })
    .catch(error => {
        console.log("Error from backend :", error);
    });
    return waypoint;
}

export default floydWarshall;