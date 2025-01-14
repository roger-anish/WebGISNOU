const btn1_dom= document.querySelector('#btn1'); //css based query
        btn1_dom.addEventListener('click',function(){
            alert('OMG!!!');
        })

// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [40.71, -74],
    zoom: 15
});

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var world_map = L.tileLayer.wms("http://localhost:8080/geoserver/ne/wms?service=WMS", {
    layers: 'ne:world',
    format: 'image/png',
    transparent: true,
    attribution: "Political map of the world"
});

var Manhattan = L.tileLayer.wms("http://localhost:8080/geoserver/tiger/wms?service=WMS", {
    layers: 'tiger:poi',
    format: 'image/png',
    transparent: true,
    attribution: "Manhattan (NY) points of interest",
    // cql_filter: "NAME='lox'"
}).addTo(map);

// for cql filter in wms layer
const showloc=function(){
    const selctedval = document.getElementById("name").value;  // to extract the name of the attribute
    // console.log(selctedval);  // eg: lox
    const cqlfil =`NAME = '${selctedval}'`;  // for creating cql filter value
    // console.log(cqlfil); // eg: NAME='lox'
    Manhattan.setParams({cql_filter:cqlfil});
};

const mylocoptions={

}
// marker with popup info on click
const mylocation=L.marker([28.25, 85.45]).bindPopup('Default location');

console.log(mylocation.getLatLng());

L.control.scale({maxWidth:100}).addTo(map);
// lager toggle section
var baseLayers = {
    "OSM": tiles,
    "Imagery":Esri_WorldImagery,
    "World Map":world_map,
};
var overlays = {
    "Default Location": mylocation,
    "Manhattan": Manhattan
    // "Roads": roadsLayer
};
L.control.layers(baseLayers, overlays).addTo(map);