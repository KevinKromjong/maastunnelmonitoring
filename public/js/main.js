$(document).ready(function () {

    var criticalValue = 190;   // Set the critical value
    fansToCheck = [];   // Initialize the fan container

    // Old colours
    // var colors = ['#DD2C00', '#9BC2DB', '#DBEDF3', '#A3DFFB', '#C4E3FC', '#A4D4FA']; 

    var colors = ['#DD2C00', '#699633', '#83be3e', '#a3cf70', '#c4e0a3', '#e5f1d6'];


    // var data1 = [[0,1], [10,1]];
    // var data2 = [[0,2], [10,2]];
    // var data3 = [[0,3], [10,3]];
    // var data4 = [[0,4], [10,4]];
    // var data5 = [[0,5], [10,5]];
    // var data6 = [[0,6], [10,6]];
    //
    // var dataset = [
    //     {
    //         data : data1,
    //         color : colors[0]
    //     },
    //     {
    //         data : data2,
    //         color : colors[1]
    //     },
    //     {
    //         data : data3,
    //         color : colors[2]
    //     },
    //     {
    //         data : data4,
    //         color : colors[3]
    //     },
    //     {
    //         data : data5,
    //         color : colors[4]
    //     },
    //     {
    //         data : data6,
    //         color : colors[5]
    //     }
    // ];
    // var options = {
    //     series : {
    //         lines : {
    //             show : true
    //         },
    //         points : {
    //             radius : 3,
    //             show : true
    //         }
    //     }
    // };
    //
    // $.plot($('#testgraph'), dataset, options    );

    //Execute the necessary functions

    connectToWebSocket();
    fillFanVariables(fansToCheck);
    plotMainGraph(criticalValue, fansToCheck, colors);
    toggleFanDropdown(fansToCheck, colors);
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
        var fantime = new Date(data.date);

        if ($('.fan-information-technical .fan-status').attr('class') == 'fan-status red') {
            $('.fan-information-technical .fan-time-on').text('0');
        } else {
            $('.fan-information-technical .fan-time-on').text(
                (fantime.getHours() < 10 ? '0' : '') + fantime.getHours() + ':' +
                (fantime.getMinutes() < 10 ? '0' : '') + fantime.getMinutes() + ':' +
                (fantime.getSeconds() < 10 ? '0' : '') + fantime.getSeconds()
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
function plotMainGraph(criticalValue, fansToCheck, colors) {

    var epochT = (new Date).getTime();
    var dataset = [];
    var i = 1;
    var lowest = 1000;
    var highest = 0;

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

            $.each(value, function (index2, value2) {
                if (value2[1] < lowest)
                    lowest = value2[1];

                if (value2[1] > highest)
                    highest = value2[1];
            });

            // Pushes the data from the fan to the dataset variable
            // This variable holds all the data from all the fans
            dataset.push({
                data: value,
                label: label,
                idx: i,
                color: colors[index + 1]
            });

            i++
        }
    });

    // Configure the critial line
    criticalLine = {
        idx: 0,
        color: colors[0],
        label: '<span style="text-decoration: underline">Gevarenzone</span> <br/>' + criticalValue + ' Kilowatt',
        data: [
            [0, criticalValue],
            [9999999999999, criticalValue]
        ]
    };
    
    // Add the critical line to the dataset variable
    dataset.unshift(criticalLine);


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
        }],
        yaxis: {
            min: lowest - 10,
            max: highest + 10
        }
    }; //The options for the graph

    // Plot the plot and update it every 30 seconds
    if (window.matchMedia('(max-width: 640px)').matches) {
        options.xaxis.tickSize = [2, 'hour'];
        mainGraph = $.plot($('#fan-graph'), dataset, options);
    } else {
        mainGraph = $.plot($('#fan-graph'), dataset, options);
    }

    window.onresize = function () {
        mainGraph.resize();
        mainGraph.setupGrid();
        mainGraph.draw();
    };

    // function update() {
    //     mainGraph.setupGrid();
    //     mainGraph.draw();
    //     setTimeout(update, 10000);
    // }
    //
    // update();
}

/**
 * Toggles the dropdown when clicked on a fan
 *
 * @param fansToCheck: the list of fans to check. Normally, it contains all five fans
 * @param colors: an array of the colors the lines in the graph have
 */
