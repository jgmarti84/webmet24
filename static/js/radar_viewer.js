// Radar Viewer - Main Logic
// Handles radar data loading, product selection, and UI interactions

// === Product Selection Logic ===
function check_polarimetrics_var() {
    // Limit selection to 4 products
    var selected_count = $('#side-radar-layers input:checkbox:checked[data-refresh="1"]').length;
    
    if (selected_count >= 4) {
        $('#side-radar-layers input:checkbox:not(":checked")[data-refresh="1"]').each(function() {
            $(this).prop('disabled', true);
            $(this).closest('.product-item').addClass('disabled');
        });
        Materialize.toast('Máximo 4 productos seleccionados', 2000, 'orange');
    } else {
        $('#side-radar-layers input:checkbox:not(":checked")[data-refresh="1"]').each(function() {
            $(this).prop('disabled', false);
            $(this).closest('.product-item').removeClass('disabled');
        });
    }
    
    // Update selected products array
    polarimetric_selected = [];
    $('#side-radar-layers input:checkbox:checked[data-refresh="1"]').each(function() {
        polarimetric_selected.push($(this).data('layer'));
        $(this).closest('.product-item').addClass('active');
    });
    
    // Update UI for unselected products
    $('#side-radar-layers input:checkbox:not(":checked")[data-refresh="1"]').each(function() {
        $(this).closest('.product-item').removeClass('active');
    });
    
    console.log('Selected products:', polarimetric_selected);
}

// === Radar Search and Initialization ===
function search_radars() {
    $.ajax({
        url: "/api_radares/radares/?format=json",
        success: function(data) {
            radares = {};
            var radar_list_html = '';
            
            $.each(data, function(i, radar) {
                var southWest = L.latLng(radar.point2_lat, radar.point2_long);
                var northEast = L.latLng(radar.point1_lat, radar.point1_long);
                var bounds = L.latLngBounds(southWest, northEast);
                
                radares[radar.code] = {
                    'title': radar.title,
                    'lat': parseFloat(radar.center_lat),
                    'long': parseFloat(radar.center_long),
                    'extent': bounds,
                    'counter': 0
                };
                
                // Create coverage circle
                radares[radar.code]['cobertura'] = new L.circle(
                    [parseFloat(radar.center_lat), parseFloat(radar.center_long)], {
                        radius: 1000 * parseInt(radar.img_radio),
                        stroke: true,
                        color: '#2196F3',
                        weight: 2,
                        fillOpacity: 0,
                        fill: true,
                        fillColor: 'blue'
                    }
                ).addTo(map);
                
                // Create layer group
                radares[radar.code]['layer_group'] = new L.layerGroup([
                    radares[radar.code]['cobertura']
                ]).addTo(map);
                
                // Create image overlays for each product
                for (var j = 0; j < polarimetrics_vars.length; j++) {
                    radares[radar.code]['layer_' + polarimetrics_vars[j]] = new L.imageOverlay(
                        '/static/images/vacio.png',
                        radares[radar.code]['extent'], {
                            opacity: 0,
                            zIndex: 100 + j,
                            className: 'radar-overlay'
                        }
                    ).addTo(map);
                    
                    radares[radar.code]['layer_group'].addLayer(
                        radares[radar.code]['layer_' + polarimetrics_vars[j]]
                    );
                }
                
                // Add to layer control
                layer_control.addOverlay(
                    radares[radar.code]['layer_group'],
                    '<strong>' + radar.code + '</strong> - ' + radar.title
                );
                
                // Add to radar selection list
                radar_list_html += `
                    <div class="radar-item">
                        <label>
                            <input type="checkbox" class="filled-in radar-checkbox" 
                                   data-radar-code="${radar.code}" checked />
                            <span><strong>${radar.code}</strong> - ${radar.title}</span>
                        </label>
                    </div>
                `;
            });
            
            // Update radar list in panel
            $('#radar-list').html(radar_list_html);
            
            // Add layer control to map
            layer_control.addTo(map);
            
            console.log('Radars loaded:', Object.keys(radares).length);
            
            // Load initial images
            search_images();
        },
        error: function(xhr, status, error) {
            console.error('Error loading radars:', error);
            Materialize.toast('Error al cargar radares', 3000, 'red');
        }
    });
}

