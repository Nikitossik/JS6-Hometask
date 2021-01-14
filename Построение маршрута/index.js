if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    let current_lat = position.coords.latitude;
    let current_lng = position.coords.longitude;
    let map = L.map("map");
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let x1 = 50.00695295;
    let y1 = 36.2367475;
    let control = L.Routing.control(
      L.extend(window.lrmConfig, {
        waypoints: [L.latLng(x1, y1), L.latLng(current_lat, current_lng)],
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true,
        reverseWaypoints: true,
        showAlternatives: true,
        altLineOptions: {
          styles: [
            { color: "black", opacity: 0.15, weight: 9 },
            { color: "white", opacity: 0.8, weight: 6 },
            { color: "blue", opacity: 0.5, weight: 2 }
          ]
        }
      })
    ).addTo(map);
    L.Routing.errorControl(control).addTo(map);
  });
}

