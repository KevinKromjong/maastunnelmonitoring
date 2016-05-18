/*
 |--------------------------------------------------------------------------
 | Toggle Plot  Module
 |--------------------------------------------------------------------------
 |
 | Show or hide a line in the graph when the user clicks a line in the legend
 |
 */


var TogglePlot = (function () {
    
    return {
        toggle: function (seriesIdx) {
            if (seriesIdx != 0) {
                GraphOverview.returnGraph().getData()[seriesIdx].lines.show = !GraphOverview.returnGraph().getData()[seriesIdx].lines.show;
                GraphOverview.returnGraph().setData(GraphOverview.returnGraph().getData());
                GraphOverview.returnGraph().draw();
            }
        }
    }
})();