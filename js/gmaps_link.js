/*
 * Functions for a popup for opening a clicked locaiton in Google Maps
 */

function pretty_degrees(val, url) {
    var second_symbol = '"';
    if (url) {
        second_symbol = '%22';
    }
    var degrees = Math.floor(val);
    var minutes = Math.floor((val - degrees) * 60);
    var seconds = (val - degrees - (minutes/60)) * 60 * 60;
    if (!url) {
        seconds = Math.floor(seconds);
    }
    return  degrees + '&deg;' + minutes + "'" + seconds + second_symbol;
}

function pretty_coords(latlng, sep, url) {
    var e_or_w = 'E';
    var lng = Math.abs(latlng.lng);
    if (lng < 0) {
        e_or_w = 'W';
        lng = -lng;
    }
    var n_or_s = 'N';
    var lat = Math.abs(latlng.lat);
    if (lat < 0) {
        n_or_s = 'S';
    }
    return pretty_degrees(lng, url) + n_or_s + sep + pretty_degrees(lat, url) + e_or_w;
}

function gmaps_link(latlng) {
    var zoom = (mymap.getZoom() + 4).toString();
    return '<a href="https://www.google.com/maps/@' +
        latlng.lat.toString() + ',' + latlng.lng.toString() + 
        ',' + zoom + 'z' +
        '/data=!3m1!1e3" target="_blank">Click here to see this area in Google Maps</a>';
}

function gmaps_content(latlng) {
    var rv = pretty_coords(latlng, ' ', false) + '<br/>' + 'Zoom: ' + mymap.getZoom();
    rv = rv + '<br/>' + gmaps_link(latlng);
    return rv;
}
