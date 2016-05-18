/*
 |--------------------------------------------------------------------------
 | Average Power Consumption  Module
 |--------------------------------------------------------------------------
 |
 | Calculates the average power consumption for te information in the dropdown
 |
 | @param dataArray: the array with all the data (not just the power consumption)
 | @param filter: true if the calculation applies to the filtering of data, false if the calculation applies to the dropdown data
 | @returns {number}: returns 0 if there occurs an error, returns the average power consumption if it calculates succesfully.
 |
 */

var AveragePowerConsumption = (function() {

    var s;

    return {
        settings: {
            averagePowerUsage: 0,
            i: 0
        },

        calculate: function (dataArray, filter) {
            s = this.settings;

            if (!filter) {
                $.each(dataArray, function (index, value) {
                    s.averagePowerUsage += value[1];
                    s.i++;
                });
            } else {
                $.each(dataArray, function (index, value) {
                    s.averagePowerUsage += value['power_usage'];
                    s.i++;
                });
            }

            if (isNaN(s.averagePowerUsage / s.i)) {
                return 0;
            } else {
                return Math.round((s.averagePowerUsage / s.i) * 100) / 100
            }
        }
    }
})();