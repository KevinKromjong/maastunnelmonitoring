(function () {
    //Initialize the Graphs
    FanVariables.init(fansGraph);
    GraphOverview.init();
    FanDropdown.init();
    FanCompare.init();

    //Helpers
    AjaxLoadingGif.init();
    DateTimeCalendar.init();
    Utils.initFancyBox();
})();
