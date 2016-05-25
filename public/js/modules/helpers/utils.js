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

        rootUrl: function () {
            return rootUrl = $('meta[name="base_url"]').attr('content');
        },

        initFancyBox: function () {
            $(".fancybox").fancybox();
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
        },

        resetLowest : function () {
            Utils.settings.currentLowest = 0;
        },

        resetHighest : function () {
            Utils.settings.currentHighest = 0;
        }
    };

})();
