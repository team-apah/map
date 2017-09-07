var mymap = L.map('mapid', {
    center: [39.0000085454, -89.9999783845],
    maxZoom: 14,
    minZoom: 11
});

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; <a href="http://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f">Esri</a> &mdash; See credits | Search data &copy; <a href="https://nominatim.openstreetmap.org/">OpenStreetMap</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

var maxBounds = L.latLngBounds(
    L.latLng(38.653955, -90.278200), //Southwest Madison County Bounds
    L.latLng(39.002185, -89.591555) //Northeast Madison County Bounds
);

mymap.setMaxBounds(maxBounds);
mymap.fitBounds(maxBounds);

mymap.zoomControl.setPosition('topleft');

mymap.addControl( new L.Control.Search({
    url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon'],
    marker: L.circleMarker([0,0],{radius:7}),
    autoCollapse: true,
    autoType: false,
    minLength: 2,
    position: "topleft"
}) );

// Add WotUS Tiles
var tile_options = {
    tms: true,
    opacity: 1,
    attribution: "",
    maxNativeZoom: 13
};

var lyr20k = L.tileLayer('tiles/20000_wotus_tiles/{z}/{x}/{y}.png', tile_options);
var lyr15k = L.tileLayer('tiles/15000_wotus_tiles/{z}/{x}/{y}.png', tile_options);
var lyr10k = L.tileLayer('tiles/10000_wotus_tiles/{z}/{x}/{y}.png', tile_options);
var lyr5k = L.tileLayer('tiles/5000_wotus_tiles/{z}/{x}/{y}.png', tile_options);

var overlaymaps = {
    "20,000": lyr20k,
    "15,000": lyr15k,
    "10,000": lyr10k,
    "5,000": lyr5k,
    "No overlay": ""
};

var groupedOverlays = {
    "Q/Threshold": overlaymaps
};

L.control.groupedLayers([], groupedOverlays, {
    exclusiveGroups: ["Q/Threshold"],
    collapsed: false,
    position: "bottomleft"
}).addTo(mymap);

window.onload = function () {
    if (!localStorage.getItem("hasCodeRunBefore") == true) {
        localStorage.setItem("hasCodeRunBefore", true);
    } else {
        $('#wotusWelcome').attr('class', 'hidden');
    }
}

function closeWelcome() {
    $('#wotusWelcome').fadeOut(1000);
}

// Clicking on the Map gives a popup for a link to Google Maps
mymap.on('click', function(e) {        
    var popLocation = e.latlng;
    var popup = L.popup()
        .setLatLng(popLocation)
        .setContent(gmaps_content(e.latlng))
        .openOn(mymap);        
});
