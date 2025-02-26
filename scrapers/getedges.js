// Array of Algerian cities with their coordinates
const algerianCities = [
    { "id": 1001, "name": "Algiers", "lat": 0, "lon": 0 },
    { "id": 1002, "name": "Oran", "lat": 35.7044415, "lon": -0.6502981 },
    { "id": 1003, "name": "Constantine", "lat": 36.3641642, "lon": 6.6084281 },
    { "id": 1004, "name": "Annaba", "lat": 36.8982165, "lon": 7.7549272 },
    { "id": 1005, "name": "Blida", "lat": 36.4705658, "lon": 2.8274937 },
    { "id": 1006, "name": "Batna", "lat": 35.3384291, "lon": 5.731545299000572 },
    { "id": 1007, "name": "Tlemcen", "lat": 34.881789, "lon": -1.316699 },
    { "id": 1008, "name": "Tizi Ouzou", "lat": 36.6816175, "lon": 4.237186047040007 },
    { "id": 1009, "name": "Sétif", "lat": 36.1893494, "lon": 5.4046876 },
    { "id": 1010, "name": "Biskra", "lat": 34.8508816, "lon": 5.729074 },
    { "id": 1011, "name": "Sidi Bel Abbès", "lat": 34.682268, "lon": -0.43575550651239253 },
    { "id": 1012, "name": "Skikda", "lat": 36.8801317, "lon": 6.9077363 },
    { "id": 1013, "name": "Béjaïa", "lat": 36.7511783, "lon": 5.0643687 },
    { "id": 1014, "name": "Béchar", "lat": 31.385726, "lon": -2.011595847987405 },
    { "id": 1015, "name": "Djelfa", "lat": 34.342841, "lon": 3.217253079090331 },
    { "id": 1016, "name": "Ouargla", "lat": 30.9980145, "lon": 6.766453639443059 },
    { "id": 1017, "name": "Ghardaïa", "lat": 32.440827, "lon": 3.5618208521628776 },
    { "id": 1018, "name": "Médéa", "lat": 35.975204500000004, "lon": 3.012350405608216 },
    { "id": 1019, "name": "Tébessa", "lat": 35.124945, "lon": 7.901173504229375 },
    { "id": 1020, "name": "Mostaganem", "lat": 35.928808, "lon": 0.089978 },
    { "id": 1021, "name": "Tipaza", "lat": 36.527157, "lon": 2.1672011802712086 },
    { "id": 1022, "name": "Mascara", "lat": 35.397838500000006, "lon": 0.24301949927219488 },
    { "id": 1023, "name": "Relizane", "lat": 35.836318500000004, "lon": 0.9118537366540664 },
    { "id": 1024, "name": "Oum El Bouaghi", "lat": 35.8105805, "lon": 7.018417796577514 },
    { "id": 1025, "name": "Illizi", "lat": 27.852850500000002, "lon": 7.8189636047396895 },
    { "id": 1026, "name": "Khenchela", "lat": 34.913345500000005, "lon": 6.905943093880865 },
    { "id": 1027, "name": "Souk Ahras", "lat": 36.1378681, "lon": 7.826242640053763 },
    { "id": 1028, "name": "Tiaret", "lat": 34.8947575, "lon": 1.594579173136212 },
    { "id": 1029, "name": "Naama", "lat": 33.2336851, "lon": -0.8151958390775952 },
    { "id": 1030, "name": "Adrar", "lat": 26.4888155, "lon": -1.3582442169365363 },
    { "id": 1031, "name": "Laghouat", "lat": 33.750440499999996, "lon": 2.6431093610595155 },
    { "id": 1032, "name": "Tamanrasset", "lat": 24.3753438, "lon": 4.3208436 },
    { "id": 1033, "name": "Mila", "lat": 36.2502135, "lon": 6.165216333385166 },
    { "id": 1034, "name": "El Oued", "lat": 33.215441, "lon": 7.155321399098325 },
    { "id": 1035, "name": "Guelma", "lat": 36.3491635, "lon": 7.409498952760461 },
    { "id": 1036, "name": "Tindouf", "lat": 27.54390695, "lon": -6.240041058655946 },
    { "id": 1037, "name": "Bordj Bou Arreridj", "lat": 36.09620285, "lon": 4.660274234539607 },
    { "id": 1038, "name": "El Bayadh", "lat": 32.570302999999996, "lon": 1.1259581442818078 },
    { "id": 1039, "name": "Aïn Defla", "lat": 36.15868425, "lon": 2.084281730358365 },
    { "id": 1040, "name": "Tissemsilt", "lat": 35.785897500000004, "lon": 1.8340956752427218 },
    { "id": 1041, "name": "El Tarf", "lat": 36.67135625, "lon": 8.070134002053635 },
    { "id": 1042, "name": "Chlef", "lat": 36.203419999999994, "lon": 1.2680696005416272 },
    { "id": 1043, "name": "Aïn Témouchent", "lat": 35.36512965, "lon": -0.9452170664335665 },
    { "id": 1044, "name": "Bordj Menaïel", "lat": 36.7432364, "lon": 3.7175665 },
    { "id": 1045, "name": "M'sila", "lat": 35.1300205, "lon": 4.200310671358427 },
    { "id": 1046, "name": "Ouled Djellal", "lat": 34.104904000000005, "lon": 4.820300902475401 },
    { "id": 1047, "name": "Bou Saâda", "lat": 35.2133123, "lon": 4.1809702 },
    { "id": 1048, "name": "Bordj El Kiffan", "lat": 36.747273, "lon": 3.1908953 },
    { "id": 1049, "name": "Bir Mourad Raïs", "lat": 36.7393938, "lon": 3.0500748 },
    { "id": 1050, "name": "El Biar", "lat": 36.7688818, "lon": 3.030651 },
    { "id": 1051, "name": "Bab Ezzouar", "lat": 36.7220068, "lon": 3.1856291 },
    { "id": 1052, "name": "Beni Messous", "lat": 36.7800963, "lon": 2.974557 },
    { "id": 1053, "name": "Chéraga", "lat": 36.7669269, "lon": 2.9602571 },
    { "id": 1054, "name": "Dely Brahim", "lat": 36.7516098, "lon": 2.9825732 },
    { "id": 1055, "name": "Draria", "lat": 36.7137875, "lon": 3.0015960670478896 },
    { "id": 1056, "name": "Saoula", "lat": 36.7027016, "lon": 3.0238994 },
    { "id": 1057, "name": "Birkhadem", "lat": 36.716075, "lon": 3.0497361 },
    { "id": 1058, "name": "Kouba", "lat": 36.7323557, "lon": 3.0874783 },
    { "id": 1059, "name": "Ain Naadja", "lat": 36.7024722, "lon": 3.0801951 },
    { "id": 1060, "name": "El Harrach", "lat": 36.7207974, "lon": 3.1373893 },
    { "id": 1061, "name": "Bachdjarrah", "lat": 36.7200591, "lon": 3.1126365 }
  ];
  
  /**
   * Get the driving distance between two points using the OSRM API.
   * Note: OSRM expects coordinates in the order lon,lat.
   * Returns the distance in kilometers.
   */
  async function getDrivingDistance(lat1, lon1, lat2, lon2) {
    // Build the API URL. Coordinates are passed as "lon,lat"
    const url = `http://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        // Distance is in meters – convert to kilometers.
        return data.routes[0].distance / 1000;
      } else {
        throw new Error("No route found");
      }
    } catch (error) {
      console.error("Error fetching driving distance:", error);
      // In case of an error, return a large number so it is not chosen as the closest route.
      return Infinity;
    }
  }
  
  /**
   * Find the closest city (based on real driving distance) to a given city.
   */
  async function findClosestCity(city, allCities) {
    let closestCity = null;
    let minDistance = Infinity;
  
    // Loop through every other city
    for (const otherCity of allCities) {
      if (city.id === otherCity.id) continue; // Skip the same city
  
      // Get the driving distance between the two cities
      const distance = await getDrivingDistance(
        city.lat, city.lon,
        otherCity.lat, otherCity.lon
      );
      console.log(`Driving distance from ${city.name} to ${otherCity.name}: ${distance.toFixed(2)} km`);
  
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = otherCity;
      }
    }
  
    return {
      start: city.id,
      destination: closestCity ? closestCity.id : null,
      distance: minDistance
    };
  }
  
  /**
   * Generate edges connecting each city to its closest neighbor.
   */
  async function generateClosestCityEdges(cities) {
    const edges = [];
  
    // Process each city one by one
    for (const city of cities) {
      const edge = await findClosestCity(city, cities);
      edges.push(edge);
    }
  
    return edges;
  }
  
  /**
   * Format the edges data for output.
   */
  function formatEdgesOutput(edges) {
    // Prepare a JSON object with just the start and destination IDs
    const edgesJson = {
      edges: edges.map(edge => ({
        start: edge.start,
        destination: edge.destination
      }))
    };
  
    // Create a detailed string output with city names and driving distances
    const detailedOutput = edges.map(edge => {
      const startCity = algerianCities.find(city => city.id === edge.start);
      const destCity = algerianCities.find(city => city.id === edge.destination);
      return `${startCity.name} (${edge.start}) -> ${destCity ? destCity.name : "None"} (${edge.destination}) [${edge.distance.toFixed(2)} km]`;
    }).join('\n');
  
    return {
      json: JSON.stringify(edgesJson, null, 2),
      detailed: detailedOutput
    };
  }
  
  /**
   * Main function to generate and display the edges.
   */
  async function main() {
    console.log("Calculating real driving distances. This may take a while...");
    const edges = await generateClosestCityEdges(algerianCities);
    const output = formatEdgesOutput(edges);
  
    console.log("\nEDGES JSON FORMAT:");
    console.log(output.json);
  
    console.log("\nDETAILED EDGES (with distances):");
    console.log(output.detailed);
  }
  
  // Run the main function
  main();
  