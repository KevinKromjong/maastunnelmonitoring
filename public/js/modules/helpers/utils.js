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
    
    return {
        settings: {
            rootUrl: $('meta[name="base_url"]').attr('content'),
            monthNames : ["Januari", "Februari", "Maart", "April", "Mei", "Juni",
                "Juli", "Augustus", "September", "Oktober", "November", "December"
            ],
            currentLowest : 1000,
            currentHighest : 0
        },

        init : function () {
            this.initFancyBox();
            this.initPopovers();
            this.hidePopoversOnOutsideClick();
            this.initDateTimePicker();
            this.loadAjaxGif();
        },

        initFancyBox: function () {
            $(".fancybox").fancybox();

        },

        initDateTimePicker : function () {
            $('#datetimepicker1, #datetimepicker2').datetimepicker({
                locale: 'nl',
                format: 'DD/MM/YYYY',
                ignoreReadonly: true
            });
        },

        initPopovers : function () {
            $('[rel="popover"]').popover({
                container: 'body',
                html: true,
                content: function () {
                    var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
                    return clone;
                }
            }).click(function(e) {
                e.preventDefault();
            });
        },

        rootUrl: function () {
            return rootUrl = $('meta[name="base_url"]').attr('content');
        },


        loadAjaxGif: function () {
            $(document).on({
                ajaxStart: function () {
                    $('body').addClass("loading");
                },
                ajaxStop: function () {
                    $('body').removeClass("loading");
                }
            });
        },

        toggleGraphLegend: function (seriesIdx) {
            if (seriesIdx != 0) {
                GraphOverview.returnGraph().getData()[seriesIdx].lines.show = !GraphOverview.returnGraph().getData()[seriesIdx].lines.show;
                GraphOverview.returnGraph().setData(GraphOverview.returnGraph().getData());
                GraphOverview.returnGraph().draw();
            }
        },

        /**
         * Calculates the average power consumption for te information in the dropdown
         *
         * @param dataArray : array
         * @param filter : boolean
         * @returns {number}
         */
        calculateAveragePowerConsumption: function (dataArray, filter) {
            /**
             * Checks if this functions is used for filtering or not
             * Calculates and returns the average number
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
        
       hidePopoversOnOutsideClick : function () {
            $('body').on('click', function (e) {
                //only buttons
                if ($(e.target).data('toggle') !== 'popover'
                    && $(e.target).parents('.popover.in').length === 0) {
                    $('[data-toggle="popover"]').popover('hide');
                }
            });
        },

        monthNames : function (monthNumber) {
            return this.settings.monthNames[monthNumber];
        },

        calculateLowest : function (number) {
            if (number < Utils.settings.currentLowest)
                Utils.settings.currentLowest = number;
        },

        calculateHighest : function (number) {
            if (number > Utils.settings.currentHighest)
                Utils.settings.currentHighest = number
        },

        getHighest : function () {
            return Utils.settings.currentHighest
        },

        getLowest : function () {
            return Utils.settings.currentLowest
        }
    };

})();
