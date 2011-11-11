var http = require('http');

http.createServer(function(req, resp) {
	var body = "Hello world!";
	resp.writeHead(200, {
	'Content-Length': body.length,
	'Content-Type': 'text/plain'
	});
	resp.end(body);
}).listen(8080);

console.log('Server started');
