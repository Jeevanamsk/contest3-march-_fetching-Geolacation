// Get HTML elements
const getLocationButton = document.getElementById("getLocationButton");
const removeLocationButton = document.getElementById("removeLocationButton");
const mapDiv = document.getElementById("map");

// Check if location is already stored in local storage
if (localStorage.getItem("lat") && localStorage.getItem("long")) {
  getLocationButton.disabled = true; // Disable the button
  showMap(localStorage.getItem("lat"), localStorage.getItem("long")); // Display the map
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
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=API_KEY&center=${lat},${long}&zoom=16`;
  mapDiv.innerHTML = `<iframe src="${mapUrl}" width="500" height="400" frameborder="0" style="border:0;" allowfullscreen=""></iframe>`;
}

// Define removeLocation function
function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  getLocationButton.disabled = false;
  mapDiv.innerHTML = "";
}
