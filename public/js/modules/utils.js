/*
 |--------------------------------------------------------------------------
 | Utils Module
 |--------------------------------------------------------------------------
 |
 | Contains functions that don't really belong to other modules
 | or functions that multiple other modules use.
 |
 */

var Utils = (function () {

    var s;

    return {
        settings: {
            getRootUrl: $('meta[name="base_url"]').attr('content'),
            monthNames: ["Januari", "Februari", "Maart", "April", "Mei", "Juni",
                "Juli", "Augustus", "September", "Oktober", "November", "December"],
            arrayCompare: ['timeOne', 'timeTwo', 'tunnelOne', 'tunnelTwo', 'directionOne', 'directionTwo', 'fanOne', 'fanTwo'],
            arrayFilter: ['fan', 'tunnel', 'direction', 'filternumber', 'filterunit'],
            arrayUpdateMainGraph : ['dateOne', 'dateTwo', 'tunnel', 'direction'],
            dataResult: null,
            done: false,
            currentLowest: 1000,
            currentHighest: 0,
            previousPoint: null
        },

        /**
         * Initializes the necessary elements of the application
         */
        init: function () {
            s = this.settings;
            this.initFancyBox();
            this.initPopovers();
            this.hidePopoversOnOutsideClick();
            this.initDateTimePicker();
            this.loadAjaxGif();

        },

        initFancyBox: function () {
            $(".fancybox").fancybox();

        },
        initPopovers: function () {
            $('[rel="popover"]').popover({
                container: 'body',
                html: true,
                content: function () {
                    var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
                    return clone;
                }
            }).click(function (e) {
                e.preventDefault();
            });
        },
        hidePopoversOnOutsideClick: function () {
            $('body').on('click', function (e) {
                //only buttons
                if ($(e.target).data('toggle') !== 'popover'
                    && $(e.target).parents('.popover.in').length === 0) {
                    $('[data-toggle="popover"]').popover('hide');
                }
            });
        },
        initDateTimePicker: function () {
            $('#datetimepicker1, #datetimepicker2').datetimepicker({
                locale: 'nl',
                format: 'DD/MM/YYYY',
                ignoreReadonly: true
            });
        },
        loadAjaxGif: function () {
            /**
             *  Shows a loading gif when the data is being fetched for filtering of comparison
             */
            $(document).on({
                ajaxStart: function () {
                    $('body').addClass("loading");
                },
                ajaxStop: function () {
                    $('body').removeClass("loading");
                }
            });
        },

        /**
         * Returns the base URL defined in the header file
         */
        getRootUrl: function () {
            return rootUrl = $('meta[name="base_url"]').attr('content');
        },

        /**
         * Calculates the average power consumption for the dropdown and the comparison
         */
        calculateAveragePowerConsumption: function (dataArray, filter) {
            /**
             * Checks if this functions is used for filtering or not
             * Calculates and returns the average number
             *
             * @param dataArray : array
             * @param filter : boolean
             * @returns float with two decimals
             */

            var averagePowerUsage = 0;
            var i = 0;

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
        },

        /**
         * Get the Dutch name of the month according to the given number of the month
         * @param monthNumber
         * @returns Dutch name of the month
         */
        getMonthNames: function (monthNumber) {
            return this.settings.monthNames[monthNumber];
        },

        /**
         * Calculates the lowest value of a serie of numbers and saves it into a local variable
         * @param number
         */
        calculateLowest: function (number) {
            if (number < Utils.settings.currentLowest)
                Utils.settings.currentLowest = number;
        },

        /**
         * Calculates the highest value of a serie of numbers and saves it into a local variable
         * @param number
         */
        calculateHighest: function (number) {
            if (number > Utils.settings.currentHighest)
                Utils.settings.currentHighest = number
        },

        /**
         * Returns the highest value calculated by the 'calculateHighest' function
         * @returns number
         */
        getHighest: function () {
            return Utils.settings.currentHighest
        },

        /**
         * Returns the lowest value calculated by the 'calculateLowest' function
         * @returns number
         */
        getLowest: function () {
            return Utils.settings.currentLowest
        },

        /**
         * Resets the highest and lowest local variables
         */
        resetHighestandLowest: function () {
            Utils.settings.currentHighest = 0;
            Utils.settings.currentLowest = 1000;
        },

        /**
         * Configures the tooltip for the graph
         */
        configureTooltip: function (scope) {
            /**
             * Sets up and configure the tooltip
             * Shows it on hover, removes it on release
             */

            toolTip = this;
            s = this.settings;

            $(scope).bind("plothover", function (event, pos, item) {
                if (item) {
                    if (s.previousPoint != item.datapoint) {
                        s.previousPoint = item.datapoint;
                        $('#tooltip').remove();
                        var time = new Date(item.datapoint[0]);

                        Utils.createToolTip(
                            item.pageX,
                            item.pageY,
                            item.datapoint[1].toFixed(2) +
                            ' Kilowatt ' + '<br/>' +
                            time.getDate() + ' ' +
                            Utils.getMonthNames([time.getMonth()]) + ' ' +
                            time.getFullYear() + ' ' +
                            '(' + (time.getHours() < 10 ? '0' : '') +
                            time.getHours() + ':' +
                            (time.getMinutes() < 10 ? '0' : '') +
                            time.getMinutes() + ')');
                    }
                } else {
                    $('#tooltip').remove();
                    s.previousPoint = null;
                }
            });
        },

        /**
         * Creates the tooltip for the graph
         * @param x: x-coordinate
         * @param y: y-coordinate
         * @param contents: content in the tooltip
         */
        createToolTip: function (x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css({
                'font-size': '13px',
                position: 'absolute',
                display: 'none',
                top: y + 5,
                left: x + 5,
                border: '1px solid #fdd',
                padding: '2px',
                'background-color': '#fee',
                opacity: 0.80
            }).appendTo("body").fadeIn(200);
        },

        createAjaxRequest: function () {
            /**
             * Because the arguments are send from another function, the array with data is wrapped in another data
             * so the values in the arguments object must be retrieved via arguments[0][x].
             */

            var option;
            var paramKeys = null;
            var url = Utils.getRootUrl() + '/api/v1/fans?';
            var args = Array.prototype.slice.call(arguments);


            switch (args[0]) {
                case 'compare' :
                    paramKeys = s.arrayCompare;
                    url += 'option=compare';
                    option = 'compare';
                    args.shift();
                    break;
                case 'filter' :
                    paramKeys = s.arrayFilter;
                    url += 'option=filter';
                    option = 'filter';
                    args.shift();
                    break;
                case 'updateMainGraph' :
                    paramKeys = s.arrayUpdateMainGraph;
                    url += 'option=updateMainGraph';
                    option = 'updateMainGraph';
                    args.shift();
                    break;
            }

            for (var key in args) {
                url += '&' + paramKeys[key] + '=' + args[key];
            }

            console.log(url);
            
            $.ajax({
                url: url,
                type: 'get',
                format: 'json'
            }).done(function (response) {
               if (option == 'filter') {
                   Utils.returnFilterData(response);
               } else if (option == 'compare') {
                   Utils.returnCompareData(response);
               } else {
                   Utils.returnUpdateData(response);
               }
            });
        },

        returnCompareData : function (dataResult) {
            FanCompare.retrieveCompareInputDataCallback(dataResult)
        },
        
        returnFilterData : function (dataResult) {
            FanFilter.filterCallback(dataResult);
        },

        returnUpdateData : function (dataResult) {
            GraphOverview.updateCallback(dataResult);

        }
    };

})();
