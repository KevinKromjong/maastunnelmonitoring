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
        },

        init: function () {
            s = this.settings;

            this.onFanClick();

            FanFilter.init();
        },

        graphOptions: function () {
            /**
             * The options for the graph in the dropdown
             */

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
            /**
             * Triggers the changes in the dropdown when clicked on a different or the same fan
             */

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
            /**
             * Triggers the functions that change the text in the dropdown
             */

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
            /**
             * Changes the title of the fan at the top of the dropdown
             */

            if (fansOverview[index]['direction'] == 'north') {
                return $('.fan-information-technical .fan-name').html('ventilator <br/> N-0' + fansOverview[index]['fan_number']).attr('data-fannumber', fansOverview[index]['fan_number'])
            } else {
                return $('.fan-information-technical .fan-name').html('ventilator <br/> Z-0' + fansOverview[index]['fan_number']).attr('data-fannumber', fansOverview[index]['fan_number'])
            }
        },

        changeFanBlowDirection: function (index) {
            /**
             * Changes the text of the blow direction in the left column
             */

            if (fansOverview[index]['blow_direction'] == 'north') {
                $('.fan-information-technical .fan-blowing-direction').html('Noord');
            } else {
                $('.fan-information-technical .fan-blowing-direction').html('Zuid');
            }
        },

        changeFanStatus: function (index) {
            /**
             * Changes the status of the fan in the left column
             */

            if (fansOverview[index]['is_on'] == true) {
                $('.fan-information-technical .fan-status').html('<span style="color:black">' + fansOverview[index]['fan_state'] + ' - </span> AAN').addClass('green').removeClass('blue');
            } else {
                $('.fan-information-technical .fan-status').html('<span style="color:black">' + fansOverview[index]['fan_state'] + ' - </span> UIT').addClass('blue').removeClass('green');
            }
        },

        changeFanAveragePower: function (index) {
            /**
             * Changes the text of the average power consumption in the left column
             */
            if (fansOverview[index]['is_on'] == false) {
                $('.fan-power-usage').html(0 + " Kilowatt <br/> <span style='font-size: 11px'> (fan staat uit) </span>");
            } else if (Utils.calculateAveragePowerConsumption(FanVariables.returnFanVariables()[index]) == 0) {
                $('.fan-power-usage').html(Utils.calculateAveragePowerConsumption(FanVariables.returnFanVariables()[index]) + " Kilowatt <br/> <span style='font-size: 11px'> (sinds 0 uur geleden) </span>");
            } else {
                $('.fan-power-usage').html(Utils.calculateAveragePowerConsumption(FanVariables.returnFanVariables()[index]) + " Kilowatt <br/> <span style='font-size: 11px'> (sinds 6 uur geleden) </span>");
            }
        },

        plotOrMessage: function (index) {
            /**
             * Plot the graph in the right column or shows a message when the fan is off
             */

            // Give the element with the filter class the correct fan-number
            $('.filter').attr('data-fan-number', fansOverview[index]['fan_number']);

            // If the fan is on: plot the data according to the clicked fan
            // If the fan is off: show a message that the fan is off, so there is no data to fetch and display

            if (fansOverview[index]['is_on'] == true) {
                $('#technical-graph').html('').removeClass('fan-off');
                $('.btn-filter-screen').show();

                plotTechnicalGraph = $.plot($('#technical-graph'), [{
                    data: FanVariables.returnFanVariables()[index], color: FanVariables.settings.colors[index + 1]
                }], this.graphOptions());

                plotTechnicalGraph.resize();
                plotTechnicalGraph.setupGrid();
                plotTechnicalGraph.draw();

            } else {
                $('#technical-graph').html('<p class="fan-off">Deze ventilator staat uit en kan dus geen data weergeven</p>');
                $('.btn-filter-screen').hide();
            }
        }
    }

})();