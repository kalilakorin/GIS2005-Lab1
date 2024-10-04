// extra data set 
// Title of dataset: Properties Managed by Parks and Recreation Polygons
// https://open-data.bouldercolorado.gov/datasets/fdfc0410e75c48b6b9e53cf94bdbe224_1/explore?location=40.026699%2C-105.234200%2C11.81
// Title of dataset: Street Centerlines
// https://open-data.bouldercolorado.gov/datasets/abb2aa4b70d548f88a8d58f58e92963c_0/explore?location=0.363878%2C74.756650%2C0.00

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam1mcmltbWwiLCJhIjoiY20wZzdid3JyMTkweTJpb3J1YnJ6b3BkNiJ9.AIq8-_n3FX7v_45I0Ria3w";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/jmfrimml/cm1g0660r03xz01rbav7b1hzu", // style url
  // center: [-105.25, 39.98], // starting position [long, lat]
  center: [-105.27155545946361, 40.018905853707025],
  // zoom: 14 // starting zoom
  zoom: 17.66
});

// Set a map marker with options.
const marker = new mapboxgl.Marker({
  color: "#CA3C1B",
  draggable: true
}).setLngLat([-105.25, 39.98])
  .addTo(map);
// Store the marker's longitude and latitude coordinates in a variable
// const lngLat = marker.getLngLat();
// Print the marker's longitude and latitude values in the console
// console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`);
function onDragEnd() {
  const lngLat = marker.getLngLat();
  coordinates.style.display = 'block';
  coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
}
// trigger the coordinate change when the map marker is dragged
marker.on('dragend', onDragEnd);

// Add zoom and rotation controls to the map.
const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
  // element(color, '#2C7FB8')
  // color: '#2C7FB8'
})
map.addControl(nav, 'bottom-right');

// Add a scale bar to the controls 
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

function resetInputValue() {
  document.getElementById("userAddress").value = "";
  document.getElementById("geoResults").innerHTML = "";
  document.getElementById("coordinates-table").innerHTML = "";
  document.getElementById("most-likely-coordinates").innerHTML = "";
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

  let geoPtText = "The most likely longitude and latitude is: " + geoPt[0] + ", " + geoPt[1];
  console.log(geoPtText);
  // go to the coordinates 
  map.setCenter(geoPt);
  // document.getElementById("most-likely-coordinates").innerHTML = geoPtText;
}

function resetInputValue() {
  document.getElementById("userAddress").value = "";
}