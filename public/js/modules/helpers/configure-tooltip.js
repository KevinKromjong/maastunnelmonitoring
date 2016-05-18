/*
 |--------------------------------------------------------------------------
 | Configure Tooltip Module
 |--------------------------------------------------------------------------
 |
 | Configures the tooltips when hovering over a datapoint in the graph
 |
 */

var ConfigureTooltip = (function () {

    var s;

    return {
        settings: {
            previousPoint: null,
        },

        configure: function () {

            s = this.settings;

            $("#technical-graph, #fan-graph").bind("plothover", function (event, pos, item) {
                if (item) {
                    if (s.previousPoint != item.datapoint) {
                        s.previousPoint = item.datapoint;
                        $('#tooltip').remove();
                        var time = new Date(item.datapoint[0]);
                        ConfigureTooltip.createToolTip(item.pageX, item.pageY, item.datapoint[1].toFixed(2) + ' Kilowatt (' + (time.getHours() < 10 ? '0' : '') + time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes() + ')');
                    }
                } else {
                    $('#tooltip').remove();
                    s.previousPoint = null;
                }
            });
        },

        createToolTip: function (x, y, contents) {

            $('<div id="tooltip">' + contents + '</div>').css({
                position: 'absolute',
                display: 'none',
                top: y + 5,
                left: x + 5,
                border: '1px solid #fdd',
                padding: '2px',
                'background-color': '#fee',
                opacity: 0.80
            }).appendTo("body").fadeIn(200);
        }

    }

})();