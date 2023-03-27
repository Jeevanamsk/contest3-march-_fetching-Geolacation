// Get HTML elements
const getLocationButton = document.getElementById("getLocationButton");
const removeLocationButton = document.getElementById("removeLocationButton");
const mapDiv = document.getElementById("map");

// Check if location is already stored in local storage
if (localStorage.getItem("lat") && localStorage.getItem("long")) {
  getLocationButton.disabled = true; 
  removeLocationButton.disabled = false; // Disable the button
  showMap(localStorage.getItem("lat"), localStorage.getItem("long")); // Display the map
}
else{
  removeLocationButton.disabled = true; 
}

// Add event listeners to buttons
getLocationButton.addEventListener("click", getLocation);
removeLocationButton.addEventListener("click", removeLocation);

// Define getLocation function
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  removeLocationButton.disabled = false;
}

// Define showPosition function
function showPosition(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  // Store location in local storage
  localStorage.setItem("lat", lat);
  localStorage.setItem("long", long);

  // Disable the button
  getLocationButton.disabled = true;
  

  // Display the map
  showMap(lat, long);
}

// Define showError function
function showError(error) {
  alert(`Error ${error.code}: ${error.message}`);
}

// Define showMap function
function showMap(lat, long) {
  const mapUrl = `https://maps.google.com/maps?q=${lat},${long}&output=embed`;
  mapDiv.innerHTML = `<iframe src="${mapUrl}" width="1840" height="780" frameborder="0" style="border:0;padding-left:10px" allowfullscreen=""></iframe>`;
}

// Define removeLocation function
function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  getLocationButton.disabled = false;
  
  mapDiv.innerHTML = "";
  removeLocationButton.disabled = true;
}
//removeLocationButton.disabled = true;
