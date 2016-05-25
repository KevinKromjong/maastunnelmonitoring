(function () {
    //Initialize the Graphs
    // WebSockets.init();
    FanVariables.init(fansGraph);  //fansGraph is a global variable send through the API in FanController.php
    GraphOverview.init();
    FanDropdown.init();
    FanFilter.init();
    FanCompare.init();

    //Helpers
    AjaxLoadingGif.init();
    DateTimeCalendar.init();
    Utils.initFancyBox();


})();
