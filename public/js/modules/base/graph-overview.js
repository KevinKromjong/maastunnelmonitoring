/*
 |--------------------------------------------------------------------------
 | Graph Overview Module
 |--------------------------------------------------------------------------
 |
 | Plots the overview graph at the bottom of the fanpage
 |
 */

var GraphOverview = (function () {

    var s;

    return {
        settings: {
            epochT: (new Date).getTime(),       // The current time
            graph: $('#fan-graph'),             // The container of the graph
            mainGraph: null,                    // The variable that will hold the graph
            dataset: [],                        // The dataset for the data that will display in the graph
            i: 1,                               // The incrementer for adding data to the dataset array
            lowest: 1000,                       // Placeholder for the lowest value for determing the length of the y-axis
            highest: 0,                         // Placeholder for the lowest value for determing the length of the y-axis
            minimalCriticalValue: 260,          // The value of the lowest critical line
            maximalCriticalValue: 280           // The value of the highest critical line
        },

        init: function () {
            // Make a shortcut for the settings variable
            s = this.settings;

            ConfigureTooltip.configure();

            this.addFans();
            this.plot();

            this.onWindowResize(s.mainGraph);
        },

        addFans: function () {
            // For each fan..
            $.each(FanVariables.returnFanVariables(), function (index, value) {
                var label;

                // If the fan has more than one entry (= if the fan is on)
                if (!0 < value.length) {

                    // Check the direction of the fan and set the name accordingly
                    if (fanDirection == 'noordzijde') {
                        label = 'Ventilator N-0' + parseInt(index + 1);
                    } else {
                        label = 'Ventilator Z-0' + parseInt(index + 1);
                    }

                    // Save the highest and lowest value for the y-axis
                    $.each(value, function (index2, value2) {
                        if (value2[1] < s.lowest)
                            s.lowest = value2[1];

                        if (value2[1] > s.highest)
                            s.highest = value2[1];
                    });

                    // Pushes the data from the fan to the dataset variable
                    // This variable holds all the data from all the fans
                    GraphOverview.settings.dataset.push({
                        data: value,
                        label: label,
                        idx: s.i,
                        color: FanVariables.settings.colors[index + 1]
                    });

                    s.i++
                }
            });

            // Add the minimal and maximal lines to the array with data
            this.settings.dataset.unshift(this.configureMaximalCriticalLine());
            this.settings.dataset.push(this.configureMinimalCriticalLine());
        },

        configureMinimalCriticalLine: function () {
            return minimalCriticalLine = {
                idx: 0,
                color: FanVariables.settings.colors[0],
                label: '<span style="text-decoration: underline">Minimale grenswaarde</span> <br/>' + s.minimalCriticalValue + ' Kilowatt',
                data: [
                    [0, s.minimalCriticalValue],
                    [9999999999999, s.minimalCriticalValue]
                ]
            };
        },

        configureMaximalCriticalLine: function () {
            return maximalCriticalLine = {
                idx: 0,
                color: FanVariables.settings.colors[6],
                label: '<span style="text-decoration: underline">Maximale grenswaarde</span> <br/>' + s.maximalCriticalValue + ' Kilowatt',
                data: [
                    [0, s.maximalCriticalValue],
                    [9999999999999, s.maximalCriticalValue]
                ]
            };
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
                legend: {
                    container: $('#fan-graph-legend'), noColumns: 1, labelFormatter: function (label, series) {
                        return '<a id="toggle-legend" href="#" onClick="TogglePlot.toggle(' + series.idx + '); return false;">' + label + '</a>';
                    }
                },
                xaxis: {
                    mode: "time", timeformat: "%H:%M", tickSize: [1, "hour"], timezone: "browser",
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
                }],
                yaxis: {
                    min: s.lowest - 10,
                    max: s.highest + 10
                }
            }
        },

        plot: function () {
            if (window.matchMedia('(max-width: 640px)').matches) {
                this.graphOptions().xaxis.tickSize = [2, 'hour'];
            }

            s.mainGraph = $.plot(s.graph, s.dataset, this.graphOptions());
        },

        onWindowResize: function (mainGraph) {
            window.onresize = function () {
                mainGraph.resize();
                mainGraph.setupGrid();
                mainGraph.draw();
            };
        },

        returnGraph : function () {
            return this.settings.mainGraph
        }
    }
})();