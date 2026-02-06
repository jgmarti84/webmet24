// Radar Animation Controls
// Handles time selection, frame animation, and playback

$.datetimepicker.setLocale('es');

var timestamp_from = moment();
var timestamp_to = moment();
var timestamp_actual_frame = moment();
var frames = 25;
var timeround = 10;
var automatic = null;
var automatic_speed = 1000;

// === Time Window Slider Initialization ===
var slider = document.getElementById('delta-slider');

noUiSlider.create(slider, {
    start: [-6, 0],
    connect: true,
    range: {
        'min': -24,
        'max': 0
    },
    step: 1,
    tooltips: [
        {
            to: function(value) {
                return Math.round(value) + 'h';
            }
        },
        {
            to: function(value) {
                return Math.round(value) + 'h';
            }
        }
    ],
    format: {
        to: function(value) {
            return Math.round(value);
        },
        from: function(value) {
            return Number(value);
        }
    }
});

// Update slider labels
slider.noUiSlider.on('update', function(values, handle) {
    var start_hours = parseInt(values[0]);
    var end_hours = parseInt(values[1]);
    
    $('#slider-start-label').text(start_hours + ' horas');
    $('#slider-end-label').text(end_hours + ' horas');
});

// Trigger date check when slider changes
slider.noUiSlider.on('change', function() {
    check_dates();
});

// === Quick Preset Buttons ===
$('.preset-btn').on('click', function() {
    var hours = parseInt($(this).data('hours'));
    var delta = parseInt($(this).data('delta'));
    
    // Update slider
    slider.noUiSlider.set([hours, 0]);
    
    // Make sure we're in current mode
    if ($('#dates_chbox').is(':checked')) {
        $('#dates_chbox').prop('checked', false).trigger('change');
    }
    
    // Toast feedback
    var hours_text = Math.abs(hours);
    Materialize.toast('Rango: últimas ' + hours_text + ' hora' + (hours_text > 1 ? 's' : ''), 2000);
});

// === Date Check and Frame Calculation ===
function check_dates() {
    var now = new Date();
    var slider_values = slider.noUiSlider.get();
    var delta_sub = parseInt(slider_values[0]);
    var delta_plus = parseInt(slider_values[1]);
    
    $('#circle_search').removeClass('hide');
    
    if ($('#dates_chbox').is(':checked')) {
        // Custom date mode
        var actual_timestamp = $('#date_from').datetimepicker('getValue');
        timestamp_from = moment(actual_timestamp).add(delta_sub, 'hours');
        timestamp_to = moment(actual_timestamp).add(delta_plus, 'hours');
    } else {
        // Current time mode
        timestamp_from = moment(now).add(delta_sub, 'hours');
        timestamp_to = moment(now).add(delta_plus, 'hours');
    }
    
    // Calculate timeround based on time window
    timeround = rounded_up(Math.abs(timestamp_from.diff(timestamp_to, 'minutes')) / 25, 10);
    if (timeround < 10) {
        timeround = 10;
    }
    
    // Round timestamps
    timestamp_from = rounded_time(timestamp_from);
    timestamp_to = rounded_time(timestamp_to);
    
    // Calculate number of frames
    frames = parseInt(Math.abs(timestamp_from.diff(timestamp_to, 'hours')) * (60 / timeround) + 1);
    
    // Update UI
    $('#date_range_from').html(timestamp_from.format("DD/MM/YYYY HH:mm"));
    $('#date_range_to').html(timestamp_to.format("DD/MM/YYYY HH:mm"));
    $('#actual_frame').attr('max', frames);
    $('#actual_frame').val(Math.floor(frames / 2));
    $('#frame-max').html(frames);
    
    setTimeout(function() {
        $('#circle_search').addClass('hide');
    }, 500);
    
    change_frame();
}

// === Custom Date Mode Toggle ===
$('#dates_chbox').on('change', function() {
    if ($(this).is(':checked')) {
        $('#before_time').removeAttr("hidden");
        $('#before_time').addClass('fade-in');
    } else {
        $('#before_time').attr("hidden", "true");
    }
    check_dates();
});

