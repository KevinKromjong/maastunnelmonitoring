/*
 |--------------------------------------------------------------------------
 | DateTime Calendar Module
 |--------------------------------------------------------------------------
 |
 | Initializes the DateTime Calendar on the comparison screen
 |
 */

var DateTimeCalendar = (function() {

    return {
        init : function () {
            $('#datetimepicker1, #datetimepicker2').datetimepicker({
                locale: 'nl',
                format: 'DD/MM/YYYY',
                ignoreReadonly: true
            });
        }
    }

})();