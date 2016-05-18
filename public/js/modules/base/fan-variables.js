/*
 |--------------------------------------------------------------------------
 | Fan Variables Module
 |--------------------------------------------------------------------------
 |
 | Fills fanOne through fanFive with the data from the database
 | The fanGraph variable contains the database data
 |
 */


var FanVariables = (function() {

    var s;

    return {

        settings: {
            fanOne: [],             // The array for the first fan
            fanTwo: [],             // The data for the second fan
            fanThree: [],           // The data for the third fan
            fanFour: [],            // The data for the fourth fan
            fanFive: [],            // The data for the fifth fan
            fansToCheck: [],        // The data containing fans one to five from above
            date: new Date(),       // The current data
            colors: [],             // The array with the colours of the lines
            fansGraph: null         // The data which will fill the fan variables

        },

        init: function (fansGraph) {
            // Make a shortcut for the settings variable
            s = this.settings;
            s.fansGraph = fansGraph;
            s.colors = ['#EE2F00', '#699633', '#83be3e', '#a3cf70', '#c4e0a3', '#e5f1d6', '#BB2500'];


            this.fillFanVariables();
        },

        fillFanVariables: function () {
            $.each(s.fansGraph, function (key, value) {

                // Format the display so the graph can display the data correctly
                // If the fan is on, fill the fan variable according to the number of the fan
                var date = new Date(value['created_at'].replace(/-/g, "/"));

                if (value['is_on'] === true) {
                    switch (value['fan_number']) {
                        case 1 :
                            s.fanOne.push([date.getTime(), value['power_usage']]);
                            break;
                        case 2 :
                            s.fanTwo.push([date.getTime(), value['power_usage']]);
                            break;
                        case 3 :
                            s.fanThree.push([date.getTime(), value['power_usage']]);
                            break;
                        case 4 :
                            s.fanFour.push([date.getTime(), value['power_usage']]);
                            break;
                        case 5 :
                            s.fanFive.push([date.getTime(), value['power_usage']]);
                            break;
                    }
                }
            });

            s.fansToCheck = [s.fanOne, s.fanTwo, s.fanThree, s.fanFour, s.fanFive];
        },

        returnFanVariables: function () {
            return s.fansToCheck;
        }

    }

})();