// === Image Loading ===
function search_images() {
    // For now, we'll use the direct file loading approach
    // This avoids the API call that was returning false in radares.js
    console.log('Images will be loaded dynamically from file system');
    return true;
}

// === Clear Layers ===
function clear_layers() {
    for (var radar in radares) {
        for (var j = 0; j < polarimetrics_vars.length; j++) {
            radares[radar]['layer_' + polarimetrics_vars[j]].setUrl('/static/images/vacio.png');
        }
    }
}

// === Opacity Control ===
function ret_radar_opacity(data_layer, polarimetric = false) {
    if (!$('.layer_selection[data-layer="radar"]').is(':checked')) {
        return 0;
    }
    
    if (!polarimetric) {
        if (!$('.layer_selection[data-layer="' + data_layer + '"]').is(':checked')) {
            return 0;
        }
        return parseInt($('.layer_input[data-layer="' + data_layer + '"]').val()) / 100;
    } else {
        if (polarimetric_selected.indexOf(data_layer) < 0) {
            return 0;
        }
        return parseInt($('.layer_input[data-layer="' + data_layer + '"]').val()) / 100;
    }
}

// === Update Layer Views ===
function change_layers_views() {
    for (var radar in radares) {
        // Update coverage circle opacity
        var coverage_opacity = ret_radar_opacity("radar_radios");
        radares[radar]['cobertura'].setStyle({
            fillOpacity: coverage_opacity
        });
        
        // Update product layer opacities
        for (var j = 0; j < polarimetrics_vars.length; j++) {
            var product_opacity = ret_radar_opacity(polarimetrics_vars[j], true);
            radares[radar]['layer_' + polarimetrics_vars[j]].setOpacity(product_opacity);
        }
    }
}

// === Update Layer Order ===
function change_layers_order() {
    var base_z = 100;
    $('#polarimetrics_sorter .sortable').each(function(index) {
        var layer_key = $(this).data('layer');
        var z_index = base_z - index;
        
        for (var radar in radares) {
            if (radares[radar]['layer_' + layer_key]) {
                radares[radar]['layer_' + layer_key].setZIndex(z_index);
            }
        }
    });
}

function order_polarimetrics(trigger_update = true) {
    if (trigger_update) {
        change_layers_order();
    }
}

// === Set Actual Sources (Display current frame) ===
function set_actual_sources() {
    if (searching_images) {
        return false;
    }
    
    var taf_utc = moment(timestamp_actual_frame);
    var pol_url = '';
    
    for (var radar in radares) {
        for (var j = 0; j < polarimetrics_vars.length; j++) {
            var opacity = ret_radar_opacity(polarimetrics_vars[j], true);
            
            if (opacity <= 0) {
                continue;
            }
            
            // Build image URL
            pol_url = 'media/radares/images/' + radar + '/';
            pol_url += taf_utc.format("YYYY/MM/DD/");
            pol_url += radar + '_' + taf_utc.format("YYYYMMDDTHHmm") + '00Z_';
            pol_url += polarimetrics_vars[j] + '_00.png';
            
            // Image preloading with error handling
            var img_stat = radar + polarimetrics_vars[j] + taf_utc.format("YYYYMMDDTHHmm");
            
            if (imgs[img_stat] == undefined) {
                imgs[img_stat] = new Image();
                imgs[img_stat].data_polvar = polarimetrics_vars[j];
                imgs[img_stat].radar = radar;
                imgs[img_stat].img_stat = img_stat;
                
                imgs[img_stat].onload = function() {
                    radares[this.radar]['counter'] = 0;
                };
                
                imgs[img_stat].onerror = function() {
                    radares[this.radar]['counter'] = radares[this.radar]['counter'] != undefined ? 
                        (radares[this.radar]['counter'] < 3 ? radares[this.radar]['counter'] + 1 : radares[this.radar]['counter']) : 1;
                    
                    if (radares[this.radar]['counter'] >= 3 || timestamp_actual_frame.isAfter(moment(new Date()))) {
                        radares[this.radar]['layer_' + this.data_polvar].setUrl('/static/images/vacio.png');
                    }
                    
                    this.onerror = null;
                    this.onload = null;
                    this.src = null;
                    delete imgs[this.img_stat];
                };
                
                imgs[img_stat].src = pol_url;
            }
            
            // Update radar overlay
            radares[radar]['layer_' + polarimetrics_vars[j]].setUrl(pol_url);
        }
    }
    
    // Update cloud tops
    see_topes();
}

