var http = require('http');

var s = http.createServer(function(req, res) {
	res.writeHead(200, {'content-type': 'text/plain'});
	res.end("hello world!");
});

s.listen(8088);

// curl http://localhost:8088/