/*
 |--------------------------------------------------------------------------
 | Configure Tooltip Module
 |--------------------------------------------------------------------------
 |
 | Configures the tooltips when hovering over a datapoint in the graph
 |
 */

var Tooltip = (function () {

    var s;

    return {
        settings: {
            previousPoint: null
        },

        configure: function () {
            /**
             * Sets up and configure the tooltip
             * Shows it on hover, removes it on release
             */

            s = this.settings;

            $("#technical-graph, #fan-graph, #graph-comparison").bind("plothover", function (event, pos, item) {
                if (item) {
                    if (s.previousPoint != item.datapoint) {
                        s.previousPoint = item.datapoint;
                        $('#tooltip').remove();
                        var time = new Date(item.datapoint[0]);
                        Tooltip.createToolTip(
                            item.pageX,
                            item.pageY,
                            item.datapoint[1].toFixed(2) +
                            ' Kilowatt ' + '<br/>' +
                            time.getDate() + ' ' +
                            Utils.settings.monthNames[time.getMonth()] + ' ' +
                            time.getFullYear() + ' ' +
                            '(' +(time.getHours() < 10 ? '0' : '') +
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
        }

    }

})();