/*
 |--------------------------------------------------------------------------
 | Websocket  Module
 |--------------------------------------------------------------------------
 |
 | Connects to the websocket via server.js
 | Uses the websocket to display the correct runtime of a fan
 |
 */


var WebSockets = (function () {

    var s;
    
    return {
        settings: {
            baseURL: '', // Call function to determine it
            socketIOPort: 443,
            socketIOLocation: this.baseURL + this.socketIOPort, // Build Socket.IO location
            socket: io.connect(this.socketIOLocation),
            fanTime: new Date(),
            fanStatus: $('.fan-information-technical .fan-status'),
            fanTimeOn: $('.fan-information-technical .fan-time-on')
        },


        init: function () {
            s = this.settings;

            this.getBaseURL();
        },

        getBaseURL: function () {
            /**
             * Generates the URL from which the data is pulled
             */

            s.baseURL = location.protocol + "//" + location.hostname + ":" + location.port;
        },

        bindTimeToScreen: function () {
            /**
             * Put the incoming time on the screen on the left column of the dropdown
             */
            socket.on('date', function (data) {
                s.fanTime = new Date(data.date);

                if (s.fanStatus.attr('class') == 'fan-status red') {
                    s.fanTimeOn.text('0');
                } else {
                    s.fanTimeOn.text(
                        (s.fanTime.getHours() < 10 ? '0' : '') + s.fanTime.getHours() + ':' +
                        (s.fanTime.getMinutes() < 10 ? '0' : '') + s.fanTime.getMinutes() + ':' +
                        (s.fanTime.getSeconds() < 10 ? '0' : '') + s.fanTime.getSeconds()
                    );
                }
            });
        }
    }
})();