// === Cloud Tops Display ===
function see_topes() {
    topes_group.clearLayers();
    
    if (!$("#layer_selection_topes").is(':checked')) {
        return false;
    }
    
    var taf_utc = moment(timestamp_actual_frame);
    
    for (var radar in radares) {
        var tope_url = 'media/radares/images/' + radar + '/';
        tope_url += taf_utc.format("YYYY/MM/DD/");
        tope_url += radar + '_' + taf_utc.format("YYYYMMDDTHHmm") + '00Z_TOPES_00.txt';
        
        $.ajax({
            method: 'GET',
            url: tope_url,
            success: function(data) {
                var data_lines = data.split('\n');
                
                for (var idx in data_lines) {
                    var marker_data = data_lines[idx].split(',');
                    
                    if (marker_data.length != 4) continue;
                    
                    var marker_type = marker_data[0];
                    var marker_lat = parseFloat(marker_data[1].replace(/[\[\]]/g, ''));
                    var marker_long = parseFloat(marker_data[2].replace(/[\[\]]/g, ''));
                    var marker_value = marker_data[3];
                    
                    var title = '';
                    var icon_class = '';
                    
                    switch (marker_type) {
                        case 'T':
                            title = '<b>Tope de nube</b><br>Valor: ' + marker_value + ' mts.';
                            icon_class = 'circle_t';
                            break;
                        case 'N':
                            title = '<b>Núcleo de Z</b><br>Valor: ' + marker_value + ' dBz.';
                            icon_class = 'circle_n';
                            break;
                        default:
                            continue;
                    }
                    
                    var circleIcon = L.divIcon({
                        className: icon_class,
                        iconSize: [8, 8]
                    });
                    
                    var marker = new L.marker([marker_lat, marker_long], {
                        icon: circleIcon,
                        zIndexOffset: 500,
                        title: title
                    }).bindPopup(title, { closeButton: false });
                    
                    topes_group.addLayer(marker);
                }
            },
            error: function() {
                // Silently fail if topes file doesn't exist
            }
        });
    }
}

// === Event Handlers ===
$(document).on('change', '.layer_selection', function() {
    var layer_key = $(this).data('layer');
    var is_checked = $(this).is(':checked');
    
    if (is_checked) {
        $("#radar_products_references-" + layer_key).fadeIn(300);
        $('.layer_input[data-layer="' + layer_key + '"]').removeAttr('disabled');
        $(this).closest('.product-opacity').removeClass('disabled');
    } else {
        $('.layer_input[data-layer="' + layer_key + '"]').attr('disabled', 'disabled');
        $("#radar_products_references-" + layer_key).fadeOut(300);
        $(this).closest('.product-opacity').addClass('disabled');
    }
    
    if ($(this).data('refresh') == 1) {
        check_polarimetrics_var();
    }
    
    change_layers_views();
});

$(document).on('change', '.layer_input', change_layers_views);

$(document).on('contextmenu', '.radar_products_references', function(event) {
    $(this).fadeOut(300);
    event.stopPropagation();
});

// === Radar Selection ===
$(document).on('change', '.radar-checkbox', function() {
    var radar_code = $(this).data('radar-code');
    var is_checked = $(this).is(':checked');
    
    if (radares[radar_code]) {
        if (is_checked) {
            radares[radar_code]['layer_group'].addTo(map);
        } else {
            map.removeLayer(radares[radar_code]['layer_group']);
        }
    }
});

// === Initialize ===
$(document).ready(function() {
    // Initialize UI components
    $('.tooltipped').tooltip();
    $('.modal').modal();
    $('.button-sidenav').sideNav({
        menuWidth: 400,
        edge: 'right'
    });
    
    // Initialize radar system
    check_polarimetrics_var();
    search_radars();
    
    console.log('Radar viewer initialized');
});
