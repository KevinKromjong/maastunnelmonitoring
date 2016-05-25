/*
 |--------------------------------------------------------------------------
 | Fan Filter Module
 |--------------------------------------------------------------------------
 |
 | Filters the graph in the dropdown
 |
 */

var FanFilter = (function () {

    var s;

    return {

        settings: {
            fanNumber: 0,
            tunnel: '',
            direction: '',
            filterNumber: 0,
            filterUnit: '',
            lowest : 0,
            highest : 0

        },

        init: function () {
            s = this.settings;

            this.showFilterScreen();
        },

        showFilterScreen: function () {
            $('.btn-filter-screen').on('click', function () {
                $('.filter-screen').slideToggle('slow');

                FanFilter.filter();
            });
        },

        filter: function () {
            /**
             * Retrieves the data when the user filters the data using the buttons beneath the graph
             */

            $('.btn-filter').on('click', function (event) {

                event.preventDefault();

                s.tunnel = $(this).attr('data-tunnel');
                s.direction = $(this).attr('data-direction');
                s.fanNumber = $(this).attr('data-fan-number');
                s.filterNumber = $('.filter-number').val();
                s.filterUnit = $('.filter-unit').find(':selected').val();

                // When the user wants to filter data, send an AJAX-request to the API, fetch the data and update the graph accordingly
                console.log(Utils.rootUrl() + '/api/v1/fans?option=filter' + '&fan=' + s.fanNumber + '&tunnel=' + s.tunnel + '&direction=' + s.direction + '&filternumber=' + s.filterNumber + '&filterunit=' + s.filterUnit);

                $.ajax({
                    url: Utils.rootUrl() + '/api/v1/fans?option=filter' + '&fan=' + s.fanNumber + '&tunnel=' + s.tunnel + '&direction=' + s.direction + '&filternumber=' + s.filterNumber + '&filterunit=' + s.filterUnit,
                    format: 'json',
                    async: true,
                    success: function (data) {

                        var filteredData = [];

                        $.each(data['fans'], function (index, value) {

                            console.log(Utils.settings.currentHighest);

                            Utils.calculateHighest(value['power_usage']);
                            Utils.calculateLowest(value['power_usage']);

                            var date = new Date(value['created_at'].replace(/-/g, "/"));
                            filteredData.push([date, value['power_usage'], parseInt(s.fanNumber)]);
                        });

                        s.lowest = Utils.getLowest();
                        s.highest = Utils.getHighest();


                        FanFilter.filterGraphOptions();
                        FanFilter.filterChangeAveragePowerConsumptionHoursAgo(data);

                        plotTechnicalGraph = $.plot($('#technical-graph'), [{
                            data: filteredData,
                            color: FanVariables.settings.colors[s.fanNumber]
                        }], s.filterGraphOptions);
                        plotTechnicalGraph.resize();
                        plotTechnicalGraph.setupGrid();
                        plotTechnicalGraph.draw();

                        $('.filter-screen').slideUp('slow');

                    },
                    error: function () {
                        alert("Er is een time-out opgetreden!")
                    }

                });
            });
        },

        filterGraphOptions: function () {
            /**
             * Contains the options for the graph in the dropdown
             */

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
                    timeformat: "%d %b",
                    tickSize: [1, "hour"],
                    timezone: "browser"
                },
                xaxes: [{
                    axisLabel: 'Tijd in hele uren'
                }],
                yaxis: {
                    min: s.lowest - 10,
                    max: s.highest + 10
                },
                yaxes: [{
                    position: 'left',
                    axisLabel: 'Stroomverbruik in Kilowatt'
                }],
                axisLabels: {
                    show: true
                }
            };

            FanFilter.filterGraphXAxis();
        }
        ,

        filterGraphXAxis: function () {
            /**
             * Checks whether the x-axis becomes too flooded with numbers and changes the values accordingly
             */

            switch (s.filterUnit) {
                case 'days' :
                    if (s.filterNumber > 10) {
                        s.filterGraphOptions.xaxis.tickSize = [7, 'day'];
                    } else if (s.filterNumber > 20) {
                        s.filterGraphOptions.xaxis.tickSize = [14, 'day'];
                    } else if (s.filterNumber > 30) {
                        s.filterGraphOptions.xaxis.tickSize = [30, 'day'];
                    } else {
                        s.filterGraphOptions.xaxis.tickSize = [1, 'day'];
                    }
                    break;
                case 'weeks' :
                    if (s.filterNumber > 1) {
                        s.filterGraphOptions.xaxis.tickSize = [7, 'day'];
                    } else if (s.filterNumber > 2) {
                        s.filterGraphOptions.xaxis.tickSize = [14, 'day'];
                    } else if (s.filterNumber > 3) {
                        s.filterGraphOptions.xaxis.tickSize = [30, 'day'];
                    } else {
                        s.filterGraphOptions.xaxis.tickSize = [2, 'day'];
                    }
                    break;
                case 'months' :
                    if (s.filterNumber > 1) {
                        s.filterGraphOptions.xaxis.tickSize = [30, 'day'];
                    } else if (s.filterNumber > 3) {
                        s.filterGraphOptions.xaxis.tickSize = [60, 'day'];
                    } else if (s.filterNumber > 6) {
                        s.filterGraphOptions.xaxis.tickSize = [180, 'day'];
                    } else {
                        s.filterGraphOptions.xaxis.tickSize = [15, 'day'];
                    }
                    break;
                case 'years' :
                    if (s.filterNumber > 1) {
                        s.filterGraphOptions.xaxis.tickSize = [180, 'day'];
                    } else if (s.filterNumber > 5) {
                        s.filterGraphOptions.xaxis.tickSize = [540, 'day'];
                    } else if (s.filterNumber > 10) {
                        s.filterGraphOptions.xaxis.tickSize = [1080, 'day'];
                    } else {
                        s.filterGraphOptions.xaxis.tickSize = [60, 'day'];
                    }
                    break;
            }
        },

        filterChangeAveragePowerConsumptionHoursAgo: function (data) {
            /**
             * Changes the text beneath the average power usage in the left column according to the chosen filtering option
             */

            var content = '';

            switch (s.filterUnit) {
                case 'days' :
                    content = '<span>' + AveragePowerConsumption.calculate(data['fans'], true) + " Kilowatt</span><br/><span style='font-size: 11px'>vanaf " + s.filterNumber + " dag(en) geleden</span>";
                    break;
                case 'weeks' :
                    content = '<span>' + AveragePowerConsumption.calculate(data['fans'], true) + " Kilowatt</span><br/><span style='font-size: 11px'>vanaf " + s.filterNumber + " week/weken geleden</span>";
                    break;
                case 'months' :
                    content = '<span>' + AveragePowerConsumption.calculate(data['fans'], true) + " Kilowatt</span><br/><span style='font-size: 11px'>vanaf " + s.filterNumber + " maand(en) geleden</span>";
                    break;
                case 'years' :
                    content = '<span>' + AveragePowerConsumption.calculate(data['fans'], true) + " Kilowatt</span><br/><span style='font-size: 11px'>vanaf " + s.filterNumber + " jaar/jaren geleden</span>";
                    break;
            }

            $('.fan-power-usage').html(content);
        }
    }
})();