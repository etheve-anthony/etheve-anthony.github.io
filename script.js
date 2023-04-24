var map = L.map('map').setView([-21.19941657701768, 55.40958927791028], 20);

L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=7a0c2b23260c48929bee4682f83a4982', {
    maxZoom: 22,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// https://tile.openstreetmap.org/{z}/{x}/{y}.png
