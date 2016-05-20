/*
 |--------------------------------------------------------------------------
 | Average Power Consumption  Module
 |--------------------------------------------------------------------------
 |
 | Calculates the average power consumption for te information in the dropdown
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
            /**
             * Checks if this functions is used for filtering or not
             * Calculates and returns the average number
             */

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