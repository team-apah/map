var mymap = L.map('mapid', {
    center: [39.0000085454, -89.9999783845],
    maxZoom: 18,
    minZoom: 11
});

var bg_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
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

function disable_input() {
    $('#wotusWait').attr('class', 'transparent-overlay');
    $('#submit-button').attr('disabled', 'disabled');
    $('#clear-button').attr('disabled', 'disabled');
    $('#spinner').addClass('is-active');
}

function enable_input() {
    $('#submit-button').removeAttr('disabled');
    $('#clear-button').removeAttr('disabled');
    $('#spinner').removeClass('is-active');
}

function clear_layers() {
    mymap.eachLayer(function (layer) {
        if (layer !== bg_layer) {
            mymap.removeLayer(layer);
        }
    });
}

function request_q_value(q_value) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/cahokia/wotus/" + q_value, true);
    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        var queued = response.queued;
        var queuePosition = response.place;

        if(queued) {
            $('.estimatedTime').html('Estimated time to complete your request: ' + queuePosition);
        }
        else {
            $('.estimatedTime').html('Unknown time remaining');
        }

        if (xhr.status != 200) {
            setTimeout(function(){
                request_q_value(q_value);
            }, 5000);
        } else {
            enable_input();
            var layer = L.tileLayer.wms('/geoserver/ows?', {
                layers: 'wotus:' + q_value,
                format: 'image/png',
                transparent: true
            }).addTo(mymap);
        }
    };
    xhr.send();
}

// Sumbit
$("#submit-button").click(function() {
    clear_layers();
    disable_input();
    request_q_value($("#number-input").val());
});

$("#clear-button").click(function() {
    clear_layers();
});

// When the Page Loads
$(document).ready(function() {
    // Welcome Message
    if (localStorage.getItem("hasRun") != 'true') {
        $('#wotusWelcome').removeAttr('class', 'hidden');
    } else {
        localStorage.setItem("hasRun", 'true');
    }
})
