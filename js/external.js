const btn1_dom= document.querySelector('#btn1'); //css based query
        btn1_dom.addEventListener('click',function(){
            alert('OMG!!!');
        })

// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [28.25, 85.45],
    zoom: 7
});

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var nexrad = L.tileLayer.wms("http://localhost:8080/geoserver/nurc/wms", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
    // cql_filter: " "
});

const mylocoptions={

}

const mylocation=L.marker([28.25, 85.45]).addTo(map);

console.log(mylocation.getLatLng());

L.control.scale({maxWidth:100}).addTo(map);

var baseLayers = {
    "OSM": tiles,
    "Nexrad": nexrad
};

var overlays = {
    "Marker": mylocation,
    // "Roads": roadsLayer
};

L.control.layers(baseLayers, overlays).addTo(map);