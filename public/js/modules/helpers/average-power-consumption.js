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
        calculate: function (dataArray, filter) {
            /**
             * Checks if this functions is used for filtering or not
             * Calculates and returns the average number
             */

            var averagePowerUsage = 0;
            var i = 0;

            s = this.settings;

            if (!filter) {
                $.each(dataArray, function (index, value) {
                    averagePowerUsage += value[1];
                    i++;
                });
            } else {
                $.each(dataArray, function (index, value) {
                    averagePowerUsage += value['power_usage'];
                    i++;
                });
            }


            if (isNaN(averagePowerUsage / i)) {
                return 0;
            } else {
                return Math.round((averagePowerUsage / i) * 100) / 100;
            }
        }
    }
})();