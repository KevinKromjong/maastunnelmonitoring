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
            rootUrl: $('meta[name="base_url"]').attr('content')
        },

        rootUrl: function () {
            return rootUrl = $('meta[name="base_url"]').attr('content');
        },

        initFancyBox: function () {
            $(".fancybox").fancybox();
        }
    };

})();
