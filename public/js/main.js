$(document).ready(function () {

    // connectToWebSocket();

    //Initialize de fanvariabelen
    fan1 = [];
    fan2 = [];
    fan3 = [];
    fan4 = [];
    fan5 = [];

    plotGraphData();
    toggleFanTechnicalInformation();

});

function connectToWebSocket() {

    var baseURL = getBaseURL(); // Call function to determine it
    var socketIOPort = 443;
    var socketIOLocation = baseURL + socketIOPort; // Build Socket.IO location
    var socket = io.connect(socketIOLocation);

    //Build the user-specific path to the socket.io server, so it works both on 'localhost' and a 'real domain'
    function getBaseURL() {
        baseURL = location.protocol + "//" + location.hostname + ":" + location.port;
        return baseURL;
    }

    socket.on('date', function (data) {
        var tijd = new Date(data.date);

        if ($('.fan-information-technical .fan-status').attr('class') == 'fan-status red') {
            $('.fan-information-technical .fan-time-on').text('0');
        } else {
            $('.fan-information-technical .fan-time-on').text(
                (tijd.getHours() < 10 ? '0' : '') + tijd.getHours() + ':' +
                (tijd.getMinutes() < 10 ? '0' : '') + tijd.getMinutes() + ':' +
                (tijd.getSeconds() < 10 ? '0' : '') + tijd.getSeconds()
            );
        }
    });
}

function toggleFanTechnicalInformation() {
    var epochT = (new Date).getTime(); // time right now in js epoch
    var fansToCheck = [fan1, fan2, fan3, fan4, fan5];

    var options = {
        grid: {
            hoverable: true,
            tooltip: true
        },
        series: {
            lines: {
                show: true
            }
        },
        xaxis: {
            mode: "time", timeformat: "%H:%M", tickSize: [1, "hour"], timezone: "browser",
            min: epochT - 10800000, //3 uur
            max: epochT
        },
        axisLabels: {
            show: true
        },
        xaxes: [{
            axisLabel: 'Tijd in hele uren',
        }],
        yaxes: [{
            position: 'left',
            axisLabel: 'Stroomverbruik in Kilowatt',
        }]
    };

    $('.fan').on('click', function () {

        var dataAttributeIndex = ($(this).attr('data-index'));

        $('.fan').parent().parent().find('.fan-information-technical').show('slow');

        $.each(fansToCheck, function (index, value) {

            if (index == dataAttributeIndex) {

                if (fansOverview[index]['is_on'] == true) {
                    $('#technical-graph').html('').removeClass('fan-off');
                    plotTechnicalGraph = $.plot('#technical-graph', [fansToCheck[index]], options);
                    plotTechnicalGraph.setupGrid(); //only necessary if your new data will change the axes or grid
                    plotTechnicalGraph.draw();
                } else {
                    $('#technical-graph').html('<p class="fan-off">Deze ventilator staat uit en kan dus geen data weergeven</p>')
                }
            }
        });

        $.each(fansOverview, function (index, value) {

                if (fansOverview[index]['fan_number'] - 1 == dataAttributeIndex) {

                    if (fansOverview[index]['direction'] == 'north') {
                        $('.fan-information-technical h1').html('ventilator <br/> N-0' + fansOverview[index]['fan_number'])
                    } else {
                        $('.fan-information-technical h1').html('ventilator <br/> Z-0' + fansOverview[index]['fan_number']);

                    }
                    if (fansOverview[index]['blow_direction'] == 'north') {
                        $('.fan-information-technical .fan-blowing-direction').html('Noord');
                    } else {
                        $('.fan-information-technical .fan-blowing-direction').html('Zuid');
                    }

                    if (fansOverview[index]['is_on'] == true) {
                        $('.fan-information-technical .fan-status').html('AAN').addClass('green').removeClass('red');
                    } else {
                        $('.fan-information-technical .fan-status').html('UIT').addClass('red').removeClass('green');
                    }

                    if (calculateAveragePowerUsageTechnicalGraph(fansToCheck[index]) == 0) {
                        $('.fan-power-usage').html(calculateAveragePowerUsageTechnicalGraph(fansToCheck[index]) + " Kilowatt <br/> (sinds 0 uur geleden)");

                    } else {
                        $('.fan-power-usage').html(calculateAveragePowerUsageTechnicalGraph(fansToCheck[index]) + " Kilowatt <br/> (sinds 6 uur geleden)");
                    }
                }
            }
        );

    });
}

