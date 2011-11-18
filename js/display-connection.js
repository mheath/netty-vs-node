var socket,
	server = 'http://127.0.0.1:3009';

var connect = function(callback) {
	console.log("Attempting to connect to " + server);
	socket = io.connect(server);
	socket.on('ack', function() {
		if (callback) callback();
	});
	socket.on('score', function(totals) {
		var val = totals.pos - totals.neg;
		var max = totals.cnt * 2;
		var pos = (((val / max) * 100) << 0);
		scale.moveTo(pos);
	});
};
