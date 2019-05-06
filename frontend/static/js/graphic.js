var stations = [];
$('input[type=radio]').on('change', function (e) {
    var seleccion = '' + $(this).data('base-layer-check');
    $.each(base_layers, function (key, value) {
        if (key == seleccion) {
            map.addLayer(base_layers[key]);
        } else {
            map.removeLayer(base_layers[key]);
        }
    });
    change_layers_order();
});
//Visual
$('#hide_graficos').on('click', function (e) {
    $('#graficos').hide();
});
$('#show_graficos').on('click', function (e) {
    $('#graficos').show();
});

var zoom_in = $('.leaflet-control-zoom-in');
zoom_in.addClass('btn-floating waves-effect waves-light blue');
zoom_in.removeClass('leaflet-control-zoom-in')
zoom_in.html('<i class="material-icons">add_circle_outline</i>');
var zoom_out = $('.leaflet-control-zoom-out');
zoom_out.addClass('btn-floating waves-effect waves-light blue');
zoom_out.removeClass('leaflet-control-zoom-out')
zoom_out.html('<i class="material-icons">remove_circle_outline</i>');
var ol_rotate = $('.ol-rotate-reset').addClass('btn-floating waves-effect waves-light blue');
//Add rotate to left buttons
$(".ol-rotate").removeClass('ol-control');
$(".ol-rotate").appendTo(".ol-zoom");


/*Materialize*/
$(".button-sidenave").sideNav({menuWidth: 350});
$('.modal').modal();
$('ul.tabs').tabs();




$('.button-sidenave').on('click', (function (e) {
    //e.preventDefault();
    if (e.isTrigger == undefined) {
        $('.button-sidenave').each(function () {
            $(this).sideNav('hide')
        });
        $(this).sideNav('show');
        $('.fixed-action-btn').closeFAB();
    }
}));


$('.chk_station').on('click', (function (e) {
    if ($(this).is(':checked')) {
        features_stations[$(this).data("station")]['feature'].setStyle(features_stations[$(this).data("station")]['icon']);
    } else {
        features_stations[$(this).data("station")]['feature'].setStyle(hide_icon);
    }
}));


$(window).load(function () {
    $('#gif_radar_cont').fadeOut(1000);
    search_radars();
    //    change_layers_views();
    //    change_layers_order();
    //    setTimeout(function () {
    //        flyTo(function () {
    //            $('#gif_radar_cont').fadeOut(1000);
    //        });
    //    }, 1000);

});


$(document).ready(function () {
    $('.tooltipped').tooltip({delay: 50});


});



$('.modal').modal();
// sortable and draggable
$('#sortable_layers').sortable({placeholder: "ui-state-highlight", helper: 'clone'});
$('#polarimetrics_sorter').sortable({placeholder: "ui-state-highlight", helper: 'clone'});
$('.sortables').draggable();

// PopUP TODO add this code in another file
var layout;

$('.btn_popup').click(function (e) {
    layout = getLayout($(e.target));
    layout.side.addClass('hide');
    layout.content.appendTo(layout.container);
    layout.popup.css('display', "block");
    try {
        layout.layerRadarDiv.addClass('div-outside');
        layout.layerDataDiv.addClass('div-outside');
    } catch (err) {
        console.log("no es un layer")
    }
});

$('.btn_close').click(function (e) {
    layout = getLayout($(e.target));
    layout.content.appendTo(layout.side);
    layout.popup.css('display', "none");
    layout.side.removeClass('hide');
    layout.side.attr('open');
    try {
        layout.layerRadarDiv.removeClass('div-outside');
        layout.layerDataDiv.removeClass('div-outside');
    } catch (err) {
        console.log("no es un layer")
    }
});

var LAYER = {
    side: $('#side-layers'),
    content: $('#layers-div'),
    container: $('#contentLayer'),
    popup: $("#popUpLayer"),
    layerRadarDiv: $('#layer-radar-div'),
    layerDataDiv: $('#layer-data-div')
};

var MOLINO = {
    side: $('#side-molino'),
    content: $('#molino-div'),
    container: $('#contentMolino'),
    popup: $("#popUpMolino")
};

var STATION = {
    side: $('#side-estaciones'),
    content: $('#station-div'),
    container: $('#contentStation'),
    popup: $("#popUpStation")
};

function getLayout(e) {
    if (e.parents(".side-layers").length) {
        return LAYER;
    }
    else if (e.parents(".side-molino").length) {
        return MOLINO;
    }
    else if (e.parents(".side-estaciones").length) {
        return STATION;
    }
}
$('#layer-radar-div input:checkbox').on('change',function (e) {
    check_polarimetrics_var();
});

/*
FECHAS
Rango

*/
var slider = document.getElementById('delta-slider');

noUiSlider.create(slider, {
    start: [-4, 0],
    connect: true,
    tooltips: true,
    step: 1,
    limit: 12,
    range: {
        'min': -12,
        'max': 12
    }
});

slider.noUiSlider.on('set', function(){
    check_dates();
});

$.datetimepicker.setLocale('es');
var timestamp_from=moment();
var timestamp_to=moment();
var timestamp_actual_frame=moment();
var frames = 25;
var timeround = 10;

