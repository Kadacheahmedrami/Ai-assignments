// The array of Algerian cities
const algerianCities = [
  "Algiers",
  "Oran",
  "Constantine",
  "Annaba",
  "Blida",
  "Batna",
  "Tlemcen",
  "Tizi Ouzou",
  "Sétif",
  "Biskra",
  "Sidi Bel Abbès",
  "Skikda",
  "Béjaïa",
  "Béchar",
  "Djelfa",
  "Ouargla",
  "Ghardaïa",
  "Médéa",
  "Tébessa",
  "Mostaganem",
  "Tipaza",
  "Mascara",
  "Relizane",
  "Oum El Bouaghi",
  "Illizi",
  "Khenchela",
  "Souk Ahras",
  "Tiaret",
  "Naama",
  "Adrar",
  "Laghouat",
  "Tamanrasset",
  "Mila",
  "El Oued",
  "Guelma",
  "Tindouf",
  "Bordj Bou Arreridj",
  "El Bayadh",
  "Aïn Defla",
  "Tissemsilt",
  "El Tarf",
  "Chlef",
  "Aïn Témouchent",
  "Bordj Menaïel",
  "M'sila",
  "Ouled Djellal",
  "Bou Saâda",
  "Bordj El Kiffan",
  "Bir Mourad Raïs",
  "El Biar",
  "Bab Ezzouar",
  "Beni Messous",
  "Chéraga",
  "Dely Brahim",
  "Draria",
  "Saoula",
  "Birkhadem",
  "Kouba",
  "Ain Naadja",
  "El Harrach",
  "Bachdjarrah"
];
const fs = require('fs');

/**
 * Function to fetch city coordinates from OpenStreetMap Nominatim API
 * Note: When using this in production, be mindful of usage policies
 * https://operations.osmfoundation.org/policies/nominatim/
 */
async function fetchCityCoordinates(cityName) {
  const searchQuery = `${cityName}, Algeria`;
  const encodedQuery = encodeURIComponent(searchQuery);
  const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&limit=1`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'AlgerianCitiesDataCollection/1.0',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    } else {
      console.warn(`No coordinates found for ${cityName}`);
      return { lat: 0, lon: 0 };
    }
  } catch (error) {
    console.error(`Error fetching coordinates for ${cityName}:`, error);
    return { lat: 0, lon: 0 };
  }
}

/**
 * Process all cities with a delay to respect API rate limits
 */
async function processAlgerianCities() {
  const result = [];
  let id = 1001;

  for (const cityName of algerianCities) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Fetching data for ${cityName}...`);
    const coords = await fetchCityCoordinates(cityName);
    result.push({ id, name: cityName, lat: coords.lat, lon: coords.lon });
    id++;
  }

  return result;
}

/**
 * Save the results to a file
 */
async function saveResultsToFile(filename, data) {
  try {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Data successfully saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving data to file: ${error}`);
  }
}

/**
 * Format and output the results
 */
async function displayResults() {
  try {
    console.log("Starting to fetch real coordinates for Algerian cities...");
    const cities = await processAlgerianCities();

    saveResultsToFile('algerian_cities.json', cities);

    console.log(`Successfully processed and saved ${cities.length} cities.`);
    return cities;
  } catch (error) {
    console.error("Error in processing:", error);
  }
}



displayResults();
