/*
 |--------------------------------------------------------------------------
 | Ajax Loading Gif Module
 |--------------------------------------------------------------------------
 |
 | Displays a loading gif when an AJAX-call is being made
 |
 */

var AjaxLoadingGif = (function () {

    return {
        
        init: function () {
          this.load();
        },

        load: function () {
            $(document).on({
                ajaxStart: function () {
                    $('body').addClass("loading");
                },
                ajaxStop: function () {
                    $('body').removeClass("loading");
                }
            });
        }
    }
})();