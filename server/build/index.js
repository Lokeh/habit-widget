/* index.js */

'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2] || 8888;

var routes = {
	log: function log(req, res) {
		var log = fs.createWriteStream('./log', { flags: 'a' });

		req.pipe(log, { end: false });

		req.on('end', function () {
			res.writeHead(200);
			res.end();
			log.end('\n');
		});

		// This is here incase any errors occur
		log.on('error', function (err) {
			throw err;
		}); // bubble up
	},

	payload: function payload(req, res) {
		res.writeHead(200);
		res.end();
	},

	data: function data(req, res) {
		res.writeHead(200);
		res.end();
	},

	notFound: function notFound(req, res) {
		res.writeHead(404);
		res.end('404 not found');
	}
};

http.createServer(function (req, res) {
	var route = url.parse(req.url).pathname.substr(1);
	console.log(route);

	try {
		routes[route](req, res);
	} catch (e) {
		if (e instanceof TypeError) {
			routes.notFound(req, res);
		} else {
			throw e; // bubble up to crash
		}
	}
}).listen(parseInt(port, 10));

console.log('Server running at\n  => http://localhost:' + port + '/\nCTRL + C to shutdown');
//# sourceMappingURL=index.js.map
