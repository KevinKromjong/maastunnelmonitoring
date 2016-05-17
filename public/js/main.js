$(document).ready(function () {

    var criticalValue = 130;   // Set the critical value
    fansToCheck = [];   // Initialize the fan container

    // Old colours
    // var colors = ['#DD2C00', '#9BC2DB', '#DBEDF3', '#A3DFFB', '#C4E3FC', '#A4D4FA']; 

    var colors = ['#DD2C00', '#699633', '#83be3e', '#a3cf70', '#c4e0a3', '#e5f1d6'];

    // Execute the necessary functions
    // connectToWebSocket();
    fillFanVariables(fansToCheck);
    plotMainGraph(criticalValue, fansToCheck, colors);
    toggleFanDropdown(fansToCheck, colors);
    loadAjaxLoadingGif();

    // Initialize fancybox
    $(".fancybox").fancybox();

    // Initialize datepicker
    $('#datetimepicker1 input, #datetimepicker2 input').datetimepicker({
            locale: 'nl',
            format: 'DD/MM/YYYY',
            ignoreReadonly: true
    });

    rootUrl = $('meta[name="base_url"]').attr('content');

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

                    } else {
                        $('#technical-graph').html('<p class="fan-off">Deze ventilator staat uit en kan dus geen data weergeven</p>');
                        $('.filter-buttons').hide();
                    }

                    //Enable the filter buttons below the graph in the dropdown
                    filterFanDropdownGraph(colors);

                }
            });

            compareFanData();
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
            url: rootUrl + '/api/v1/fans?filter=' + timeBack + '&fan=' + fanNumber + '&tunnel=' + tunnel + '&direction=' + direction,
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

                if (timeBack == 6 || timeBack == 12) {
                    $('.fan-power-usage').html(calculateAveragePowerConsumption(data['fans'], true) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds " + timeBack + " uur geleden) </span>");
                } else if (timeBack == 1) {
                    $('.fan-power-usage').html(calculateAveragePowerConsumption(data['fans'], true) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds " + timeBack + " dag geleden) </span>");
                } else {
                    $('.fan-power-usage').html(calculateAveragePowerConsumption(data['fans'], true) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds " + timeBack + " dagen geleden) </span>");
                }

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
                        technicalFanOptionsFilter.xaxis.tickSize = [1, 'hour'];
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
 * Loads the gif while fetching and processing ajax calls
 */
function loadAjaxLoadingGif() {
    $(document).on({
        ajaxStart: function() { $('body').addClass("loading");    },
        ajaxStop: function() { $('body').removeClass("loading"); }
    });
}

/**
 * Calculates the average power consumption for te information in the dropdown
 *
 * @param dataArray: the array with all the data (not just the power consumption)
 * @param filter: true if the calculation applies to the filtering of data, false if the calculation applies to the dropdown data
 * @returns {number}: returns 0 if there occurs an error, returns the average power consumption if it calculates succesfully.
 */
function calculateAveragePowerConsumption(dataArray, filter) {

    var averagePowerUsage = 0;
    var i = 0;

    if (!filter) {
        $.each(dataArray, function (index, value) {
            averagePowerUsage += value[1];
            i++;
        });
    } else {
        $.each(dataArray, function (index, value) {
            averagePowerUsage += value['power_usage'];
            i++;
        });
    }

    if (isNaN(averagePowerUsage / i)) {
        return 0;
    } else {
        return Math.round((averagePowerUsage / i) * 100) / 100
    }
}

/**
 * Calculates the differences in power consumption in percentage and units
 *
 * @param fanOneData: the array with all the data for fan one(not just the power consumption)
 * @param fanTwoData: the array with all the data for fan two (not just the power consumption)
 */
