var format = 'image/png';
/*
var extent = [0, 0, 1024, 968];
var projection = new ol.proj.Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent
});
*/
var map = L.map('map', {
    center: [init_values.lat,init_values.long],
    zoom: init_values.zoom,
    zoomControl:false
    });



//ESRI!
var esri_map = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                        attribution: 'Tiles &copy; Esri &mdash; WEBMET BY GRC'
                    }).addTo(map);

var esri_topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
                        attribution: 'Tiles &copy; Esri &mdash; WEBMET BY GRC'
                    }).addTo(map);

var esri_sat = L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                        attribution: 'Tiles &copy; Esri &mdash; WEBMET BY GRC'
                    }).addTo(map);

//var bingAerealLayer = L.tileLayer.bing({
//    bingMapsKey:'AkRRGpVORFwhbF42RXM4uA7thHkAMd9zqC_-XqWCa2IECRRoGyCbyXnhOM1XNvjW',
//    imagerySet:'Aerial',
//    maxZoom: 19,
//    culture:'es-ES',
//    zIndex: 1,
//});

//var bingAerealLayer_with_references = new L.tileLayer.bing({
//    bingMapsKey:'AkRRGpVORFwhbF42RXM4uA7thHkAMd9zqC_-XqWCa2IECRRoGyCbyXnhOM1XNvjW',
//    imagerySet:'AerialWithLabels',
//    maxZoom: 19,
//    culture:'es-ES',
//    zIndex: 1,
//});

/* para OSM descomentar esto
var osmLayer = new L.TileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 19,
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);
*/
var osmLayer = new L.TileLayer(
    'https://gis.argentina.gob.ar/osm/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 19,
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> Contribuidores|argentina.gob.ar'
    }).addTo(map);

var argenmap = L.tileLayer('http://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png', {
    tms: true,
    maxZoom: 15,
    attribution: 'Mapa del <a href="http://www.ign.gob.ar">Instituto Geográfico Nacional</a>, ' +
    'capa de calles por colaboradores de &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
});

// Mapa IGN nuevo (Arcgis Server)
var arcgis = L.tileLayer('https://ide.ign.gob.ar/geoservicios/rest/services/Mapas_IGN/mapa_topografico/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 14,
    attribution: 'Mapa del <a href="http://www.ign.gob.ar">Instituto Geográfico Nacional</a>, ' +
    'capa de calles por colaboradores de &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
});

var capabase_ign = new L.tileLayer.wms("http://wms.ign.gob.ar/geoserver/wms?", {
    layers: 'capabaseargenmap',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "IGN - GRC"
});

var provincias = new L.tileLayer.wms("http://wms.ign.gob.ar/geoserver/wms?", {
    layers: 'idera:limite_interprovincial',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: "IGN - GRC"
});

var ignLayer = new L.layerGroup([capabase_ign, provincias]);

var base_layers = { 'osmLayer': osmLayer,
                    'esri_map':esri_map,
                    'esri_sat':esri_sat,
                    'esri_topo':esri_topo,
                    'ignLayer': capabase_ign,
                    'argenmap': argenmap,
                    'arcgis': arcgis,


                   //'bingAerealLayer':bingAerealLayer,
                   //'bingAerealLayer_with_references':bingAerealLayer_with_references
                  };

var layer_control = new L.control.layers(null,null);


L.control.scale().addTo(map);
var osmGeocoder = new L.Control.OSMGeocoder({
    collapsed: false, // Whether its collapsed or not
    position: 'bottomright', // The position of the control
    text: 'Buscar', // The text of the submit button
    placeholder: 'Buscar'});
map.addControl(osmGeocoder); 






/*


var capabase_ign = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: 'http://wms.ign.gob.ar:8080/geoserver/wms',
        params: {
            'FORMAT': format,
            'VERSION': '1.3.0',
            tiled: true,
            LAYERS: 'capabaseargenmap',
            STYLES: '',
        }
    }),
    attributions: '© Grupo Radar Córdoba',
    zIndex: 1,
});

var provincias =new ol.layer.Tile({
    visible: true,
    zIndex: 1,
    source: new ol.source.TileWMS({
        url: 'http://wms.ign.gob.ar:8080/geoserver/idera/wms',
        params: {
            'FORMAT': format,
            'VERSION': '1.3.0',
            tiled: true,
            LAYERS: 'idera:limite_interprovincial',
            STYLES: '',
        }
    })

});


var ignLayer = new ol.layer.Group({ layers: [capabase_ign, provincias] });



var base_layers = { 'ignLayer': ignLayer,
                   'osmLayer': osmLayer,
                   'bingAerealLayer':bingAerealLayer,
                   'bingAerealLayer_with_references':bingAerealLayer_with_references };





var map = new ol.Map({
    controls: ol.control.defaults(),
    interactions: ol.interaction.defaults().extend([
        new ol.interaction.DragRotateAndZoom()
    ]),
    target: 'map',
    layers: [ignLayer,osmLayer,bingAerealLayer,bingAerealLayer_with_references],
    logo: false,
    view: view,

});

//Buscador de localidades
var geocoder = new Geocoder('nominatim', {
    provider: 'photon',
    targetType: 'text-input',
    lang: 'en',
    placeholder: 'Buscar ...',
    limit: 5,
    keepOpen: false
});
map.addControl(geocoder);

//Posicionador
var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});
map.addControl(mousePositionControl);
map.addControl(new ol.control.ScaleLine());




//On load

function flyTo(done) {
    var duration = 2000;
    var zoom = 4.5;
    var parts = 2;
    var called = false;
    var location = [-62, -37.5]
    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    }
    view.animate({
        center: location,
        duration: duration
    }, callback);
    view.animate({
        zoom: zoom - 1,
        duration: duration / 2
    }, {
        zoom: zoom,
        duration: duration / 2
    }, callback);
}


*/





