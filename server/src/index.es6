/* index.js */

const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.argv[2] || 8888;

let latestData = {};

const routes = {
	log(req, res) {
		const log = fs.createWriteStream('./log', { flags: 'a' });

		req.pipe(log, { end: false })
			.on('end', () => {
			res.writeHead(200);
			res.end();
			log.end('\n');
		});

		// This is here incase any errors occur
		log.on('error', (err) => { throw err; }); // bubble up
	},

	payload(req, res) {
		let jsonPayload = '';
		req.on('data', (chunk) => { jsonPayload += chunk; }); // chunk gets coerced to string
		req.on('end', () => { latestData = JSON.parse(jsonPayload);});

		res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
		res.end();
	},

	data(req, res) {
		res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
		res.end(JSON.stringify(latestData));
	},

	notFound(req, res) {
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.end('404 not found');
	}
};


http.createServer((req, res) => {

	// A simple router
	const route = url.parse(req.url).pathname.substr(1);
	try {
		routes[route](req, res);
	} catch (e) {
		if (e instanceof TypeError) {
			routes.notFound(req, res);
		}
		else {
			throw e; // bubble up to crash
		}
	}

}).listen(parseInt(port, 10));

console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
