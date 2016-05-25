/*
 |--------------------------------------------------------------------------
 | Fan Comparison Module
 |--------------------------------------------------------------------------
 |
 | Let the user compare fans with the button on the bottom of the dropdown
 |
 */

var FanCompare = (function () {

    // The settings variable
    var s;

    return {
        // The settings of the chosen fans
        settings: {
            firstTime: null,
            secondTime: null,
            tunnelOne: null,
            tunnelTwo: null,
            directionOne: null,
            directionTwo: null,
            fanOne: null,
            fanTwo: null
        },

        init: function () {
            s = this.settings;

            this.getCompareInput();
        },


        getCompareInput: function () {
            /**
             * Fills the compare screen with data
             */

            // If the user submits the compared fans..
            $('#compare-chosen-button').on('click', function () {

                var inputFanOne = $('#fan-to-compare-one').val();
                var inputFanTwo = $('#fan-to-compare-two').val();
                var inputDateTimePickerOne = $('#datetimepicker1').find('input').val();
                var inputDateTimePickerTwo = $('#datetimepicker2').find('input').val();

                // Check if the user entered all information before continuing.
                if (inputDateTimePickerOne == '' || inputDateTimePickerTwo == '') {
                    $('.warning-placeholder').html(FanCompare.createWarningMessage(' Je moet een datum kiezen om de ventilatoren te vergelijken!')).show();
                    return false;
                } else if (FanCompare.checkCalendarDate()) {
                    FanCompare.checkCalendarDate();
                    return false;
                } else {
                    $('.warning-placeholder').hide();
                }

                // If all the information is legit, continue to get the variables.
                var fanOneOptionGroup = $('#fan-to-compare-one :selected').parent().attr('label').replace(/ /g, '');
                var fanTwoOptionGroup = $('#fan-to-compare-two :selected').parent().attr('label').replace(/ /g, '');

                FanCompare.retrieveCompareInputData(inputDateTimePickerOne, inputDateTimePickerTwo, fanOneOptionGroup.split('-')[0], fanTwoOptionGroup.split('-')[0], fanOneOptionGroup.split('-')[1], fanTwoOptionGroup.split('-')[1], inputFanOne.slice(-1), inputFanTwo.slice(-1));

                // Enter the names of the chosen fans into the table headers.
                $('#chosen-fan-one').html(inputFanOne + '<span class="compare-fan-one-colour"></span>');
                $('#chosen-fan-two').html(inputFanTwo + '<span class="compare-fan-two-colour"></span>');
            });
        },


        retrieveCompareInputData: function () {
            /**
             * Makes an AJAX-call to retrieve the input from the database
             */

            //Fill the settings object with the corresponding data
            var i = 0;
            for (var key in this.settings) {
                this.settings[key] = arguments[i];
                i++;
            }

            $.ajax({
                url: Utils.rootUrl() + '/api/v1/fans?compare=1' +
                '&firstTime=' + s.firstTime +
                '&secondTime=' + s.secondTime +
                '&tunnelOne=' + s.tunnelOne +
                '&tunnelTwo=' + s.tunnelTwo +
                '&directionOne=' + s.directionOne +
                '&directionTwo=' + s.directionTwo +
                '&fanOne=' + s.fanOne +
                '&fanTwo=' + s.fanTwo,
                type: 'get',
                format: 'json',
                async: true,
                success: function (data) {

                    FanCompare.retrieveCompareInputDataCallback(data, s.firstTime, s.secondTime);
                }
            });
        },

        retrieveCompareInputDataCallback: function (data, firstTime, secondTime) {
            /**
             * Handles the text in the table after the call to the database has been made
             */

            var fanOneData = data['fanOne'];
            var fanTwoData = data['fanTwo'];

            this.calculateTotalFanTime(firstTime, secondTime);

            this.calculateAveragePowerDifferencesTotal(fanOneData, fanTwoData);

            this.calculateTechnicalLifeExpectancy();

            this.plotCompareGraph(fanOneData, fanTwoData);
        },

        calculateAveragePowerDifferencesTotal: function (fanOneData, fanTwoData) {
            /**
             * Calculates the average power consumption differences for the table
             */

            var fanOneAveragePowerConsumption = AveragePowerConsumption.calculate(fanOneData, true);
            var fanTwoAveragePowerConsumption = AveragePowerConsumption.calculate(fanTwoData, true);
            var fanPowerDifference = Math.abs(Math.round((fanOneAveragePowerConsumption - fanTwoAveragePowerConsumption) * 100) / 100);

            $('#fan-one-power-total').html(Math.round(fanOneAveragePowerConsumption * 100) / 100 + ' Kilowatt');
            $('#fan-two-power-total').html(Math.round(fanTwoAveragePowerConsumption * 100) / 100 + ' Kilowatt');
            $('#fan-power-difference-total').html(fanPowerDifference + ' Kilowatt');


            this.calculateAveragePowerDifferenceHour(fanOneAveragePowerConsumption, fanTwoAveragePowerConsumption);
        },

        calculateAveragePowerDifferenceHour : function (fanOne, fanTwo) {
            var fanOneTimeOn = ($('#fan-one-time-on').html()).substring(0,2);
            var fanTwoTimeOn = ($('#fan-two-time-on').html()).substring(0,2);

            var fanOneHourlyPower = Math.round(fanOne / fanOneTimeOn) * 100 / 100;
            var fanTwoHourlyPower = Math.round(fanTwo / fanTwoTimeOn) * 100 / 100;
            var fanDifferenceHourlyPower = Math.abs(Math.round((fanOneHourlyPower - fanTwoHourlyPower) * 100) / 100);

            $('#fan-one-power-hour').html(fanOneHourlyPower + ' Kilowatt');
            $('#fan-two-power-hour').html(fanTwoHourlyPower + ' Kilowatt');
            $('#fan-power-difference-hour').html(fanDifferenceHourlyPower + ' Kilowatt');

        },

        calculateTotalFanTime: function (firstTime, secondTime) {
            /**
             * Calculates the total fantime differences for the table
             */

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
                $('#fan-time-on-difference').html(randomTimeFanOne - randomTimeFanTwo + dayOrDays)
            } else {
                $('#fan-time-on-difference').html(randomTimeFanTwo - randomTimeFanOne + dayOrDays);
            }
        },

        calculateTechnicalLifeExpectancy: function () {
            /**
             * Calculates the technical life expectancy for the tables
             */

            var fanOneTheoretical = $('#fan-one-theoretical-life-expectancy').text().charAt(0);
            var fanTwoTheoretical = $('#fan-two-theoretical-life-expectancy').text().charAt(0);

            var fanOneTechnical = Math.floor((Math.random() * fanOneTheoretical) + 1);
            var fanTwoTechnical = Math.floor((Math.random() * fanTwoTheoretical) + 1);

            $('#fan-one-technical-life-expectancy').html('Nog ' + fanOneTechnical + ' jaar');
            $('#fan-two-technical-life-expectancy').html('Nog ' + fanTwoTechnical + ' jaar');

            if (fanOneTechnical > fanTwoTechnical) {
                $("#fan-technical-life-expectancy-difference").html(fanOneTechnical - fanTwoTechnical + ' jaar');
            } else {
                $("#fan-technical-life-expectancy-difference").html(fanTwoTechnical - fanOneTechnical + ' jaar');
            }
        },

        plotCompareGraph: function (fanOneData, fanTwoData) {
            /**
             * Plots the graph next to the table
             */

            var fanOnePowerUsage = [];
            var fanTwoPowerUsage = [];
            var tickSize = [];

            $.each(fanOneData, function (key, value) {
                var date = new Date(value['created_at'].replace(/-/g, "/"));
                fanOnePowerUsage.push([date.getTime(), value['power_usage']]);
            });

            $.each(fanTwoData, function (key, value) {
                var date = new Date(value['created_at'].replace(/-/g, "/"));
                fanTwoPowerUsage.push([date.getTime(), value['power_usage']]);
            });

            //Calculate difference between times for the x-axis ticksize
            var timeDiff = Math.abs(this.checkCalendarDate(true)[1].getTime() - this.checkCalendarDate(true)[0].getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (diffDays >= 30) {
                tickSize = [30, 'day']
            } else if (diffDays >= 14) {
                tickSize = [7, 'day'];
            } else {
                tickSize = [1, 'day'];
            }

            var data = [{data: fanOnePowerUsage, color: '#83be3e'}, {data: fanTwoPowerUsage, color: '#c4e0a3'}];

            $("#graph-comparison").show();
            $('.table-compare').show();
            $('.fancybox-inner').css('height', 'auto');

            var compareGraph = $.plot($("#graph-comparison"), data, this.compareGraphOptions(tickSize));
            compareGraph.resize();
            compareGraph.setupGrid();
            compareGraph.draw();
        },


        compareGraphOptions: function (tickSize) {
            /**
             * Contains the options for the graph next to the table
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
                    mode: "time",
                    min: this.checkCalendarDate(true)[0],
                    max: this.checkCalendarDate(true)[1],
                    tickSize: tickSize,
                    timezone: "browser"
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
        },

        createWarningMessage: function (text) {
            /**
             * Creates a warning message when the input for the comparison is incorrect
             */

            return '<div class="alert alert-danger empty-input" role="alert">' +
                '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span>' +
                '<span class="sr-only">Error:</span>' + text +
                '</div>'; 
        },

        checkCalendarDate: function (xaxis) {
            /**
             * Checks if the inputted calendar dates are valid
             */

            var dateOne = $('#datetimepicker1 input').val().split("/");
            var dateTwo = $('#datetimepicker2 input').val().split("/");

            var convertedDateOne = new Date(dateOne[2], dateOne[1] - 1, dateOne[0]);
            var convertedDateTwo = new Date(dateTwo[2], dateTwo[1] - 1, dateTwo[0]);

            if (xaxis) {
                return [convertedDateOne, convertedDateTwo];
            } else {
                if (convertedDateOne > convertedDateTwo) {
                    return $('.warning-placeholder').html(this.createWarningMessage(' De eerste datum moet eerder zijn dan de tweede datum!')).show();
                } else if (convertedDateOne.getTime() == convertedDateTwo.getTime()) {
                    return $('.warning-placeholder').html(this.createWarningMessage(' De twee datums moeten wel van dag verschillen!')).show();
                } else if ( convertedDateTwo.getTime() > new Date()) {
                    return $('.warning-placeholder').html(this.createWarningMessage(' Je kan niet in de toekomst zoeken!')).show();
                }
            }
        }
    }

})();