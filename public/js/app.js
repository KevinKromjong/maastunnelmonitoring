(function () {

    //Initialize the Graphs
    // WebSockets.init();
    StatusIndicator.init();

    FanVariables.init(fansGraph);  //fansGraph is a global variable send through the API in FanController.php
    GraphOverview.init();
    FanDropdown.init();
    FanFilter.init();
    FanCompare.init();

    //Helpers
    AjaxLoadingGif.init();
    DateTimeCalendar.init();
    Utils.initFancyBox();

    // limits = [];
    //
    // var limitOne = {
    //     'number' : 1,
    //     'fan' : 5,
    //     'dateFrom' : 'Donderdag 2 juni 2016 <br/> 16:50:23',
    //     'dateTill' : 'Donderdag 2 juni 2016 <br/> 17:01:44',
    //     'duration' : '00:11:21',
    //     'moreIcon' :  '<i class="glyphicon glyphicon-plus"></i>'
    // };
    //
    // limits.push(limitOne);
    //
    // var limitTwo = {
    //     'number' : 2,
    //     'fan' : 2,
    //     'dateFrom' : 'Dinsdag 7 juni 2016 <br/> 12:36:25',
    //     'dateTill' : 'Dinsdag 7 juni 2016 <br/> 13:54:09',
    //     'duration' : '01:18:16',
    //     'moreIcon' :  '<i class="glyphicon glyphicon-plus"></i>'
    // };
    //
    // limits.push(limitTwo);
    //
    // var limitThree = {
    //     'number' : 3,
    //     'fan' : 2,
    //     'dateFrom' : 'Zaterdag 11 juni 2016 <br/> 22:02:56',
    //     'dateTill' : 'Zaterdag 11 juni 2016 <br/> 22:04:33',
    //     'duration' : '00:01:37',
    //     'moreIcon' :  '<i class="glyphicon glyphicon-plus"></i>'
    // };
    //
    // limits.push(limitThree);
    //
    // var limitFour = {
    //     'number' : 4,
    //     'fan' : 1,
    //     'dateFrom' : 'Maandag 13 juni 2016 <br/> 17:20:19',
    //     'dateTill' : 'Maandag 13 juni 2016 <br/> 18:01:22',
    //     'duration' : '00:41:03',
    //     'moreIcon' :  '<i class="glyphicon glyphicon-plus"></i>'
    // };
    //
    // limits.push(limitFour);
    //
    // $.each(limits, function (key, value) {
    //     var wrapper = $('<tr>');
    //
    //     $.each(limits[key], function (key2, value2) {
    //             wrapper.append('<td class="details-control">' + value2 + '</td>');
    //     });
    //
    //     wrapper.append('</tr>');
    //     $('#example tbody').append(wrapper);
    // });

    /* Formatting function for row details - modify as you need */
    function format(d) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
            '<tr>' +
            '<td>Full name:</td>' +
            '<td>' + d.name + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Extension number:</td>' +
            '<td>' + d.extn + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Extra info:</td>' +
            '<td>And any further details here (images etc)...</td>' +
            '</tr>' +
            '</table>';
    }

    var shitloadaandata = [
        ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
        ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
        ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
        ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
        ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
        ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
        ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
        ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
        ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
        ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
        ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
        ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
        ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
        ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
        ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
        ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
        ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
        ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
        ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
        ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
        ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
        ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
        ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
        ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600"],
        ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
        ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
        ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
        ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
        ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
        ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
        ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400"],
        ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
        ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
        ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
        ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
        ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
    ];

    var dataSet = [
        ['1', '5', 'Donderdag 2 juni 2016 16:50:23', 'Donderdag 2 juni 2016  17:01:44', '00:11:21', '', 'Ja', 'Ja', '<ul><li>Verkeersdrukte in de Maastunnel</li><li>Ventilator stond lang op stand 8</li></ul>', 'Chef van de wacht Bert Bakker heeft de melding ingezien maar niet gereageerd'],
        ['2', '2', 'Dinsdag 7 juni 2016 12:36:25', 'Dinsdag 7 juni 2016 13:54:09', '01:18:16', '', 'Ja', 'Ja', '<ul><li>Defect motoronderdeel</li></ul>', 'Defect motoronderdeel is vervangen'],
        ['3', '2', 'Zaterdag 11 juni 2016 22:02:56', 'Zaterdag 11 juni 2016 22:04:33', '00:01:37', '', 'Ja', 'Ja', '<ul><li>Geen mogelijke oorzaak gevonden</li></ul>', '-'],
        ['4', '1', 'Maandag 13 juni 2016 17:20:19', 'Maandag 13 juni 2016 18:01:22', '00:41:03', '', 'Ja', 'Ja', '<ul><li>Verkeersdrukte in de Maastunnel</li><li>Ventilator stond lang op stand 8</li></ul>', 'Chef van de wacht W. Acht heeft de melding ingezien maar te laat gereageerd op de melding']
    ];

    /* Formatting function for row details - modify as you need */
    function format(d) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
            '<tr>' +
            '<td><strong>Overschrijding vroegtijdig opgemerkt</strong></td>' +
            '<td>' + d[6] + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td><strong>Melding gegeven</strong></td>' +
            '<td>' + d[7] + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td><strong>Mogelijke reden</strong></td>' +
            '<td>' + d[8] + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td><strong>Opmerking</strong></td>' +
            '<td>' + d[9] + '</td>' +
            '</tr>' +
            '</table>';
    }

    var table = $('#example').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.11/i18n/Dutch.json"
        },
        data: dataSet,
        columns: [
            {title: "#"},
            {title: "Ventilator"},
            {
                title: "Begin Overschrijding.",
                type: "date-dd-MMM-yyyy"
            },
            {title: "Einde Overschrijding"},
            {title: "Duur"},
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": '<i class="glyphicon glyphicon-plus"></i>'
            }
        ]
    });

    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    $('#example_paginate .previous').html('Vorige');
    $('#example_paginate .next').html('Volgende');

})();