function configureTooltip() {
    var previousPoint = null;
    $("#technical-graph, #fan-graph").bind("plothover", function (event, pos, item) {
        if (item) {
            if (previousPoint != item.datapoint) {
                previousPoint = item.datapoint;
                $("#tooltip").remove();

                time = new Date(item.datapoint[0]);

                showTooltip(item.pageX, item.pageY, item.datapoint[1].toFixed(2) + ' Kilowatt (' + (time.getHours() < 10 ? '0' : '') + time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes() + ')');
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
}

function togglePlot(seriesIdx) {
    var someData = somePlot.getData();
    someData[seriesIdx].lines.show = !someData[seriesIdx].lines.show;
    somePlot.setData(someData);
    somePlot.draw();
}

function showTooltip(x, y, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y + 5,
        left: x + 5,
        border: '1px solid #fdd',
        padding: '2px',
        'background-color': '#fee',
        opacity: 0.80
    }).appendTo("body").fadeIn(200);
}

function calculateAveragePowerUsageTechnicalGraph(dataArray) {
    var averagePowerUsage = 0;
    var i = 0;

    $.each(dataArray, function (index, value) {
        averagePowerUsage += value[1];
        i++;
    });

    if (isNaN(averagePowerUsage / i)) {
        return 0;
    } else {
        return Math.round((averagePowerUsage / i) * 100) / 100
    }
}

function fillDataVariables() {

    $.each(fansGraph, function (key, value) {

        var date = new Date(value['created_at']);

        if (value['is_on'] === true) {
            switch (value['fan_number']) {
                case 1 :
                    fan1.push([date.getTime(), value['power_usage'], 1]);
                    break;
                case 2 :
                    fan2.push([date.getTime(), value['power_usage'], 2]);
                    break;
                case 3 :
                    fan3.push([date.getTime(), value['power_usage'], 3]);
                    break;
                case 4 :
                    fan4.push([date.getTime(), value['power_usage'], 4]);
                    break;
                case 5 :
                    fan5.push([date.getTime(), value['power_usage'], 5]);
                    break;
            }
        }
    });
}

function plotGraphData() {

    configureTooltip();
    fillDataVariables();

    var CRITICAL_VALUE = 227;
    var fansToCheck = [fan1, fan2, fan3, fan4, fan5];
    var data = [];
    var epochT = (new Date).getTime(); // time right now in js epoch
    var i = 0;
    var colors = ['#9BC2DB', '#DBEDF3', '#A3DFFB', '#C4E3FC', '#A4D4FA'];


    $.each(fansToCheck, function (index, value) {
        if (!0 < value.length) {

            if (fanDirection == 'noordzijde') {
                label = 'Ventilator N-0' +  parseInt(index + 1);
            } else {
                label = 'Ventilator Z-0' +  parseInt(index + 1);
            }

            if (value[0][1] > CRITICAL_VALUE) {
                fansToCheck[index]['color'] = '#DD2C00';
            } else {
                fansToCheck[index]['color'] = colors[index];
            }

            data.push({
                idx: i,
                label: label,
                data: fansToCheck[index],
                color: fansToCheck[index]['color']
            });

            i++;
        }
    });

    var options = {
        grid: {
            hoverable: true,
            tooltip: true
        },
        series: {
            lines: {
                show: true
            }
        },
        legend: {
            container: $('#fan-graph-legend'), noColumns: 0, labelFormatter: function (label, series) {
                return '<a href="#" onClick="togglePlot(' + series.idx + '); return false;">' + label + '</a>';
            }
        },
        xaxis: {
            mode: "time", timeformat: "%H:%M", tickSize: [1, "hour"], timezone: "browser",
            min: epochT - 10800000, //3 uur
            max: epochT
        },
        axisLabels: {
            show: true
        },
        xaxes: [{
            axisLabel: 'Tijd in hele uren',
        }],
        yaxes: [{
            position: 'left',
            axisLabel: 'Stroomverbruik in Kilowatt',
        }]
    };

//Teken de plot
    somePlot = $.plot($('#fan-graph'), data, options);

}


//Blaasrichting inbouwen
//1 uur
//14:25
//15:15

//30 maart
//Oostbuis Noordzijde graph fixen
//half uur
//10:35
//10:40

//30 maart
//Gemiddeld stroomverbruik fixen
//Kwartier
//10:45
//11:38
//Bleek wat meer te zijn dan alleen het laten zien van het gemiddeld stroomverbruik. Bleek dat de fans verkeerd werden ingeladen bij elke pagina (oude data ipv nieuwste data)

//31 Maart
//Ventilatornumer boven blok fixen
//Kwartier
//10:30
//10:34

//31 Maart
//Legenda buiten de chart zetten
//Kwartier
//10:46
//10:56

//31 Maart
//Legenda stylen
//30 mins
//12:57