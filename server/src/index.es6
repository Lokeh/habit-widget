/* index.js */

const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.argv[2] || 8888;

let latestData = {};

const routes = {
	log(req, res) {
		if (req.method === 'POST') {
			const log = fs.createWriteStream('./log', { flags: 'a' });

			req.pipe(log, { end: false })
				.on('end', () => {
				res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
				res.end();
				log.end('\n');
			});

			// This is here incase any errors occur
			log.on('error', (err) => { throw err; }); // bubble up
		}
	},

	payload(req, res) {
		if (req.method === 'POST') {
			let jsonPayload = '';
			req.on('data', (chunk) => { jsonPayload += chunk; }); // chunk gets coerced to string
			req.on('end', () => { 
				latestData = JSON.parse(jsonPayload);
				res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
				res.end();
			});
		}
		else if (req.method === 'OPTIONS') {
			var headers = {};
			// IE8 does not allow domains to be specified, just the *
			// headers["Access-Control-Allow-Origin"] = req.headers.origin;
			headers["Access-Control-Allow-Origin"] = "*";
			headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
			headers["Access-Control-Allow-Credentials"] = false;
			headers["Access-Control-Max-Age"] = '86400'; // 24 hours
			headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
			res.writeHead(200, headers);
			res.end();
		}
		else {
			res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
			res.end();
		}
	},

	data(req, res) {
		res.writeHead(200, "OK", {
			'Content-Type': 'text/plain'
		});
		res.end(JSON.stringify(latestData));
	},

	notFound(req, res) {
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.end('404 not found');
	}
};


http.createServer((req, res) => {

	// A simple router
	const route = url.parse(req.url).pathname.substr(1); // get the pathname, minus the beginning '/'

	if (routes.hasOwnProperty(route)) {
		routes[route](req, res);
	}
	else {
		routes.notFound(req, res);
	}

}).listen(parseInt(port, 10));

console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
