var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function (socket) {
    console.log('Client connected');
    socket.broadcast.emit('message', "User connected")
    socket.on('typing', function(message) {
      socket.broadcast.emit('typing')
    })

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
});

server.listen(process.env.PORT || 8080);
