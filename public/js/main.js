$(document).ready(function () {

    var criticalValue = 128;

    // connectToWebSocket();

    //Initialize de fanvariabelen
    fan1 = [];
    fan2 = [];
    fan3 = [];
    fan4 = [];
    fan5 = [];

    plotGraphData(criticalValue);
    toggleFanTechnicalInformation();
});

/****************
 ***** Main *****
 ****************/
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

function fillDataVariables() {

    $.each(fansGraph, function (key, value) {

        var date = new Date(value['created_at'].replace(/-/g, "/"));
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

function plotGraphData(criticalValue) {

    configureTooltip();
    fillDataVariables();

    var fansToCheck = [fan1, fan2, fan3, fan4, fan5];
    var data = [];
    var epochT = (new Date).getTime(); // time right now in js epoch
    var i = 0;
    var colors = ['#9BC2DB', '#DBEDF3', '#A3DFFB', '#C4E3FC', '#A4D4FA'];


    $.each(fansToCheck, function (index, value) {
        if (!0 < value.length) {

            if (fanDirection == 'noordzijde') {
                label = 'Ventilator N-0' + parseInt(index + 1);
            } else {
                label = 'Ventilator Z-0' + parseInt(index + 1);
            }

            if (value[0][1] > criticalValue) {
                fansToCheck[index]['color'] = '#DD2C00';
            } else {
                fansToCheck[index]['color'] = colors[index];
            }

            data.push({
                idx: i + 1,
                label: label,
                data: fansToCheck[index],
                color: fansToCheck[index]['color']
            });

            i++;
        }
    });

    criticalLine = {
        idx: 0,
        color: '#DD2C00',
        label: 'Kritieke waarde',
        data: [
            [0000000000000, criticalValue],
            [9999999999999, criticalValue]
        ]
    };

    data.unshift(criticalLine);

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
            container: $('#fan-graph-legend'), noColumns: 1, labelFormatter: function (label, series) {
                return '<a id="toggle-legend" href="#" onClick="togglePlot(' + series.idx + ', event); return false;">' + label + '</a>';
            }
        },
        xaxis: {
            mode: "time", timeformat: "%H:%M", tickSize: [1, "hour"], timezone: "browser",
            min: epochT - 43200000, //3 uur
            max: epochT
        },
        axisLabels: {
            show: true
        },
        xaxes: [{
            axisLabel: 'Tijd in hele uren'
        }],
        yaxes: [{
            position: 'left',
            axisLabel: 'Stroomverbruik in Kilowatt'
        }]
    };

    var date2 = new Date('2016-01-01 00:00:00');

    //Teken de plot
    function update() {
        somePlot = $.plot($('#fan-graph'), data, options);
        setTimeout(update, 30000);
    }

    update();
}

function toggleFanTechnicalInformation() {

    var epochT = (new Date).getTime(); // time right now in js epoch
    var fansToCheck = [fan1, fan2, fan3, fan4, fan5];
    var technicalFanOptions = {
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
            axisLabel: 'Tijd in hele uren'
        }],
        yaxes: [{
            position: 'left',
            axisLabel: 'Stroomverbruik in Kilowatt'
        }]
    };
    var technicalFanOptionsFilter = {
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
            mode: "time", timeformat: "%H:%M", tickSize: [3, "hour"], timezone: "browser"
        },
        axisLabels: {
            show: true
        },
        xaxes: [{
            axisLabel: 'Tijd in hele uren'
        }],
        yaxes: [{
            position: 'left',
            axisLabel: 'Stroomverbruik in Kilowatt'
        }]
    };

    filterTechnicalInformation(technicalFanOptionsFilter);

    var previousTarget = null;
    $('.fan').on('click', function () {
        if (this == previousTarget) {
            $('.fan').parent().parent().find('.fan-information-technical').hide('slow');
            $('.expand-fan-button').html('<i style="color: grey" class="fa fa-plus-square-o" aria-hidden="true"></i>');
            previousTarget = null;
        } else {

            $('.expand-fan-button').html('<i style="color: grey" class="fa fa-minus-square-o" aria-hidden="true"></i>');
            previousTarget = this;

            var dataAttributeIndex = ($(this).attr('data-index'));
            $('.fan').parent().parent().find('.fan-information-technical').show('slow');

            $.each(fansToCheck, function (index, value) {

                if (index == dataAttributeIndex) {
                    if (fansOverview[index]['is_on'] == true) {
                        $('#technical-graph').html('').removeClass('fan-off');
                        $('.filter-buttons').show();
                        plotTechnicalGraph = $.plot('#technical-graph', [fansToCheck[index]], technicalFanOptions);
                        plotTechnicalGraph.setupGrid(); //only necessary if your new data will change the axes or grid
                        plotTechnicalGraph.draw();
                    } else {
                        $('.filter-buttons').hide();
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
                            $('.fan-technical-values .fan-power-usage').html(calculateAveragePowerUsageTechnicalGraph(fansToCheck[index]) + " Kilowatt <br/> <span style='font-size: 12px''>(sinds 0 uur geleden)</span>");
                        } else {
                            $('.fan-technical-values .fan-power-usage').html(calculateAveragePowerUsageTechnicalGraph(fansToCheck[index]) + " Kilowatt <br/> <span style='font-size: 12px''>(sinds 6 uur geleden)</span>");
                        }

                        $('.filter').attr('data-fan-number', fansOverview[index]['fan_number']);
                    }
                }
            );
        }
    });
}

function filterTechnicalInformation(options) {
    $('.filter-buttons > div').on('click', function () {
        var timeBack = $(this).attr('data-filter');
        var fanNumber = $(this).attr('data-fan-number');
        var tunnel = $(this).attr('data-tunnel');
        var direction = $(this).attr('data-direction');


        $.ajax({
            // url: 'http://monitoring.maastunnel.dev/api/v1/fans?filter=' + timeBack + '&fan=' + fanNumber + '&tunnel=' + tunnel + '&direction=' + direction,
            url: 'http://10.34.165.54/afstuderen/webapplicatie/maastunnelmonitoring/public/api/v1/fans?filter=' + timeBack + '&fan=' + fanNumber + '&tunnel=' + tunnel + '&direction=' + direction,
            format: 'json',
            async: true,
            success: function (data) {
                console.log(data);
                var data2 = [];

                $.each(data['fans'], function (index, value) {
                    var date = new Date(value['created_at'].replace(/-/g, "/"));
                    data2.push([date, value['power_usage'], parseInt(fanNumber)])
                });

                plotTechnicalGraph = $.plot('#technical-graph', [data2], options);
                plotTechnicalGraph.setupGrid(); //only necessary if your new data will change the axes or grid
                plotTechnicalGraph.draw();
            },
            error: function (x, t, m) {
                if (t === "timeout") {
                    alert("got timeout");
                } else {
                    alert(t);
                }
            }

        });

    });
}

/*******************
 ***** Helpers *****
 *******************/
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

function togglePlot(seriesIdx, event) {

    if (seriesIdx != 0) {
        var someData = somePlot.getData();
        $('#fan-graph-legend .legendLabel > a').on('click', function () {
            $(this).css('display', 'none');
        });
        someData[seriesIdx].lines.show = !someData[seriesIdx].lines.show;
        somePlot.setData(someData);
        somePlot.draw();
    }
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