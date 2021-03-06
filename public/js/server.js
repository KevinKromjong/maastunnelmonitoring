var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;

    switch(path) {
        case '/' :
            response.writeHead(200, { 'Content-Type' : 'text/html'});
            response.write('hello world');
            response.end();
            break;
        case '/socket.html' :
            fs.readFile(__dirname + path, function (error, data) {
                if(error) {
                    response.writeHead(404);
                    response.write("Oops, this doesn't exist - 404");
                    response.end();
                } else {
                    response.writeHead(200, {'Content-Type' : 'text/html'});
                    response.write(data, 'utf8');
                    response.end();
                }
            });
            break;
        default :
            response.writeHead(404);
            response.write("Oops, this doesn't exist - 404");
            response.end();
            break;
    }
});


function randomizeDate(){
    var randomDate = '2016-05-02 ';

    var randomHour = Math.floor((Math.random() * 23) + 1);
    var randomMinute = Math.floor((Math.random() * 59) + 1);
    var randomSecond = Math.floor((Math.random() * 59) + 1);

    return randomDate + randomHour + ':' + randomMinute + ':' + randomSecond;
}

server.listen(443);
console.log('Server running at http://10.129.10.82:8080/');

var listener = io.listen(server);

listener.sockets.on('connection', function (socket) {
    setInterval(function () {
        socket.emit('date', {'date' : randomizeDate()});
    });

});
