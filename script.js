
// Première carte

var map = L.map('map').setView([-21.19941657701768, 55.40958927791028], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function(e){
    console.log("latitude: " + e.latlng.lat + ", Longitude:" + e.latlng.lng);
});



// deuxième carte

// var map2 = L.map('map2').setView([-21.34620549179757, 55.4930457293825], 20);

// L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=7a0c2b23260c48929bee4682f83a4982', {
//     maxZoom: 22,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map2);


// https://tile.openstreetmap.org/{z}/{x}/{y}.png
// https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=7a0c2b23260c48929bee4682f83a4982
