var io = require('socket.io'),
    express = require('express');

var app = express.createServer(),
    io = io.listen(app);

app.listen(3009);

var voters = {
	length: 0
	},
	totals = {
		pos: 0,
		neg: 0
	};

io.configure('development', function(){
	io.enable('browser client etag');
	io.set('log level', 1);

	io.set('transports', [
		  'websocket'
		, 'flashsocket'
		, 'htmlfile'
		, 'xhr-polling'
		, 'jsonp-polling'
	]);
});

io.sockets.on('connection', function (socket) {
    var clientId = socket.id;

    socket.emit('ack', { message: 'You are connected.' });

	// Voter
	socket.on('request registration', function(callback) {
		var guid = generateGuid();
		if (callback) callback(guid);
	});

	socket.on('register voter', function(guid, callback) {
		socket.guid = guid;
		if (voters[guid]) {
			voters[guid].socket = socket;
			console.log('Reattached: ' + guid);
		}
		else {
			voters[guid] = {socket: socket, vote: 0};
			voters.length++;
			console.log('Registered: ' + guid);
		}
		if (callback) callback(true);
	});

    socket.on('vote', function(vote) {
		var prior = voters[socket.guid].vote;
		var pos = ((vote > 0)? vote : 0) - ((prior > 0)? prior : 0);
		var neg = ((vote < 0)? vote : 0) - ((prior < 0)? prior : 0);
		voters[socket.guid].vote = vote;
		totals.pos += pos;
		totals.neg += -neg;
		
		totals.cnt = voters.length;
        socket.broadcast.emit('score', totals);
        socket.emit('score', totals);
    });

});

var generateGuid = function() {
	var mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
	var guid = mask.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});
	return guid;
}

