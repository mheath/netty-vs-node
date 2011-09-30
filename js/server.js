var io = require('socket.io'),
    express = require('express');

var app = express.createServer(),
    io = io.listen(app);

app.listen(3001);

io.sockets.on('connection', function (socket) {
    var clientId = socket.id;

    socket.emit('ack', { message: 'You are connected.' });

    socket.on('slideto', function(data) {
        console.log('slideto', data);
        socket.broadcast.emit('slideto', data);
    });
});