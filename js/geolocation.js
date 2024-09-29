let map;
let marker;

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    const positionAsJson = JSON.stringify(position, null, 2);
    document.getElementById("position").innerHTML = `${positionAsJson}`;

    displayMap(position);
}

function displayMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    map = L.map('map').setView([latitude, longitude], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    marker = L.marker([latitude, longitude]).addTo(map);
}