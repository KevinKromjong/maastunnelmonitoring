var StatusIndicator = (function () {

    var s;

    return {

        settings: {
            title: '',
            subtext: '',
            question: '',
            options: []
        },

        init: function () {
            StatusIndicator = this;
            s = this.settings;

            $('header .dropdown-menu')
                .prepend('<li><a class="trigger-popup" data-toggle="modal" data-target="#myModal">Trigger Popup</a></li>')
                .prepend('<li><a href="#" class="trigger-notification">Trigger Notificatie</a></li>');

            this.createDummyData();
        },

        /**
         * Omdat tijdens de demo niet zeker is of de simulatiedata voor de popup en notificaties zorgt, zijn er dummy's ingebouwd
         * zodat tijdens de demo deze alsnog kunnen worden laten zien
         */
        createDummyData: function () {
            $('.trigger-popup').on('click', function () {
                StatusIndicator.createPopup(
                    'Overschrijding maximale waarde',
                    '',
                    'Ventilator <strong>Z-01</strong> aan de noordzijde van de oostbuis heeft de <i>minimale</i> kritieke waarde <strong>5x</strong> overschreden in het afgelopen uur. U moet actie ondernemen. Onderstaande aanbevolen opties zijn gerangschikt op de beste keuze in deze situatie',
                    [['fan.png', 'Ga direct naar de ventilator', 'Bekijk de desbetreffende ventilator op de detailpagina'], ['phone.png', 'Neem direct contact op met een monteur', 'Belt een monteur uit de lijst met beschikbare monteurs']]
                );
            });

            $('.trigger-notification').on('click', function () {
                StatusIndicator.createNotification(
                    'Ventilator kapot',
                    'Ventilator Z-01 aan de noordzijde van de oostbuis is kapot. Er is een melding verstuurd naar monteur <strong>Jan Wiemer</strong>, die op dit moment onderweg naar de ventilator is',
                    '',
                    []
                );
            });
        },

        fillSettings: function (arguments) {
            //Fill the settings object with the corresponding data
            var i = 0;
            for (var key in this.settings) {
                this.settings[key] = arguments[i];
                i++;
            }
        },

        /**
         * Executes the correct functions and creates a message according to the given parameters
         *
         * @param arguments
         *  args[0](string)             : the title of the message
         *  args[1](string)(optional)   : extra text beneath the title
         *  args[2](string)(if popup)   : the question
         *  args[3][array](if popup)    : the options in the format: [['link-to-image', 'option1', 'extra text option1'], ['link-to-image', 'option2','extra text option2'], etc..]
         *
         **/
        createPopup: function () {
            this.fillSettings(arguments);

            var scope = $('.message-popup');

            scope.find('.message-title').html(s.title);
            scope.find('.message-subtext').html(s.subtext);
            scope.find('.message-question').html(s.question);


            $.ajax({
                type: "POST",
                url: '/geo-info-response',
                data: "",
                success: function (data) {
                    var linkje = data;

                    $.each(s.options, function (index, value) {

                        scope.find('.message-options').append(
                            '<li>' +
                            '<span class="anchor-wrapper">' +
                            '<a class="pull-left">' +
                            '<img class="media-object" src="/images/' + value[0] + '" alt="Media Object"/>' +
                            '</a>' +

                            '<span class="media-body" ">' +
                            '<h5 class="media-heading message-title list-group-item-heading">' + value[1] + '</h5>' +
                            '<p class="message-subtext">' + value[2] + '</p>' +
                            '</span>' +
                            '</span>' +
                            '</li>'
                        );
                    });

                    $('.anchor-wrapper').wrap('<a href="' + linkje + '" class="btn btn-success btn-wide"></a>');
                }
            });


            scope.show();
        },

        createNotification: function () {
            this.fillSettings(arguments);

            var scope = $('.message-notification');

            scope.find('.message-title').html(s.title);
            scope.find('.message-subtext').html(s.subtext);

            scope.show();
        },
    }

})();