function toggleFanDropdown(fansToCheck, colors) {

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
            mode: "time", timeformat: "%H:%M", tickSize: [3, "hour"], timezone: "browser",
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
                        $('.filter-buttons').show();
                        plotTechnicalGraph = $.plot($('#technical-graph'), [{
                            data: fansToCheck[index], color: colors[index + 1]
                        }], technicalFanOptions);
                        plotTechnicalGraph.resize();
                        plotTechnicalGraph.setupGrid();
                        plotTechnicalGraph.draw();

                        // window.onresize = function() {
                        // plotTechnicalGraph = $.plot($('#technical-graph'), [{ data: fansToCheck[index], color: colors[index + 1]}], technicalFanOptions);
                        // };

                    } else {
                        $('#technical-graph').html('<p class="fan-off">Deze ventilator staat uit en kan dus geen data weergeven</p>');
                        $('.filter-buttons').hide();
                    }

                    //Enable the filter buttons below the graph in the dropdown
                    filterFanDropdownGraph(colors);

                }
            });
        }
    });

}

/**
 * Filters the graph in the dropdown
 *
 * @param colors: an array of the colors the lines in the graph have
 */
function filterFanDropdownGraph(colors) {

    $('.filter-buttons > div').on('click', function (event) {

        var previousTarget = null;
        var timeBack = $(this).attr('data-filter');
        var fanNumber = $(this).attr('data-fan-number');
        var tunnel = $(this).attr('data-tunnel');
        var direction = $(this).attr('data-direction');

        // Change the color when clicked on a filter to a darker color
        // Change the color of the other elements back to their normal color
        var parent = $(event.target).parent().parent().find('div');
        $(parent).css('background', '#dfdfdf');

        if (this != previousTarget) {
            $(this).css('background', 'darkgrey');
            previousTarget = null;
        }

        // When the user wants to filter data, send an AJAX-request to the API, fetch the data and update the graph accordingly
        $.ajax({
            // url: 'http://monitoring.maastunnel.dev/api/v1/fans?filter=' + timeBack + '&fan=' + fanNumber + '&tunnel=' + tunnel + '&direction=' + direction,
            // url: 'http://10.34.164.155/afstuderen/webapplicatie/maastunnelmonitoring/public/api/v1/fans?filter=' + timeBack + '&fan=' + fanNumber + '&tunnel=' + tunnel + '&direction=' + direction,
            url: 'http://146.185.130.75/api/v1/fans?filter=' + timeBack + '&fan=' + fanNumber + '&tunnel=' + tunnel + '&direction=' + direction,
            format: 'json',
            async: true,
            success: function (data) {

                var filteredData = [];
                var lowest = 1000;
                var highest = 0;

                $.each(data['fans'], function (index, value) {
                    if (value['power_usage'] < lowest)
                        lowest = value['power_usage'];

                    if (value['power_usage'] > highest)
                        highest = value['power_usage'];

                    var date = new Date(value['created_at'].replace(/-/g, "/"));
                    filteredData.push([date, value['power_usage'], parseInt(fanNumber)]);
                });

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
                        mode: "time", timeformat: "%H:%M", tickSize: [1, "hour"], timezone: "browser"
                    },
                    xaxes: [{
                        axisLabel: 'Tijd in hele uren'
                    }],
                    yaxis: {
                        min: lowest - 10,
                        max: highest + 10
                    },
                    yaxes: [{
                        position: 'left',
                        axisLabel: 'Stroomverbruik in Kilowatt'
                    }],
                    axisLabels: {
                        show: true
                    }
                };

                switch (timeBack) {
                    case '6' :
                        technicalFanOptionsFilter.xaxis.tickSize = [2, 'hour'];
                        break;
                    case '12' :
                        technicalFanOptionsFilter.xaxis.tickSize = [2, 'hour'];
                        break;
                    case '1' :
                        technicalFanOptionsFilter.xaxis.tickSize = [3, 'hour'];
                        break;
                    case '2' :
                        technicalFanOptionsFilter.xaxis.tickSize = [6, 'hour'];
                        break;
                }

                plotTechnicalGraph = $.plot($('#technical-graph'), [{
                    data: filteredData,
                    color: colors[fanNumber]
                }], technicalFanOptionsFilter);
                plotTechnicalGraph.resize();
                plotTechnicalGraph.setupGrid();
                plotTechnicalGraph.draw();

                // window.onresize = function() {
                //     plotTechnicalGraph = $.plot($('#technical-graph'), [{ data: filteredData, color: colors[fanNumber] }], technicalFanOptionsFilter);
                // }
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
