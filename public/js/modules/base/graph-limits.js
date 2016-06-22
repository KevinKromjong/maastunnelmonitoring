var GraphLimits = (function () {

    return {

        settings: {
            dataset: [],
            table: null
        },

        init: function () {
            s = this.settings;

            this.fillDataset();
            this.configureTable();
            this.addEventListenerToTable();
            this.addPaginationToTable();
        },

        fillDataset: function () {
            s.dataSet = [
                ['1', '5', 'Donderdag 2 juni 2016 16:50:23', 'Donderdag 2 juni 2016  17:01:44', '00:11:21', '', 'Ja', 'Ja', '<ul><li>Verkeersdrukte in de Maastunnel</li><li>Ventilator stond lang op stand 8</li></ul>', 'Chef van de wacht Bert Bakker heeft de melding ingezien maar niet gereageerd'],
                ['2', '2', 'Dinsdag 7 juni 2016 12:36:25', 'Dinsdag 7 juni 2016 13:54:09', '01:18:16', '', 'Ja', 'Ja', '<ul><li>Defect motoronderdeel</li></ul>', 'Defect motoronderdeel is vervangen'],
                ['3', '2', 'Zaterdag 11 juni 2016 22:02:56', 'Zaterdag 11 juni 2016 22:04:33', '00:01:37', '', 'Ja', 'Ja', '<ul><li>Geen mogelijke oorzaak gevonden</li></ul>', '-'],
                ['4', '1', 'Maandag 13 juni 2016 17:20:19', 'Maandag 13 juni 2016 18:01:22', '00:41:03', '', 'Ja', 'Ja', '<ul><li>Verkeersdrukte in de Maastunnel</li><li>Ventilator stond lang op stand 8</li></ul>', 'Chef van de wacht W. Acht heeft de melding ingezien maar te laat gereageerd op de melding']
            ];
        },

        formatTable: function (d) {
            /* Formatting function for row details - modify as you need */
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

        },

        configureTable: function () {
            s.table = $('#example').DataTable({
                "pagingType" : 'full_numbers',
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.11/i18n/Dutch.json"
                },
                data: s.dataSet,
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
                        "defaultContent": '<i class="fa fa-info"></i>'
                    }
                ]
            });
        },

        addEventListenerToTable: function () {
            // Add event listener for opening and closing details
            $('#example tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = s.table.row(tr);

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child(GraphLimits.formatTable(row.data())).show();
                    tr.addClass('shown');
                }
            });
        },

        addPaginationToTable: function () {
            $('#example_paginate .previous').html('Vorige');
            $('#example_paginate .next').html('Volgende');
        }
    }
})();