var check_dates = function( currentDateTime ){
    var now = new Date();
    var slider = document.getElementById('delta-slider');
    var delta = parseInt($('#delta_time').val())/2;
    var delta_sub = parseInt(slider.noUiSlider.get()[0]);
    var delta_plus = parseInt(slider.noUiSlider.get()[1]);
    console.log(delta_sub);
    console.log(delta_plus);

    if ($('#dates_chbox').is(':checked')) {
        var actual_timestamp = $('#date_from').datetimepicker('getValue');
        timestamp_from = moment(actual_timestamp).add(delta_sub, 'hours');
        timestamp_to = moment(actual_timestamp).add(delta_plus, 'hours');
        //        if (timestamp_to.isAfter(moment(now))){
        //            timestamp_to = moment(now);
        //        }
    }else{
        timestamp_from = moment(now).add(delta_sub, 'hours');
        timestamp_to = moment(now).add(delta_plus, 'hours');;
    }

    timeround = rounded_up(Math.abs(timestamp_from.diff(timestamp_to,'minutes'))/25, 10);
    if (timeround<10){
        timeround = 10;
    }
    timestamp_from = rounded_time(timestamp_from);
    timestamp_to = rounded_time(timestamp_to);

    frames = parseInt(Math.abs(timestamp_from.diff(timestamp_to,'hours')) * (60/timeround) + 1);


    $('#date_range_from').html(timestamp_from.format("DD/MM/YYYY HH:mm"));
    $('#date_range_to').html(timestamp_to.format("DD/MM/YYYY HH:mm"));
    $('#actual_frame').attr('max', frames);
    $('#actual_frame').val(frames/2);
    $('#frame-max').html(frames);
    change_frame();
    search_images();


};
$('#dates_chbox').on('change', (function (e) {
    if ($('#dates_chbox').is(':checked')) {
        $('#before_time').removeAttr("hidden");
    } else {
        $('#before_time').attr("hidden", "true");
    }
    check_dates();
}));


var change_frame = function(){
    var frame_actual = parseInt($('#actual_frame').val()) - 1;
    timestamp_actual_frame = moment(timestamp_from);
    timestamp_actual_frame.add(frame_actual * timeround, 'minutes');
    $('#fecha-valor').html(timestamp_actual_frame.format("DD/MM/YYYY HH:mm"));
    $('#frame-valor').html($('#actual_frame').val());
    //    try{
    set_actual_sources();
    //    }catch(error){
    //        console.log('no existe' + error);
    //    }
};



$('#date_from').datetimepicker({
    dayOfWeekStart : 1,
    format: 'd/m/Y H:i',
    step:10,
    maxDate:0,
    defaultDate: new Date(),
    onChangeDateTime:check_dates,
});

$('#delta_time').on('change', check_dates);


$('#actual_frame').on('change', function (e) {
    change_frame();
});

var automatic = null;
var automatic_speed = 1000;

$('#speed-field').on('change', function(){
    automatic_speed = parseInt($('#speed-field').val());
    $('#speed-span').html(automatic_speed + '%');
    automatic_speed = (105 - automatic_speed) * 1000/50;
    if (automatic!=null){
        clearInterval(automatic);
        automatic = setInterval(function () {
            if (parseInt($('#actual_frame').val())==frames){
                $('#actual_frame').val(0);
            }
            $('#actual_frame').val(parseInt($('#actual_frame').val())+1);
            change_frame();
        }, automatic_speed);
    }
});

$('#click_play_arrow').on('click', function(){
    if (automatic==null){
        automatic_speed = parseInt($('#speed-field').val());
        $('#speed-span').html(automatic_speed + '%');
        automatic_speed = (101 - automatic_speed) * 1000/50;
        automatic = setInterval(function () {
            if (parseInt($('#actual_frame').val())==frames){
                $('#actual_frame').val(0);
            }
            $('#actual_frame').val(parseInt($('#actual_frame').val())+1);
            change_frame();
        }, automatic_speed);
        $('#velocidad').fadeIn(500);
        $('#click_play_arrow').html('<i class="material-icons">pause</i>');
    }else{
        clearInterval(automatic);
        automatic = null;
        $('#click_play_arrow').html('<i class="material-icons">play_arrow</i>');
        $('#velocidad').fadeOut(500);
    }
});


$('#click_skip_previous').on('click', function(){
    $('#actual_frame').val(parseInt($('#actual_frame').val())-1);
    change_frame();
});

$('#click_fast_rewind').on('click', function(){
    $('#actual_frame').val(1);
    change_frame();
});

$('#click_skip_next').on('click', function(){
    $('#actual_frame').val(parseInt($('#actual_frame').val())+1);
    change_frame();
});

$('#click_fast_forward').on('click', function(){
    $('#actual_frame').val(frames);
    change_frame();
});




var reload = setInterval(function(){
    if (!$('#dates_chbox').is(':checked')){
        var reload_last_frame = parseInt($('#actual_frame').val());
        check_dates();
        $('#actual_frame').val(reload_last_frame+1);
        setTimeout(function(){
            change_frame();
        },1000);

    };
}, 1000 * 60 * 15);

check_dates();

