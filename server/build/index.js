/* index.js */

'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2] || 8888;

var latestData = {};

var routes = {
	log: function log(req, res) {
		if (req.method === 'POST') {
			(function () {
				var log = fs.createWriteStream('./log', { flags: 'a' });

				req.pipe(log, { end: false }).on('end', function () {
					res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
					res.end();
					log.end('\n');
				});

				// This is here incase any errors occur
				log.on('error', function (err) {
					throw err;
				}); // bubble up
			})();
		}
	},

	payload: function payload(req, res) {
		if (req.method === 'POST') {
			(function () {
				var jsonPayload = '';
				req.on('data', function (chunk) {
					jsonPayload += chunk;
				}); // chunk gets coerced to string
				req.on('end', function () {
					latestData = JSON.parse(jsonPayload);
					res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
					res.end();
				});
			})();
		} else {
			res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
			res.end();
		}
	},

	data: function data(req, res) {
		res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
		res.end(JSON.stringify(latestData));
	},

	notFound: function notFound(req, res) {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('404 not found');
	}
};

http.createServer(function (req, res) {

	// A simple router
	var route = url.parse(req.url).pathname.substr(1); // get the pathname, minus the beginning '/'

	if (routes.hasOwnProperty(route)) {
		routes[route](req, res);
	} else {
		routes.notFound(req, res);
	}
	// try {
	// 	routes[route](req, res);
	// } catch (e) {
	// 	if (e instanceof TypeError) {
	// 		routes.notFound(req, res);
	// 	}
	// 	else {
	// 		throw e; // bubble up to crash
	// 	}
	// }
}).listen(parseInt(port, 10));

console.log('Server running at\n  => http://localhost:' + port + '/\nCTRL + C to shutdown');
//# sourceMappingURL=index.js.map
