var http = require('http');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	console.log('CPU count: ' + numCPUs);

	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('death', function(worker) {
		console.log('worker ' + worker.pid + ' died');
	});

	console.log('Master started');
} else {
	http.createServer(function(req, resp) {
		var body = "Hello world!";
		resp.writeHead(200, {
		'Content-Length': body.length,
		'Content-Type': 'text/plain'
		});
		resp.end(body);
	}).listen(8080);
	console.log('Worker started');
}