function calculateAveragePowerDifferences(fanOneData, fanTwoData) {
    var fanOneAveragePowerConsumption = calculateAveragePowerConsumption(fanOneData, true);
    var fanTwoAveragePowerConsumption = calculateAveragePowerConsumption(fanTwoData, true);
    var fanPowerConsumptionDifference = Math.round(((fanTwoAveragePowerConsumption - fanOneAveragePowerConsumption) / fanOneAveragePowerConsumption) * 100) / 100;

    $('#fan-one-power').html(fanOneAveragePowerConsumption + ' Kilowatt');
    $('#fan-two-power').html(fanTwoAveragePowerConsumption + ' Kilowatt');

    // If the power consumption of fan 1 and fan 2 equals 0 ..
    if (fanOneAveragePowerConsumption == 0 && fanTwoAveragePowerConsumption == 0) {
        $('#fan-power-difference-unit').html(0 + ' Kilowatt').addClass('warning').removeClass('danger success');
        $('#fan-power-difference-percentage').html(0 + '%').addClass('warning').removeClass('danger success');
        // If the power consumption of fan 1 equals 0..
    } else if (fanOneAveragePowerConsumption == 0) {
        $('#fan-power-difference-unit').html('+' + fanTwoAveragePowerConsumption + ' Kilowatt').addClass('success').removeClass('danger warning');
        $('#fan-power-difference-percentage').html('-').addClass('warning').removeClass('danger success');
        // If the power consumption of fan 2 equals 0..
    } else if (fanTwoAveragePowerConsumption == 0) {
        $('#fan-power-difference-unit').html('-' + fanOneAveragePowerConsumption + ' Kilowatt').addClass('danger').removeClass('success warning');
        $('#fan-power-difference-percentage').html('-').addClass('warning').removeClass('success danger');
        // If the difference between the power consumption of fan 1 and fan 2 equals 0..
    } else if (fanPowerConsumptionDifference == 0) {
        $('#fan-power-difference-unit').html(Math.round((fanOneAveragePowerConsumption - fanTwoAveragePowerConsumption) * 100) / 100 + ' Kilowatt').addClass('warning').removeClass('success danger');
        $('#fan-power-difference-percentage').html(fanPowerConsumptionDifference + '%').addClass('warning').removeClass('success danger');
        // If the difference between the power consumption of fan 1 and fan 2 is less than 0..
    } else if (fanPowerConsumptionDifference < 0) {
        $('#fan-power-difference-unit').html(Math.round((fanOneAveragePowerConsumption - fanTwoAveragePowerConsumption) * 100) / 100 + ' Kilowatt').addClass('danger').removeClass('success warning');
        $('#fan-power-difference-percentage').html(fanPowerConsumptionDifference + '%').addClass('danger').removeClass('success warning');
        // If the difference between the power consumption of fan 1 and fan 2 is greater than 0..
    } else {
        $('#fan-power-difference-unit').html('+' + Math.round((fanTwoAveragePowerConsumption - fanOneAveragePowerConsumption) * 100) / 100 + ' Kilowatt').addClass('success').removeClass('danger warning');
        $('#fan-power-difference-percentage').html('+' + fanPowerConsumptionDifference + '%').addClass('success').removeClass('danger warning');
    }
}

/**
 * Calculates the total time the fans are on

 * @param firstTime: the array with all the data for fan one(not just the time)
 * @param secondTime: the array with all the data for fan one(not just the time)
 */
function calculateTotalFanTimeOn(firstTime, secondTime) {

    var fanOneDateSplit = firstTime.split('/');
    var fanTwoDateSplit = secondTime.split('/');
    var fanOneDate = new Date(fanOneDateSplit[2], fanOneDateSplit[1], fanOneDateSplit[0] - 1);
    var fanTwoDate = new Date(fanTwoDateSplit[2], fanTwoDateSplit[1], fanTwoDateSplit[0] - 1);
    var dayOrDaysFanOne = ' dagen';
    var dayOrDaysFanTwo = ' dagen';
    var dayOrDays = ' dagen';

    var fanTimeDifference = Math.round((fanTwoDate - fanOneDate) / (1000 * 60 * 60 * 24));

    if (fanTimeDifference > 21) {
        var randomTimeFanOne = Math.floor((Math.random() * fanTimeDifference) + fanTimeDifference - 20);
        var randomTimeFanTwo = Math.floor((Math.random() * fanTimeDifference) + fanTimeDifference - 20);
    } else {
        var randomTimeFanOne = Math.floor((Math.random() * fanTimeDifference) + fanTimeDifference);
        var randomTimeFanTwo = Math.floor((Math.random() * fanTimeDifference) + fanTimeDifference);
    }

    if (randomTimeFanOne == 1) {
        dayOrDaysFanOne = ' dag';
    } else if (randomTimeFanTwo == 1) {
        dayOrDaysFanTwo = ' dag';
    }
    if (randomTimeFanOne - randomTimeFanTwo == 1 || randomTimeFanTwo - randomTimeFanOne == 1) {
        dayOrDays = ' dag'
    }

    $('#fan-one-time-on').html(randomTimeFanOne + dayOrDaysFanOne);
    $('#fan-two-time-on').html(randomTimeFanTwo + dayOrDaysFanTwo);

    if (randomTimeFanOne > randomTimeFanTwo) {
        $('#fan-time-on-difference-unit').html(randomTimeFanOne - randomTimeFanTwo + dayOrDays)
    } else {
        $('#fan-time-on-difference-unit').html(randomTimeFanTwo - randomTimeFanOne + dayOrDays);
    }

    var fanTimePercentage = Math.round(((randomTimeFanTwo - randomTimeFanOne) / randomTimeFanOne) * 100 * 100) / 100;
    $('#fan-time-on-difference-percentage').html(fanTimePercentage + '%');
}

