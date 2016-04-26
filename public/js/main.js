$(document).ready(function () {

    var criticalValue = 128;    // Set the critical value
    fansToCheck = [];   // Initialize the fan variables

    //Execute the necessary functions
    connectToWebSocket();
    fillFanVariables();
    plotMainGraph(criticalValue, fansToCheck);
    toggleFanDropdown(fansToCheck);
});


/**
 * Connects to the websocket via server.js
 * Uses the websocket to display the correct runtime of a fan
 *
 */
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


/**
 * Fills fanOne through fanFive with the data from the database
 * The fanGraph variable contains the database data
 */
function fillFanVariables() {

    var fanOne = [];
    var fanTwo = [];
    var fanThree = [];
    var fanFour = [];
    var fanFive = [];

    // For each entry from the database..
    $.each(fansGraph, function (key, value) {

        // Format the display so the graph can display the data correctly
        // If the fan is on, fill the fan variable according to the number of the fan
        var date = new Date(value['created_at'].replace(/-/g, "/"));
        if (value['is_on'] === true) {
            switch (value['fan_number']) {
                case 1 :
                    fanOne.push([date.getTime(), value['power_usage']]);
                    break;
                case 2 :
                    fanTwo.push([date.getTime(), value['power_usage']]);
                    break;
                case 3 :
                    fanThree.push([date.getTime(), value['power_usage']]);
                    break;
                case 4 :
                    fanFour.push([date.getTime(), value['power_usage']]);
                    break;
                case 5 :
                    fanFive.push([date.getTime(), value['power_usage']]);
                    break;
            }
        }
    });

    return fansToCheck = [fanOne, fanTwo, fanThree, fanFour, fanFive];
}


/**
 * Plots the main graph at the bottom of the fanspage
 *
 * @param criticalValue: the critical value declared at the top of the page
 * @param fansToCheck: the list of fans to check. Normally, it contains all five fans
 */
function plotMainGraph(criticalValue, fansToCheck) {

    var colors = ['#9BC2DB', '#DBEDF3', '#A3DFFB', '#C4E3FC', '#A4D4FA'];
    var epochT = (new Date).getTime();
    var dataset = [];
    var i = 1;
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
                return '<a id="toggle-legend" href="#" onClick="togglePlot(' + series.idx + '); return false;">' + label + '</a>';
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
    }; //The options for the graph

    // Enables tooltips and executes the function that fills the fan variables
    configureTooltip();

    // For each fan..
    $.each(fansToCheck, function (index, value) {
        var label;

        // If the fan has more than one entry (= if the fan is on)
        if (!0 < value.length) {

            // Check the direction of the fan and set the name accordingly
            if (fanDirection == 'noordzijde') {
                label = 'Ventilator N-0' + parseInt(index + 1);
            } else {
                label = 'Ventilator Z-0' + parseInt(index + 1);
            }

            // Pushes the data from the fan to the dataset variable
            // This variable holds all the data from all the fans
            dataset.push({
                data: value,
                label: label,
                idx: i,
                color: colors[index]
            });

            i++
        }
    });

    // Configure the critial line
    var criticalLine = {
        idx: 0,
        color: '#DD2C00',
        label: 'Kritieke waarde',
        data: [
            [0, criticalValue],
            [9999999999999, criticalValue]
        ]
    };

    // Add the critical line to the dataset variable
    dataset.unshift(criticalLine);

    // Plot the plot and update it every 30 seconds
    function update() {
        mainGraph = $.plot($('#fan-graph'), dataset, options);
        setTimeout(update, 30000);
    }

    update();
}

/**
 * Toggles the dropdown when clicked on a fan
 *
 * @param fansToCheck: the list of fans to check. Normally, it contains all five fans
 */
