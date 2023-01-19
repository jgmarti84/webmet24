

var icons = {};
icons['red'] = {}
icons['orange'] = {}
icons['green'] = {}
icons['red']['default']= L.icon({
    iconUrl: '/static/images/marker_red.png',
    iconSize:     [26, 48], // size of the icon

});
icons['orange']['default']= L.icon({
    iconUrl: '/static/images/marker_orange.png',
    iconSize:     [26, 48], // size of the icon

});
icons['green']['default']= L.icon({
    iconUrl: '/static/images/marker_green.png',
    iconSize:     [26, 48], // size of the icon

});
icons['red']['rain']= L.icon({
    iconUrl: '/static/images/marker_red_rain.png',
    iconSize:     [26, 48], // size of the icon

});
icons['orange']['rain']= L.icon({
    iconUrl: '/static/images/marker_orange_red.png',
    iconSize:     [26, 48], // size of the icon

});
icons['green']['rain']= L.icon({
    iconUrl: '/static/images/marker_green_rain.png',
    iconSize:     [26, 48], // size of the icon

});

var popup_org = `
<h6><img src='http://icons.iconarchive.com/icons/wineass/ios7-redesign/16/Weather-icon.png'/> #NOMBRE#</h6>
<div class='divider red'></div>
<b>Hora de Muestra: </b>#DATETIME#<br>
<b>Temperatura: </b>#TEMPERATURA#<br>
<b>Humedad: </b>#HUMEDAD#<br>
<b>Presión: </b>#PRESION#<br>
<b>Radiacion Solar: </b>#RADIACION#<br>
<b>Precipitación diaria: </b>#LLUVIA#<br>
<b>Velocidad del Viento: </b>#VELVIENTO#<br>
<b>Dirección del Viento: </b>#DIRVIENTO#<br>
`

/*
function onMapClick(e) {
    var popup = e.target.getPopup();
    $.ajax({
        url: "/api_estaciones/dummy/showstation",
    })
        .done(function( data ) {
        popup.setContent( data );
        popup.update();
    })
        .fail(function( data ) {
        console.log( 'FAIL: ' + data );

    });
};
*/



$.ajax({
    url: "http://clima.omixom.com/xml/xmlUltimaMuestra.php?user=xmlrhidricos&pass=xmlrhidricos2015",
    dataType: "xml",
    success: function(data) {

        $(data).find('estacion').each(function() {
//            console.log($(this).find('numero').text());
//            console.log($(this).find('nombre').text());
//            console.log($(this).find('latitud').text());
//            console.log($(this).find('longitud').text());
//            console.log($(this).find('fecha').text());
//            console.log($(this).find('temperatura').text());
//            console.log($(this).find('humedad').text());
//            console.log($(this).find('presion').text());
//            console.log($(this).find('direccionViento').text());
//            console.log($(this).find('velocidadViento').text());
//            console.log($(this).find('radiacionSolar').text());
//            console.log($(this).find('precipitacionDia').text());

            var lat = parseFloat($(this).find('latitud').text());
            var long = parseFloat($(this).find('longitud').text());
            var date = moment($(this).find('fecha').text());

            var time_icon = "red";
            var status_icon = "default";

            var last_our = moment().subtract(1,'hours');
            var medium_day = moment().subtract(12,'hours');
            if (date.isAfter(medium_day)){
                time_icon = "orange";
            }
            if (date.isAfter(last_our)){
                time_icon = "green";
            }
            var lluvia = parseFloat($(this).find('precipitacionDia').text().replace(' mm',''));
            if (lluvia>0){
                status_icon = 'rain';
            }



            var popup_str = popup_org.replace('#NOMBRE#', $(this).find('nombre').text().toUpperCase());
            popup_str = popup_str.replace('#DATETIME#', $(this).find('fecha').text());
            popup_str = popup_str.replace('#TEMPERATURA#', $(this).find('temperatura').text());
            popup_str = popup_str.replace('#HUMEDAD#', $(this).find('humedad').text());
            popup_str = popup_str.replace('#PRESION#', $(this).find('presion').text());
            popup_str = popup_str.replace('#RADIACION#', $(this).find('radiacionSolar').text());
            popup_str = popup_str.replace('#LLUVIA#', $(this).find('precipitacionDia').text());
            popup_str = popup_str.replace('#VELVIENTO#', $(this).find('velocidadViento').text());
            popup_str = popup_str.replace('#DIRVIENTO#', $(this).find('direccionViento').text());

            var marker = L.marker([lat, long], { bounceOnAdd: true,
                                                 bounceOnAddOptions: {duration: 1000, height: 200},
                                                icon: icons[time_icon][status_icon],
                                               });
            marker.bindPopup(popup_str,{closeButton:false});
            marker.addTo(map);
            stations.push(marker)


        });
    },
    error: function(error){
        console.log(error);
    }
});
