google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Year', 'mm', 'Dmm'],
        ['2013',  1000,      400],
        ['2014',  1170,      460],
        ['2015',  660,       1120],
        ['2016',  1030,      540]
    ]);

    var options = {
        title: 'Lluvias',
        hAxis: {title: 'Año',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0},
        width: 900,

    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart'));
    google.visualization.events.addListener(chart, 'ready', resetTableStyle);
    chart.draw(data, options);


}

function resetTableStyle(){
    /*
    var myDiv = document.getElementById('chart');
    var myTable = myDiv.getElementsByTagName('table')[0];
    myTable.style.margin = 'auto';*/
  }
/*
$(window).resize(function(){
    console.log('hey');
   drawChart();
});*/
