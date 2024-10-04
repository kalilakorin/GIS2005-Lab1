// extra data set 
// Title of dataset: Street Centerlines
// https://open-data.bouldercolorado.gov/datasets/abb2aa4b70d548f88a8d58f58e92963c_0/explore?location=0.363878%2C74.756650%2C0.00

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1mcmltbWwiLCJhIjoiY20wZzdid3JyMTkweTJpb3J1YnJ6b3BkNiJ9.AIq8-_n3FX7v_45I0Ria3w";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/jmfrimml/cm1g0660r03xz01rbav7b1hzu", // style url
  center: [-105.25, 39.98], // starting position [long, lat]
  zoom: 16 // starting zoom
});

// Add zoom and rotation controls to the map.
const nav = new mapboxgl.NavigationControl({
  visualizePitch: true
})
map.addControl(nav, 'bottom-right');

// Add a scale bar to the map 
const scale = new mapboxgl.ScaleControl({
  maxWidth: 100,
  unit: 'imperial'
});
map.addControl(scale);

function getInputValue() {
  var userAddress = document.getElementById("userAddress").value;
  console.log("Address: " + userAddress);

  const Http = new XMLHttpRequest();
  const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const suffixUrl = ".json?access_token=";
  // Access token from mapbox account
  const access_token = "pk.eyJ1Ijoiam1mcmltbWwiLCJhIjoiY20wZzdid3JyMTkweTJpb3J1YnJ6b3BkNiJ9.AIq8-_n3FX7v_45I0Ria3w" 

  var async = false;
  var geocoderResults;
  var geocoderUrl = baseUrl + userAddress + suffixUrl + access_token;
  console.log("URL: " + geocoderUrl);

  Http.open("GET", geocoderUrl, async);

  Http.onreadystatechange = (e) => {
    geocoderResults = Http.responseText;  // info from the server
    console.log("ReadyState: " + Http.readyState);
    console.log("Status: " + Http.status);
    writeCoords(geocoderResults);
  }

  Http.send();
}

function writeCoords(geocoderResults) {
  let geoObj = JSON.parse(geocoderResults,(key, value)=>{
    return value;
  })
  console.log("GeoJson Object:");
  console.log(geoObj);
  
  console.log("Features:");
  let geoFeatures = geoObj.features;
  console.log(geoFeatures);

  console.log("Geo coordinate for 1st object:");
  let geoPt = geoFeatures[0].geometry.coordinates;
  console.log(geoPt);

  // go to the coordinates on map
  map.setCenter(geoPt);
  // display the coordinates
  displayCoords(geoPt)
}

function displayCoords(geoPt) {
  // Store the marker's longitude and latitude coordinates in a variable
  const lngLat = geoPt;
  coordinates.style.display = 'block';
  coordinates.innerHTML = `Centered Coordinates<br />Longitude: ${lngLat[0]}<br />Latitude: ${lngLat[1]}`;
  // Print the center longitude and latitude values in the console
  console.log(`Longitude: ${lngLat[0]}, Latitude: ${lngLat[1]}`);
}

function resetInputValue() {
  document.getElementById("userAddress").value = "";
  coordinates.style.display = '';
}