/**
 * Calculates the life expextancy of the fans
 */
function calculateTechnicalLifeExpextancy() {
    var fanOneTheoretical = $('#fan-one-theoretical-life-expectancy').text().charAt(0);
    var fanTwoTheoretical = $('#fan-two-theoretical-life-expectancy').text().charAt(0);

    var fanOneTechnical = Math.floor((Math.random() * fanOneTheoretical) + 1);
    var fanTwoTechnical = Math.floor((Math.random() * fanTwoTheoretical) + 1);

    $('#fan-one-technical-life-expectancy').html('Nog <br/>' + fanOneTechnical + ' jaar');
    $('#fan-two-technical-life-expectancy').html('Nog <br/>' + fanTwoTechnical + ' jaar');

    if (fanOneTechnical > fanTwoTechnical) {
        $("#fan-technical-life-expectancy-difference").html(fanOneTechnical - fanTwoTechnical + ' jaar');
    } else {
        $("#fan-technical-life-expectancy-difference").html(fanTwoTechnical - fanOneTechnical + ' jaar');
    }

    var technicalLifeExpectancyPercentage = Math.round(((fanTwoTechnical - fanOneTechnical) / fanOneTechnical) * 100);

    if (technicalLifeExpectancyPercentage > 0) {
        $('#fan-technical-life-expectancy-difference-percentage').html('+' + technicalLifeExpectancyPercentage + '%');
    } else {
        $('#fan-technical-life-expectancy-difference-percentage').html(technicalLifeExpectancyPercentage + '%');
    }

}

/**
 * Draws the graph with the given data
 *
 * @param fanOneData: the array with all the data for fan one(not just the power consumption)
 * @param fanTwoData: the array with all the data for fan two (not just the power consumption)
 */
function fillCompareGraph(fanOneData, fanTwoData) {

    var fanOnePowerUsage = [];
    var fanTwoPowerUsage = [];

    // if($('#fan-one-power').text() == '0 Kilowatt' && $('#fan-two-power').text() == '0 Kilowatt') {
    //     $('#placeholder').addClass('fan-off').html('Er is geen verbruik beschikbaar van de gekozen ventilatoren binnen het gekozen tijdsbestek');
    // } else {
        $.each(fanOneData, function (key, value) {
            var date = new Date(value['created_at'].replace(/-/g, "/"));
            fanOnePowerUsage.push([date.getTime(), value['power_usage']]);
        });

        $.each(fanTwoData, function (key, value) {
            var date = new Date(value['created_at'].replace(/-/g, "/"));
            fanTwoPowerUsage.push([date.getTime(), value['power_usage']]);
        });

        var data = [
            {
                data: fanOnePowerUsage,
                color: '#83be3e'
            },
            {
                data: fanTwoPowerUsage,
                color: '#c4e0a3'
            }
        ];
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
                mode: "time", timeformat: "%H:%M", tickSize: [6, "hour"], timezone: "browser"
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

        $("#placeholder").show();
        $('.table-compare').show();
        // $('.fancybox-inner').css('height', '750px');
        $('.fancybox-inner').css('height', 'auto');

        var compareGraph = $.plot($("#placeholder"), data, options);
        compareGraph.resize();
        compareGraph.setupGrid();
        compareGraph.draw();
    // }
}

/**
 * Creates an alert box with custom text
 *
 * @param text: The text that the alert box shows
 * @returns: The alert box with the given text
 */
function createWarning(text) {
    return '<div class="alert alert-danger empty-input" role="alert">' +
        '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span>' +
        '<span class="sr-only">Error:</span>' + text +
        '</div>';
}

