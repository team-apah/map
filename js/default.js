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

mymap.zoomControl.setPosition('bottomleft');

// Clicking on the Map gives a popup for a link to Google Maps
mymap.on('click', function(e) {
    var popLocation = e.latlng;
    var popup = L.popup()
        .setLatLng(popLocation)
        .setContent(gmaps_content(e.latlng))
        .openOn(mymap);
});

function closeWelcome() {
    localStorage.setItem('hasRun', 'true');
    $('#wotusWelcome').fadeOut(1000);
}

function closeWait() {
    $('#wotusWait').attr('class', 'hidden');
}

// Slider
$('#slider').on('input',function(){
   $("#slider-text").get(0).MaterialTextfield.change(this.value);
   $("#number-input").focus();
});
$('#number-input').keyup(function() {
   $("#slider").get(0).MaterialSlider.change($( '#number-input').val());
});

// Sumbit
$("#submit-button").click(function() {
    console.log();

    mymap.eachLayer(function (layer) {
        mymap.removeLayer(layer);
    });

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; <a href="http://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f">Esri</a> &mdash; See credits | Search data &copy; <a href="https://nominatim.openstreetmap.org/">OpenStreetMap</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    $('#wotusWait').attr('class', 'transparent-overlay');
    $('#submit-button').attr('disabled', 'disabled');
    $('#clear-button').attr('disabled', 'disabled');
    $('#spinner').addClass('is-active');

    setTimeout(function() {
        if ($("#number-input").val() > 15000) {
            L.tileLayer('tiles/20000_wotus_tiles/{z}/{x}/{y}.png', {
                tms: true,
                opacity: 1,
                attribution: "",
                maxNativeZoom: 13}).addTo(mymap);
        } else if ($("#number-input").val() > 10000) {
            L.tileLayer('tiles/15000_wotus_tiles/{z}/{x}/{y}.png', {
                tms: true,
                opacity: 1,
                attribution: "",
                maxNativeZoom: 13}).addTo(mymap);
        } else if ($("#number-input").val() > 5000) {
            L.tileLayer('tiles/10000_wotus_tiles/{z}/{x}/{y}.png', {
                tms: true,
                opacity: 1,
                attribution: "",
                maxNativeZoom: 13}).addTo(mymap);
        } else {
            L.tileLayer('tiles/5000_wotus_tiles/{z}/{x}/{y}.png', {
                tms: true,
                opacity: 1,
                attribution: "",
                maxNativeZoom: 13}).addTo(mymap);
        }
        $('#submit-button').removeAttr('disabled');
        $('#clear-button').removeAttr('disabled');
        $('#spinner').removeClass('is-active');
    }, 10000);

});

$("#clear-button").click(function() {
    mymap.eachLayer(function (layer) {
        mymap.removeLayer(layer);
    });
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; <a href="http://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f">Esri</a> &mdash; See credits | Search data &copy; <a href="https://nominatim.openstreetmap.org/">OpenStreetMap</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
});

// When the Page Loads
$(document).ready(function() {
    // Welcome Message
    if (localStorage.getItem("hasRun") != 'true') {
        $('#wotusWelcome').removeAttr('class', 'hidden');
    } else {
        localStorage.setItem("hasCodeRunBefore", 'true');
    }
})
