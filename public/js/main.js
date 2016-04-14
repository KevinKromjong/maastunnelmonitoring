$(document).ready(function () {

    connectToWebSocket();

    //Initialize de fanvariabelen
    fan1 = [];
    fan2 = [];
    fan3 = [];
    fan4 = [];
    fan5 = [];

    toggleFanTechnicalInformation();
    plotGraphData();
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

    $.each($('.fan'), function () {
        console.log($('.fan-status', this).attr('class'));
    });



    socket.on('date', function (data) {
        var tijd = new Date(data.date);

        $.each($('.fan'), function () {

            if($('.fan-status', this).attr('class') == 'fan-status red') {
                $('.fan-time-on', this).text('0');
            } else {
                $('.fan-time-on', this).text(
                    (tijd.getHours() < 10 ? '0' : '') + tijd.getHours() + ':' +
                    (tijd.getMinutes() < 10 ? '0' : '') + tijd.getMinutes() + ':' +
                    (tijd.getSeconds() < 10 ? '0' : '') + tijd.getSeconds()
                );
            }
        })
    })
}

function toggleFanTechnicalInformation() {
    $('.fan-information-basic').on('click', function () {
        console.log("nein");
        if (!$('.fan-information-technical').is(':visible')) {
            // $('html, body').animate({scrollTop: $(document).height()}, 'slow')
        }

        $('.fan-information-technical').slideToggle();
    });
}

function configureTooltip() {
    var previousPoint = null;
    $("#fan-graph").bind("plothover", function (event, pos, item) {
        if (item) {
            if (previousPoint != item.datapoint) {
                previousPoint = item.datapoint;
                $("#tooltip").remove();

                time = new Date(item.datapoint[0]);


                showTooltip(item.pageX, item.pageY, item.datapoint[1] + ' Watt (' + (time.getHours() < 10 ? '0' : '') + time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes() + ')');
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
    // someData[seriesIdx].points.show = !someData[seriesIdx].points.show;
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

function calculateAveragePowerUsage(averagePowerUsageLoop, averagePowerUsage) {

    //Als deze NotANumber is (fan staat uit), zet de waarde dan op 0
    if (isNaN(averagePowerUsageLoop)) {
        averagePowerUsage.push(0);
    } else {
        averagePowerUsage.push(averagePowerUsageLoop);
    }

    //Verander de waarde van het gemiddeld stroomverbruik in de juiste waarde
    //Rond de waarde af op twee decimalen.
    $.each($('.fan-power-usage p:last-child'), function (index, value) {
        $(this).html(Math.round(averagePowerUsage[index] * 100) / 100 + ' Watt');
    });
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
    var averagePowerUsageLoop = 0;
    var averagePowerUsage = [];
    var data = [];
    var epochT = (new Date).getTime(); // time right now in js epoch
    var i = 0;
    var colors = ['#9BC2DB', '#DBEDF3', '#A3DFFB', '#C4E3FC', '#A4D4FA'];


    $.each(fansToCheck, function (index, value) {
        if (!0 < value.length) {

            if (value[0][1] > CRITICAL_VALUE) {
                fansToCheck[index]['color'] = '#DD2C00';
            } else {
                fansToCheck[index]['color'] = colors[index];
            }

            data.push({
                idx: i,
                label: 'Ventilator ' + parseInt(index + 1),
                data: fansToCheck[index],
                color: fansToCheck[index]['color']
            });

            //Voor elke entry, pak het stroomverbruik en tel deze op
            $.each(value, function (index, value2) {
                averagePowerUsageLoop += value2[1];
            });

            i++;
        }

        //Deel het opgetelde stroomverbruik door het aantal (gemiddelde)
        averagePowerUsageLoop /= value.length;

        //Bereken het gemiddelde stroomverbruik per fan
        calculateAveragePowerUsage(averagePowerUsageLoop, averagePowerUsage);

        //Zet deze daarna weer op 0 voor de volgende loop.
        averagePowerUsageLoop = 0;

    });

    var options = {
        grid: {
            hoverable: true,
            tooltip: true,
            // markings: [
            //     { color: '#000', lineWidth: 1, yaxis: { from: 180.5, to: 180.5 } },
            // ]
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
            // min: epochT - 90000000, //3 uur
            // max: epochT
        },
        axisLabels: {
            show: true
        },
        xaxes: [{
            axisLabel: 'Tijd in hele uren',
        }],
        yaxes: [{
            position: 'left',
            axisLabel: 'Stroomverbruik in Watt',
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