/**
 * Checks if the second calendar date is greater than the first calendar date
 *
 * @returns {boolean}
 */
function checkCalendarDate() {
    var dateOne = $('#datetimepicker1 input').val().split("/");
    var dateTwo = $('#datetimepicker2 input').val().split("/");

    var convertedDateOne = new Date(dateOne[2], dateOne[1] - 1, dateOne[0]);
    var convertedDateTwo = new Date(dateTwo[2], dateTwo[1] - 1, dateTwo[0]);

    if (convertedDateOne > convertedDateTwo) {
        return $('.warning-placeholder').html(createWarning(' De eerste datum moet eerder zijn dan de tweede datum!')).show();
    } else if (convertedDateOne.getTime() == convertedDateTwo.getTime()) {
        return $('.warning-placeholder').html(createWarning(' De twee datums moeten wel van dag verschillen!')).show();
    }
}

/**
 * Serves as a facade for the calculation functions
 *
 * @param data: the datasets of the two fans
 * @param firstTime: the first date for the comparison
 * @param secondTime: the second date for the comparison
 */
function retrieveCompareDataAjaxCallback(data, firstTime, secondTime) {
    var fanOneData = data['fanOne'];
    var fanTwoData = data['fanTwo'];

    calculateAveragePowerDifferences(fanOneData, fanTwoData);

    calculateTotalFanTimeOn(firstTime, secondTime);

    calculateTechnicalLifeExpextancy();

    fillCompareGraph(fanOneData, fanTwoData);
}

function retrieveCompareData(firstTime, secondTime, tunnelOne, tunnelTwo, directionOne, directionTwo, fanOne, fanTwo) {

    $.ajax({
        url: rootUrl + '/api/v1/fans?compare=1' +
        '&firstTime=' + firstTime +
        '&secondTime=' + secondTime +
        '&tunnelOne=' + tunnelOne +
        '&tunnelTwo=' + tunnelTwo +
        '&directionOne=' + directionOne +
        '&directionTwo=' + directionTwo +
        '&fanOne=' + fanOne +
        '&fanTwo=' + fanTwo,
        type: 'get',
        format: 'json',
        async: true,
        success: function (data) {
            retrieveCompareDataAjaxCallback(data, firstTime, secondTime);
        }
    });
}

/**
 *  Randomizes the data in the comparison popup
 */
function compareFanData() {
    $('#compare-chosen-button').on('click', function () {

        var fanOneOptionGroup = $('#fan-to-compare-one :selected').parent().attr('label');
        var fanTwoOptionGroup = $('#fan-to-compare-two :selected').parent().attr('label');

        var fanOneName = $('#fan-to-compare-one').val();
        var fanTwoName = $('#fan-to-compare-two').val();

        var fanOneTime = $('#datetimepicker1').find('input').val();
        var fanTwoTime = $('#datetimepicker2').find('input').val();

        // Check if the user entered all information before continuing.
        if ($('#fan-to-compare-one').val() == null || $('#fan-to-compare-two').val() == null) {
            $('.warning-placeholder').html(createWarning(' Je moet een ventilator kiezen!')).show();
            return false;
        } else if ($('#datetimepicker1').find('input').val() == '' || $('#datetimepicker2').find('input').val() == '') {
            $('.warning-placeholder').html(createWarning(' Je moet een datum kiezen om de ventilatoren te vergelijken!')).show();
            return false;
        } else if (checkCalendarDate()) {
            checkCalendarDate();
            return false;
        } else {
            $('.warning-placeholder').hide();
        }

        retrieveCompareData(fanOneTime, fanTwoTime, fanOneOptionGroup.split('-')[0], fanTwoOptionGroup.split('-')[0], fanOneOptionGroup.split('-')[1], fanTwoOptionGroup.split('-')[1], fanOneName.slice(-1), fanTwoName.slice(-1));

        var fanOneSplit = $('#fan-to-compare-one').val().splice

        // Enter the names of the chosen fans into the table headers.
        $('#chosen-fan-one').html($('#fan-to-compare-one').val() + '<span class="compare-fan-one-colour"></span>');
        $('#chosen-fan-two').html($('#fan-to-compare-two').val() + '<span class="compare-fan-two-colour"></span>');
        $('#chosen-fan-difference').html('Verschil <br/>' + $('#fan-to-compare-one').val() + ' t.o.v. <br/> ' + $('#fan-to-compare-two').val());

    })
}
