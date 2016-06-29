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
            datasetFanValues: [],               // The datasetFanValues for the data that will display in the graph
            datasetTotal: [],                  // The dataset variable that will hold the datasetFanValues and the minimum and maximum lines
            i: 1,                               // The incrementer for adding data to the datasetFanValues array
            lowest: 1000,                       // Placeholder for the lowest value for determing the length of the y-axis
            highest: 0,                         // Placeholder for the lowest value for determing the length of the y-axis
            minimalCriticalValue: 0,            // The value of the lowest critical line
            maximalCriticalValue: 0,            // The value of the highest critical line

            newAxisValues : [],
        },

        init: function () {
            // Make a shortcut for the settings variable
            s = this.settings;

            Utils.configureTooltip('#fan-graph');

            this.addFans(FanVariables.returnFanVariables());
            this.plot();

            this.onWindowResize(s.mainGraph);

            GraphLimits.init();
            FanCompare.init();
        },

        addFans: function (fans) {
            /**
             * Formats and add the data from the fans to a datasetFanValues
             * so that the fans can be displayed in the main graph at the bottom of the fanpage
             */

            s.datasetFanValues = [];
            s.i = 1;

            // For each fan..
            $.each(fans, function (index, value) {
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
                        Utils.calculateHighest(value2[1]);
                        Utils.calculateLowest(value2[1]);

                        s.lowest = Utils.getLowest();
                        s.highest = Utils.getHighest();
                    });

                    // Pushes the data from the fan to the datasetFanValues variable
                    // This variable holds all the data from all the fans
                    s.datasetFanValues.push({
                        data: value,
                        label: label,
                        idx: s.i,
                        color: FanVariables.settings.colors[index + 1]
                    });

                    s.i++
                }
            });

            Utils.resetHighestandLowest();


            // GraphOverview.settings.datasetFanValues.push(
            //     {
            //         color: FanVariables.settings.colors[1],
            //         data: [
            //             [0, 20],
            //             [9999999999999, 20]
            //         ],
            //     },
            //     {
            //         color: FanVariables.settings.colors[2],
            //         data: [
            //             [0, 40],
            //             [9999999999999, 40]
            //         ],
            //     },
            //     {
            //         color: FanVariables.settings.colors[3],
            //         data: [
            //             [0, 60],
            //             [9999999999999, 60]
            //         ],
            //     },
            //     {
            //         color: FanVariables.settings.colors[4],
            //         data: [
            //             [0, 80],
            //             [9999999999999, 80]
            //         ],
            //     },
            //     {
            //         color: FanVariables.settings.colors[5],
            //         data: [
            //             [0, 100],
            //             [9999999999999, 100]
            //         ],
            //     }
            // )
            s.minimalCriticalValue = (Math.round(s.lowest / 10) * 10) - 15;
            s.maximalCriticalValue = (Math.round(s.highest / 10) * 10) + 15;
        },

        configureMinimalCriticalLine: function () {
            /**
             * Configures the line of the minimum value in the graph
             */

            return {
                idx: 0,
                color: FanVariables.settings.colors[0],
                label: '<span style="text-decoration: underline">Minimale grenswaarde</span> <br/>' + s.minimalCriticalValue + ' Kilowatt',
                data: [
                    [0, s.minimalCriticalValue],
                    [9999999999999, s.minimalCriticalValue]
                ],
                dashes: {show: true}
            };
        },

        configureMaximalCriticalLine: function () {
            /**
             * Configures the line of the maximum value in the graph
             **/

            return {
                idx: 0,
                color: FanVariables.settings.colors[6],
                label: '<span style="text-decoration: underline">Maximale grenswaarde</span> <br/>' + s.maximalCriticalValue + ' Kilowatt',
                data: [
                    [0, s.maximalCriticalValue],
                    [9999999999999, s.maximalCriticalValue]
                ],
                dashes: {show: true}
            };
        },

        graphOptions: function () {
            /**
             * Contains the options for the graph at the bottom of the fanpage
             */

            return {
                grid: {
                    hoverable: true,
                    tooltip: true,
                    clickable: true
                },
                legend: {
                    container: $('#fan-graph-legend'), labelFormatter: function (label, series) {
                        return '<a id="toggle-legend" href="#" onClick="GraphOverview.toggleGraphLegend(' + series.idx + '); return false; ">' + label + '</a>';
                    }
                },
                xaxis: {
                    mode: "time", timeformat: "%H:%M", tickSize: [3, "hour"], timezone: "browser",
                    min: s.epochT - 86400000, //3 uur
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
                    min: s.minimalCriticalValue - 5,
                    max: s.maximalCriticalValue + 5
                },
                pan: {
                    interactive: true
                }
            }
        },

        resetValues : function () {
            s.datasetTotal = [];

        },

        addFanData : function () {
            s.datasetTotal = [];

            // Add each line of the fan blocks to the datasetTotal array
            $.each(s.datasetFanValues, function (index, value) {
                s.datasetTotal.push(value);
            });

            // Add the minimal and maximal lines to the array with data
            s.datasetTotal.unshift(this.configureMaximalCriticalLine());
            s.datasetTotal.push(this.configureMinimalCriticalLine());
        },

        plot: function () {
            /**
             * Checks if the application is viewed on a mobile screen
             * and plots the graph at the bottom of the fanpage accordingly
             */

            if (window.matchMedia('(max-width: 640px)').matches) {
                this.graphOptions().xaxis.tickSize = [2, 'hour'];
            }

            GraphOverview.addFanData();

            // Plot the graph
            s.mainGraph = $.plot(s.graph, s.datasetTotal, this.graphOptions());

            this.dragPlot();
        },

        dragPlot : function () {
            s.graph.bind("plotpan", function (event, plot) {
                s.newAxisValues = [
                    Math.round(plot.getAxes().xaxis.min),
                    Math.round(plot.getAxes().xaxis.max)
                ];
            });

            // $(s.graph).dblclick(function () {
            //     FanVariables.fillFanVariables(fansGraph);
            //     GraphOverview.addFans(FanVariables.returnFanVariables());
            //     GraphOverview.addFanData();
            //     s.mainGraph = $.plot(s.graph, s.datasetTotal, GraphOverview.graphOptions());
            // });

            $(s.graph).mouseup(function () {
                Utils.createAjaxRequest('updateMainGraph', s.newAxisValues[0], s.newAxisValues[1], fanTunnel, fanDirection);
            })

        },

        onWindowResize: function (mainGraph) {
            /**
             * When the orientation of the tablet or phone is turned, change the widths and axis of the graph at the bottom accordingly
             */
            window.onresize = function () {
                mainGraph.resize();
                mainGraph.setupGrid();
                mainGraph.draw();
            };
        },

        returnGraph: function () {
            /**
             * Returns the graph object at the bottom of the fanpage
             */

            return s.mainGraph
        },

        toggleGraphLegend: function (seriesIdx) {
            if (seriesIdx != 0) {
                GraphOverview.returnGraph().getData()[seriesIdx].lines.show = !GraphOverview.returnGraph().getData()[seriesIdx].lines.show;
                GraphOverview.returnGraph().setData(GraphOverview.returnGraph().getData());
                GraphOverview.returnGraph().draw();
            }
        },

        updateCallback : function (data) {

            var oldGraphOptions = GraphOverview.graphOptions();

            FanVariables.fillFanVariables(data);

            GraphOverview.addFans(FanVariables.returnFanVariables());
            GraphOverview.addFanData();

            oldGraphOptions.xaxis.min = s.newAxisValues[0];
            oldGraphOptions.xaxis.max = s.newAxisValues[1];

            s.mainGraph = $.plot(s.graph, s.datasetTotal, oldGraphOptions);
        }
    }
})();