function toggleFanDropdown(fansToCheck) {

    var epochT = (new Date).getTime(); // time right now in js epoch
    var dataAttributeIndex;
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

    // If clicked on a fan..
    var previousTarget = null;
    $('.fan').on('click', function () {

        // Check if already clicked on a fan
        // If, close the dropdown and change the minus icon to a plus icon
        if (this == previousTarget) {
            $('.fan').parent().parent().find('.fan-information-technical').hide('slow');
            $('.expand-fan-button').html('<i style="color: grey" class="fa fa-plus-square-o" aria-hidden="true"></i>');
            previousTarget = null;
        } else {
            // Change the plus icon to a minus icon
            $('.expand-fan-button').html('<i style="color: grey" class="fa fa-minus-square-o" aria-hidden="true"></i>');

            previousTarget = this;

            // Get the index data-attribute
            dataAttributeIndex = ($(this).attr('data-index'));
            $('.fan').parent().parent().find('.fan-information-technical').show('slow');

            // For each fan, get the data from the clicked fan (data attribute) from the fansToCheck variable
            $.each(fansToCheck, function (index, value) {
                if (index == dataAttributeIndex) {

                    // Change the title of the fan in the dropdown
                    if (fansOverview[index]['direction'] == 'north') {
                        $('.fan-information-technical h1').html('ventilator <br/> N-0' + fansOverview[index]['fan_number'])
                    } else {
                        $('.fan-information-technical h1').html('ventilator <br/> Z-0' + fansOverview[index]['fan_number']);
                    }

                    // Change the blow direction of the fan in the dropdown
                    if (fansOverview[index]['blow_direction'] == 'north') {
                        $('.fan-information-technical .fan-blowing-direction').html('Noord');
                    } else {
                        $('.fan-information-technical .fan-blowing-direction').html('Zuid');
                    }

                    // Change the status of the fan in the dropdown
                    if (fansOverview[index]['is_on'] == true) {
                        $('.fan-information-technical .fan-status').html('AAN').addClass('green').removeClass('red');
                    } else {
                        $('.fan-information-technical .fan-status').html('UIT').addClass('red').removeClass('green');
                    }

                    // Change the average power usage of the fan in the dropdown
                    if (calculateAveragePowerConsumption(fansToCheck[index]) == 0) {
                        $('.fan-power-usage').html(calculateAveragePowerConsumption(fansToCheck[index]) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds 0 uur geleden) </span>");
                    } else {
                        $('.fan-power-usage').html(calculateAveragePowerConsumption(fansToCheck[index]) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds 6 uur geleden) </span>");
                    }

                    // Give the element with the filter class the correct fan-number
                    $('.filter').attr('data-fan-number', fansOverview[index]['fan_number']);

                    // If the fan is on: plot the data according to the clicked fan
                    // If the fan is off: show a message that the fan is off, so there is no data to fetch and display
                    if (fansOverview[index]['is_on'] == true) {
                        $('#technical-graph').html('').removeClass('fan-off');
                        plotTechnicalGraph = $.plot('#technical-graph', [fansToCheck[index]], technicalFanOptions);
                        plotTechnicalGraph.setupGrid(); //only necessary if your new data will change the axes or grid
                        plotTechnicalGraph.draw();
                    } else {
                        $('#technical-graph').html('<p class="fan-off">Deze ventilator staat uit en kan dus geen data weergeven</p>')
                    }

                    //Enable the filter buttons below the graph in the dropdown
                    filterDropdownGraph();

                }
            });
        }
    });

}

/**
 * Filters the graph in the dropdown
 */
function filterDropdownGraph() {
    $('.filter-buttons > div').on('click', function () {
        var timeBack = $(this).attr('data-filter');
        var fanNumber = $(this).attr('data-fan-number');
        var tunnel = $(this).attr('data-tunnel');
        var direction = $(this).attr('data-direction');
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

        // When the user wants to filter data, send an AJAX-request to the API, fetch the data and update the graph accordingly
        $.ajax({
            url: 'http://monitoring.maastunnel.dev/api/v1/fans?filter=' + timeBack + '&fan=' + fanNumber + '&tunnel=' + tunnel + '&direction=' + direction,
            // url: 'http://10.34.164.103/afstuderen/webapplicatie/maastunnelmonitoring/public/api/v1/fans?filter=' + timeBack + '&fan=' + fanNumber + '&tunnel=' + tunnel + '&direction=' + direction,
            format: 'json',
            async: true,
            success: function (data) {
                var filteredData = [];

                $.each(data['fans'], function (index, value) {
                    var date = new Date(value['created_at'].replace(/-/g, "/"));
                    filteredData.push([date, value['power_usage'], parseInt(fanNumber)]);
                });

                plotTechnicalGraph = $.plot('#technical-graph', [filteredData], technicalFanOptionsFilter);
                plotTechnicalGraph.setupGrid();
                plotTechnicalGraph.draw();
            },
            error: function () {
                alert("Er is een time-out opgetreden!")
            }

        });

    });
}

/**
 * Configures the tooltips when hovering over a datapoint in the graph
 */
function configureTooltip() {
    var previousPoint = null;
    $("#technical-graph, #fan-graph").bind("plothover", function (event, pos, item) {
        if (item) {
            if (previousPoint != item.datapoint) {
                previousPoint = item.datapoint;
                $("#tooltip").remove();
                var time = new Date(item.datapoint[0]);
                showTooltip(item.pageX, item.pageY, item.datapoint[1].toFixed(2) + ' Kilowatt (' + (time.getHours() < 10 ? '0' : '') + time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes() + ')');
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
}

/**
 * Show or hide a line in the graph when the user clicks a line in the legend
 */
function togglePlot(seriesIdx) {
    if (seriesIdx != 0) {
        var someData = mainGraph.getData();
        someData[seriesIdx].lines.show = !someData[seriesIdx].lines.show;
        mainGraph.setData(someData);
        mainGraph.draw();
    }
}

/**
 * Set the tooltips style
 */
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

/**
 * Calculates the average power consumption for te information in the dropdown
 */
function calculateAveragePowerConsumption(dataArray) {
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