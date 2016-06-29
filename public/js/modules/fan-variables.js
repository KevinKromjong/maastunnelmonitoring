/*
 |--------------------------------------------------------------------------
 | Fan Variables Module
 |--------------------------------------------------------------------------
 |
 | Fills fanOne through fanFive with the data from the database
 | The fanGraph variable contains the database data
 |
 */

var FanVariables = (function () {

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
            colors: []              // The array with the colours of the lines

        },

        init: function (fansGraph) {
            // Make a shortcut for the settings variable
            s = this.settings;
            s.colors = ['#E74C3C', '#00441b', '#238b45', '#66c2a4', '#ccece6', '#e5f5f9', '#C0392B'];

            this.fillFanVariables(fansGraph);
        },

        fillFanVariables: function (fanData) {
            /**
             * Gets the data from the database and fills the fan variables
             * so that the fanblocks and the graphs can use it to display the fans
             */

            this.resetVariables();

            $.each(fanData, function (key, value) {

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

        resetVariables: function () {
            s.fanOne = [];
            s.fanTwo = [];
            s.fanThree = [];
            s.fanFour = [];
            s.fanFive = [];
            s.fansToCheck = [];
        },

        returnFanVariables: function () {
            /**
             * Returns the array with all the fandata
             */
            return s.fansToCheck;
        }

    }

})();