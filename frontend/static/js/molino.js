//MARKER

var vector_molinos = new ol.source.Vector();
var layer_molinos = new ol.layer.Vector({
    source: vector_molinos
});
map.addLayer(layer_molinos);
var features_moluno = {};
for (i=1; i<10;i++){
    var random_value_dummy = Math.floor((Math.random() * 3) + 1);;
    var rand1 = Math.random()*8-4;
    var rand2 = Math.random()*16-8;
    features_moluno['molino'+ i] = {}
    features_moluno['molino'+ i]['feature'] = new ol.Feature({
        geometry: new ol.geom.Circle([-62 + rand1, -31 + rand2], 0.2),
        name: 'molino ' + i
    });

    if (random_value_dummy==1){
        features_moluno['molino'+ i]['icon'] = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'green',
                opacity: 1,
            }),
        });
    }else{
        if (random_value_dummy==2){
            features_moluno['molino'+ i]['icon'] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'red',
                    opacity: 1,
                }),
            });
        }else{
            features_moluno['molino'+ i]['icon'] = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'grey',
                    opacity: 1,
                }),
            });
        }
    }
    features_moluno['molino'+ i]['feature'].setStyle(features_moluno['molino'+ i]['icon']);
    vector_molinos.addFeature(features_moluno['molino'+ i]['feature']);
}

var element = document.getElementById('popup');
var popup_marker = new ol.Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false
});

map.addOverlay(popup_marker);

