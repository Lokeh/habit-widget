/* index.js */

'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2] || 8888;

var routes = {
	log: function log(req, res) {
		var log = fs.createWriteStream('./log', { flags: 'a' });

		log.write('\n');
		req.pipe(log); // automatically calls log.end??

		req.on('end', function () {
			res.writeHead(200);
			res.end();
		});

		// This is here incase any errors occur
		log.on('error', function (err) {
			return console.log(err);
		});
	},

	payload: function payload(req, res) {
		res.writeHead(200);
		// res.end();
	},

	data: function data(req, res) {
		res.writeHead(200);
		// res.end();
	},

	notFound: function notFound(req, res) {
		res.writeHead(404);
		res.write('404 not found');
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
			throw e;
		}
	} finally {
		res.end();
	}
}).listen(parseInt(port, 10));

console.log('Server running at\n  => http://localhost:' + port + '/\nCTRL + C to shutdown');
//# sourceMappingURL=index.js.map
