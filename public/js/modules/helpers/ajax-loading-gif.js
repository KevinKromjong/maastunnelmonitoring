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