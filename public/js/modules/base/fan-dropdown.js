/*
 |--------------------------------------------------------------------------
 | Fan Dropdown Module
 |--------------------------------------------------------------------------
 |
 | Toggles the dropdown when clicked on a fan
 |
 */

var FanDropdown = (function () {

    var s;
    
    return {

        settings: {
            epochT: (new Date).getTime(),       // The current time
            dataAttributeIndex: '',             // The value of the data-attribute: index
            previousTargetFanblock: null,       // The previously clicked fanblock
            previousTargetFilter: null,         // The previously clicked filteroption
            filterGraphOptions : {},
            filterTimeBack: '',                // The data-attribute: timeback on the filter button
            filterFanNumber: '',               // The data-attribute: fanNumber on the filter button
            filterTunnel: '',                  // The data-attribute: tunnel on the filter button
            filterDirection: ''                // The data-attribute: direction on the filter button
        },

        init: function () {
            s = this.settings;

            this.onFanClick();
            this.filter();
        },

        graphOptions: function () {
            return {
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
                    min: s.epochT - 10800000, //3 uur
                    max: s.epochT
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
            }
        },

        onFanClick: function () {

            // If clicked on a fan..
            $('.fan').on('click', function () {

                // Check if already clicked on a fan
                // If, close the dropdown and change the minus icon to a plus icon
                if (this == s.previousTarget) {
                    $('.fan').parent().parent().find('.fan-information-technical').hide('slow');
                    $('.expand-fan-button').html('<i style="color: grey" class="fa fa-plus-square-o" aria-hidden="true"></i>');
                    s.previousTarget = null;
                } else {
                    // Change the plus icon to a minus icon
                    $('.expand-fan-button').html('<i style="color: grey" class="fa fa-minus-square-o" aria-hidden="true"></i>');

                    s.previousTarget = this;

                    // Get the index data-attribute
                    s.dataAttributeIndex = ($(this).attr('data-index'));
                    $('.fan').parent().parent().find('.fan-information-technical').show('slow');

                    FanDropdown.changeInformation();
                }
            });
        },

        changeInformation: function () {
            // For each fan, get the data from the clicked fan (data attribute) from the fansToCheck variable
            $.each(FanVariables.returnFanVariables(), function (index, value) {

                if (index == s.dataAttributeIndex) {
                    FanDropdown.changeFanTitle(index);
                    FanDropdown.changeFanBlowDirection(index);
                    FanDropdown.changeFanStatus(index);
                    FanDropdown.changeFanAveragePower(index);
                    FanDropdown.plotOrMessage(index);
                }
            });
        },

        changeFanTitle: function (index) {
            // Change the title of the fan in the dropdown
            if (fansOverview[index]['direction'] == 'north') {
                return $('.fan-information-technical h1').html('ventilator <br/> N-0' + fansOverview[index]['fan_number'])
            } else {
                return $('.fan-information-technical h1').html('ventilator <br/> Z-0' + fansOverview[index]['fan_number']);
            }
        },

        changeFanBlowDirection: function (index) {
            // Change the blow direction of the fan in the dropdown
            if (fansOverview[index]['blow_direction'] == 'north') {
                $('.fan-information-technical .fan-blowing-direction').html('Noord');
            } else {
                $('.fan-information-technical .fan-blowing-direction').html('Zuid');
            }
        },

        changeFanStatus: function (index) {
            // Change the status of the fan in the dropdown
            if (fansOverview[index]['is_on'] == true) {
                $('.fan-information-technical .fan-status').html('AAN').addClass('green').removeClass('red');
            } else {
                $('.fan-information-technical .fan-status').html('UIT').addClass('red').removeClass('green');
            }
        },

        changeFanAveragePower: function (index) {
            // Change the average power usage of the fan in the dropdown
            if (AveragePowerConsumption.calculate(FanVariables.returnFanVariables()[index]) == 0) {
                $('.fan-power-usage').html(AveragePowerConsumption.calculate(FanVariables.returnFanVariables()[index]) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds 0 uur geleden) </span>");
            } else {
                $('.fan-power-usage').html(AveragePowerConsumption.calculate(FanVariables.returnFanVariables()[index]) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds 6 uur geleden) </span>");
            }
        },

        plotOrMessage: function (index) {
            // Give the element with the filter class the correct fan-number
            $('.filter').attr('data-fan-number', fansOverview[index]['fan_number']);

            // If the fan is on: plot the data according to the clicked fan
            // If the fan is off: show a message that the fan is off, so there is no data to fetch and display

            if (fansOverview[index]['is_on'] == true) {
                $('#technical-graph').html('').removeClass('fan-off');
                $('.filter-buttons').show();
                plotTechnicalGraph = $.plot($('#technical-graph'), [{
                    data: FanVariables.returnFanVariables()[index], color: FanVariables.settings.colors[index + 1]
                }], this.graphOptions());
                plotTechnicalGraph.resize();
                plotTechnicalGraph.setupGrid();
                plotTechnicalGraph.draw();

            } else {
                $('#technical-graph').html('<p class="fan-off">Deze ventilator staat uit en kan dus geen data weergeven</p>');
                $('.filter-buttons').hide();
            }

            FanComparison.init();

        },

        filter: function () {
            $('.filter-buttons > div').on('click', function (event) {

                s.filterTimeBack = $(this).attr('data-filter');
                s.filterFanNumber = $(this).attr('data-fan-number');
                s.filterTunnel = $(this).attr('data-tunnel');
                s.filterDirection = $(this).attr('data-direction');

                // Change the color when clicked on a filter to a darker color
                // Change the color of the other elements back to their normal color
                var parent = $(event.target).parent().parent().find('div');
                $(parent).css('background', '#dfdfdf');

                if (this != s.previousTargetFilter) {
                    $(this).css('background', 'darkgrey');
                    s.previousTargetFilter = null;
                }

                // When the user wants to filter data, send an AJAX-request to the API, fetch the data and update the graph accordingly
                $.ajax({
                    url: rootUrl + '/api/v1/fans?filter=' + s.filterTimeBack + '&fan=' + s.filterFanNumber + '&tunnel=' + s.filterTunnel + '&direction=' + s.filterDirection,
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
                            filteredData.push([date, value['power_usage'], parseInt(s.filterFanNumber)]);
                        });

                        FanDropdown.filterGraphOptions(lowest, highest);
                        FanDropdown.filterChangeAveragePowerConsumptionHoursAgo(data);

                        plotTechnicalGraph = $.plot($('#technical-graph'), [{data: filteredData, color: FanVariables.settings.colors[s.filterFanNumber]}], s.filterGraphOptions);
                        plotTechnicalGraph.resize();
                        plotTechnicalGraph.setupGrid();
                        plotTechnicalGraph.draw();

                    },
                    error: function () {
                        alert("Er is een time-out opgetreden!")
                    }

                });
            });
        },

        filterGraphOptions: function (lowest, highest) {
            s.filterGraphOptions = {
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
                    mode: "time",
                    timeformat: "%H:%M",
                    tickSize: [1, "hour"],
                    timezone: "browser"
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

            FanDropdown.filterGraphXAxis();
        },

        filterGraphXAxis : function () {
            switch (s.filterTimeBack) {
                case '6' :
                    s.filterGraphOptions.xaxis.tickSize = [1, 'hour'];
                    break;
                case '12' :
                    s.filterGraphOptions.xaxis.tickSize = [2, 'hour'];
                    break;
                case '1' :
                    s.filterGraphOptions.xaxis.tickSize = [3, 'hour'];
                    break;
                case '2' :
                    s.filterGraphOptions.xaxis.tickSize = [6, 'hour'];
                    break;
            }
        },

        filterChangeAveragePowerConsumptionHoursAgo : function (data) {
            if (s.filterTimeBack == 6 || s.filterTimeBack == 12) {
                $('.fan-power-usage').html(AveragePowerConsumption.calculate(data['fans'], true) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds " + s.filterTimeBack + " uur geleden) </span>");
            } else if (s.filterTimeBack == 1) {
                $('.fan-power-usage').html(AveragePowerConsumption.calculate(data['fans'], true) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds " + s.filterTimeBack + " dag geleden) </span>");
            } else {
                $('.fan-power-usage').html(AveragePowerConsumption.calculate(data['fans'], true) + " Kilowatt <br/> <span style='font-size: 12px'> (sinds " + s.filterTimeBack + " dagen geleden) </span>");
            }
        }
    }

})();