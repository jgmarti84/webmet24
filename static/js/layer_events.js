$(document).on('change','.layer_input',change_layers_views);

$(document).on('change','.layer_selection', function(){

    if ($(this).is(':checked')){
        $("#radar_products_references-" + $(this).data('layer')).fadeIn(300);
        $("#wrf_products_references-" + $(this).data('layer')).fadeIn(300);
        $("#dropdown-prod-" + $(this).data('layer')).fadeIn(100);
        $('.layer_input[data-layer="'+$(this).data('layer')+'"]').removeAttr('disabled');
    }else{
        $('.layer_input[data-layer="'+$(this).data('layer')+'"]').attr('disabled','disabled');
        $("#radar_products_references-" + $(this).data('layer')).fadeOut(300);
        $("#wrf_products_references-" + $(this).data('layer')).fadeOut(300);
        $("#dropdown-prod-" + $(this).data('layer')).fadeOut(100);
    }

    change_layers_views();

    if (parseInt($(this).data('refresh'))!=NaN){
        if (parseInt($(this).data('refresh'))==1){
            change_date();
        }

    }
});

$(document).on('contextmenu','.radar_products_references', function(event){
    $(this).fadeOut(300);
    event.stopPropagation();
});


function order_layers(){
    $('#sortable_layers').children( '.sortable' ).each(function(n,event){
        $('.sortable[data-layer="'+$(this).data('layer')+'"]').data('layer-z',200 - n*10);
//        console.log($('.sortable[data-layer="'+$(this).data('layer')+'"]').data('layer-z') + '-' + $(this).data('layer'));
    });
    order_polarimetrics(false);
    order_wrf();
}
function order_polarimetrics(order=true){
    $('#polarimetrics_sorter').children( '.sortable' ).each(function(n,event){
        var radar_offset = $('.sortable[data-layer="radar"]').data('layer-z') +1 ;
        $('.sortable[data-layer="'+$(this).data('layer')+'"]').data('layer-z', radar_offset  - n);
//       console.log($('.sortable[data-layer="'+$(this).data('layer')+'"]').data('layer-z') + '-' + $(this).data('layer'));
    });
    if (order){
        change_layers_order();
    }

};

function order_wrf(order=true){
    $('#wrf_sorter').children( '.sortable' ).each(function(n,event){
        var wrf_offset = $('.sortable[data-layer="wrf"]').data('layer-z') +1 ;
        $('.sortable[data-layer="'+$(this).data('layer')+'"]').data('layer-z', wrf_offset  - n);
//        console.log($('.sortable[data-layer="'+$(this).data('layer')+'"]').data('layer-z') + '-' + $(this).data('layer'));

    });
    if (order){
        change_layers_order();
    }

};

$('#sortable_layers').sortable({
    stop: order_layers,
});


$('#polarimetrics_sorter').sortable({
    stop: order_polarimetrics,
});

$('#wrf_sorter').sortable({
    stop: order_wrf,
});



order_layers();

