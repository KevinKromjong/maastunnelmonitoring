(function () {

    // Initialize the Graphs
    StatusIndicator.init();
    FanVariables.init(fansGraph);  //fansGraph is a global variable send through the API in FanController.php
    FanDropdown.init();
    GraphOverview.init();

    //Helpers
    Utils.init();

})();