var io = require('socket.io'),
	express = require('express');

var app = express.createServer(),
	io = io.listen(app);

app.listen(3001);

io.sockets.on('connection', function (socket) {
    var clientId = socket.id;

	socket.emit('ack', { message: 'You are connected.' });

	socket.on('next', function (data) {
        console.log('next slide');
		socket.broadcast.emit('next', data, clientId);
  	});

    socket.on('prev', function(data){
        console.log('prev slide');
        socket.broadcast.emit('prev', data, clientId);
    });


    socket.on('draw', function(data){
        console.log('draw');
        socket.broadcast.emit('draw', data, clientId);
    });

    socket.on('clear-graffiti', function(){
        socket.broadcast.emit('clear-graffiti');
    })
});