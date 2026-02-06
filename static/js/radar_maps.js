// Radar Maps Initialization
// Modern map setup for radar viewer with smooth interactions

var map = L.map('map', {
    center: [init_values.lat, init_values.long],
    zoom: init_values.zoom,
    zoomControl: false,
    preferCanvas: true,  // Better performance for many layers
    fadeAnimation: true,
    zoomAnimation: true
});

// Add zoom control in top right
L.control.zoom({
    position: 'topright'
}).addTo(map);

// Add scale control
L.control.scale({
    position: 'bottomleft',
    imperial: false
}).addTo(map);

// === Base Layers ===
var esri_map = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; WEBMET BY GRC',
    maxZoom: 19
});

var esri_topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; WEBMET BY GRC',
    maxZoom: 19
});

var esri_sat = L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; WEBMET BY GRC',
    maxZoom: 19
});

var osmLayer = L.tileLayer('https://gis.argentina.gob.ar/osm/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 19,
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors | argentina.gob.ar'
}).addTo(map);

var argenmap = L.tileLayer('http://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png', {
    tms: true,
    maxZoom: 15,
    attribution: 'Mapa del <a href="http://www.ign.gob.ar">Instituto Geográfico Nacional</a>, ' +
    'capa de calles por colaboradores de &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
});

var base_layers = {
    'osmLayer': osmLayer,
    'esri_map': esri_map,
    'esri_sat': esri_sat,
    'esri_topo': esri_topo,
    'argenmap': argenmap
};

// Current base layer
var current_base_layer = osmLayer;

// Handle base layer switching with smooth transition
$('.layer_base_check').on('change', function() {
    var layer_key = $(this).data('base-layer-check');
    
    if (base_layers[layer_key]) {
        // Fade out current layer
        if (current_base_layer) {
            map.removeLayer(current_base_layer);
        }
        
        // Fade in new layer
        current_base_layer = base_layers[layer_key];
        current_base_layer.addTo(map);
        
        // Toast notification
        Materialize.toast('Mapa base actualizado', 2000);
    }
});

// Layer control for overlays
var layer_control = new L.control.layers(null, null, {
    collapsed: false,
    position: 'topright'
});

// Mouse position display
map.on('mousemove', function(e) {
    var lat = e.latlng.lat.toFixed(4);
    var lng = e.latlng.lng.toFixed(4);
    $('#mouse-position').html('Lat: ' + lat + ' Lon: ' + lng);
});

// Geocoder control
var osmGeocoder = new L.Control.OSMGeocoder({
    collapsed: false,
    position: 'topright',
    text: 'Buscar',
    placeholder: 'Buscar ubicación...'
});
map.addControl(osmGeocoder);

// === Radar Data Structures ===
var radares = {};
var sources = {};
var polarimetric_selected = [];
var searching_images = false;
var images_preloaded = [];
var imgs = {};

// Layer group for cloud tops
var topes_group = new L.LayerGroup();
map.addLayer(topes_group);

console.log('Radar maps initialized successfully');