// === Date Picker Initialization ===
$('#date_from').datetimepicker({
    dayOfWeekStart: 1,
    format: 'd/m/Y H:i',
    step: 10,
    maxDate: 0,
    defaultDate: new Date(),
    onChangeDateTime: check_dates,
    lang: 'es'
});

// === Frame Change Handler ===
function change_frame() {
    var frame_actual = parseInt($('#actual_frame').val()) - 1;
    timestamp_actual_frame = moment(timestamp_from);
    timestamp_actual_frame.add(frame_actual * timeround, 'minutes');
    
    $('#fecha-valor').html(timestamp_actual_frame.format("DD/MM/YYYY HH:mm"));
    $('#frame-valor').html($('#actual_frame').val());
    
    set_actual_sources();
}

$('#actual_frame').on('input', function() {
    change_frame();
});

// === Speed Control ===
var SPEED_SCALE_FACTOR = 105; // Speed calculation scale factor

$('#speed-field').on('input', function() {
    automatic_speed = parseInt($(this).val());
    $('#speed-span').html(automatic_speed + '%');
    automatic_speed = (SPEED_SCALE_FACTOR - automatic_speed) * 1000 / 50;
    
    if (automatic != null) {
        clearInterval(automatic);
        automatic = setInterval(playback_step, automatic_speed);
    }
});

// === Playback Step ===
function playback_step() {
    var current_frame = parseInt($('#actual_frame').val());
    
    if (current_frame >= frames) {
        $('#actual_frame').val(1);
    } else {
        $('#actual_frame').val(current_frame + 1);
    }
    
    change_frame();
}

// === Playback Controls ===
$('#click_play_arrow').on('click', function() {
    if (automatic == null) {
        // Start playback
        automatic_speed = parseInt($('#speed-field').val());
        $('#speed-span').html(automatic_speed + '%');
        automatic_speed = (SPEED_SCALE_FACTOR - automatic_speed) * 1000 / 50;
        
        automatic = setInterval(playback_step, automatic_speed);
        
        $('#velocidad').fadeIn(300);
        $('#click_play_arrow').html('<i class="material-icons">pause</i>');
        $('#click_play_arrow').attr('data-tooltip', 'Pausar');
        
        Materialize.toast('Reproducción iniciada', 2000);
    } else {
        // Stop playback
        clearInterval(automatic);
        automatic = null;
        
        $('#click_play_arrow').html('<i class="material-icons">play_arrow</i>');
        $('#click_play_arrow').attr('data-tooltip', 'Reproducir');
        $('#velocidad').fadeOut(300);
        
        Materialize.toast('Reproducción pausada', 2000);
    }
});

$('#click_skip_previous').on('click', function() {
    var current_frame = parseInt($('#actual_frame').val());
    if (current_frame > 1) {
        $('#actual_frame').val(current_frame - 1);
        change_frame();
    }
});

$('#click_fast_rewind').on('click', function() {
    $('#actual_frame').val(1);
    change_frame();
    Materialize.toast('Ir al inicio', 1500);
});

$('#click_skip_next').on('click', function() {
    var current_frame = parseInt($('#actual_frame').val());
    if (current_frame < frames) {
        $('#actual_frame').val(current_frame + 1);
        change_frame();
    }
});

$('#click_fast_forward').on('click', function() {
    $('#actual_frame').val(frames);
    change_frame();
    Materialize.toast('Ir al final', 1500);
});

// === Auto-reload for Current Mode ===
var RELOAD_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

var reload = setInterval(function() {
    if (!$('#dates_chbox').is(':checked')) {
        var reload_last_frame = parseInt($('#actual_frame').val());
        check_dates();
        
        // Maintain relative position in timeline
        if (reload_last_frame < frames) {
            $('#actual_frame').val(reload_last_frame + 1);
        }
        
        setTimeout(function() {
            change_frame();
        }, 1000);
        
        console.log('Auto-reload: datos actualizados');
    }
}, RELOAD_INTERVAL_MS);

// === Initialize ===
$(document).ready(function() {
    check_dates();
    
    console.log('Animation controls initialized');
});

// === Cleanup on page unload ===
$(window).on('beforeunload', function() {
    if (automatic != null) {
        clearInterval(automatic);
    }
    clearInterval(reload);
});
