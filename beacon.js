// Obtenir les références des éléments HTML
const output = document.getElementById("output");
const scanButton = document.getElementById("scanButton");

// Définir les variables de position des balises
const beaconPositions = {
  "beacon1": {x: 0, y: 0},
  "beacon2": {x: 10, y: 0},
  "beacon3": {x: 0, y: 10},
};

// Scanner les balises BLE
scanButton.addEventListener("click", async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }]
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('battery_service');
    const characteristic = await service.getCharacteristic('battery_level');
    const value = await characteristic.readValue();
    console.log(value);
  } catch(error) {
    console.error(error);
  }
});

// Calculer la position du smartphone en utilisant la triangulation
function calculatePosition(r1, r2, r3) {
  const a = beaconPositions.beacon1.x;
  const b = beaconPositions.beacon1.y;
  const c = beaconPositions.beacon2.x;
  const d = beaconPositions.beacon2.y;
  const e = beaconPositions.beacon3.x;
  const f = beaconPositions.beacon3.y;

  const A = -2 * a + 2 * c;
  const B = -2 * b + 2 * d;
  const C = r1 * r1 - r2 * r2 - a * a + c * c - b * b + d * d;
  const D = -2 * c + 2 * e;
  const E = -2 * d + 2 * f;
  const F = r2 * r2 - r3 * r3 - c * c + e * e - d * d + f * f;

  const x = (C * E - F * B) / (E * A - B * D);
  const y = (C * D - A * F) / (B * D - A * E);

  return { x, y };
}

// La fonction calculatePosition est utilisée pour calculer la position d'un smartphone à partir de distances mesurées à partir de balises Bluetooth. Elle prend en entrée les distances mesurées aux trois balises, respectivement r1, r2 et r3.

// La méthode utilisée pour calculer la position est la triangulation. Cette méthode consiste à utiliser les distances mesurées aux balises pour déterminer la position du smartphone en calculant l'intersection de trois cercles centrés sur les balises. Cette intersection correspond à la position du smartphone.

// Dans cette fonction, les coordonnées des balises sont stockées dans l'objet beaconPositions. Les coordonnées de chaque balise sont stockées sous la forme d'un objet avec les propriétés x et y.

// La fonction calcule ensuite les coefficients A, B et C de l'équation d'un cercle centré sur la première balise, ainsi que les coefficients D, E et F pour les cercles centrés sur la deuxième et la troisième balise.

// Enfin, la fonction résout un système d'équations pour déterminer les coordonnées x et y de l'intersection des trois cercles, ce qui correspond à la position du smartphone. Ces coordonnées sont retournées sous la forme d'un objet avec les propriétés x et y.

// Afficher la position du smartphone dans la console (Mettre à jour la position toutes les 5 secondes)
// function updatePosition(r1, r2, r3) {
//     setInterval(() => {
//         const position = calculatePosition(r1, r2, r3);
//         output.innerHTML = `Position: (${position.x}, ${position.y})`;
//       }, 5000);
// }

// Ajouter un fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

// Créer un marqueur pour représenter la position du smartphone
const marker = L.marker([position.x, position.y]).addTo(map);

// Mettre à jour la position du marqueur toutes les 5 secondes
function updatePosition(r1, r2, r3) {
setInterval(() => {
  const position = calculatePosition(r1, r2, r3);
  marker.setLatLng([position.x, position.y]);
}, 5000);
}

// Utiliser les données reçues pour calculer la position du smartphone
function processData(data) {
  const r1 = data.beacon1;
  const r2 = data.beacon2;
  const r3 = data.beacon3;
  updatePosition(r1, r2, r3);
}

// Écouter les données émises par les balises et les traiter
navigator.bluetooth.addEventListener("advertisementreceived", (event) => {
    const data = event.manufacturerData;
    if (data && data.byteLength === 9 && data.getUint8(0) === 0x02 && data.getUint8(1) === 0x15) {
      const beacon1 = data.getUint32(2, false) / 1000;
      const beacon2 = data.getUint32(6, false) / 1000;
      const beacon3 = data.getUint32(10, false) / 1000;

      // Appeler la fonction de calcul de position avec les distances mesurées aux balises
      const position = calculatePosition(beacon1, beacon2, beacon3);

      // Afficher la position dans la console
      console.log("Position:", position);
    }
  });


