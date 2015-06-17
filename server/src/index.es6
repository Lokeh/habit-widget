/* index.js */

const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.argv[2] || 8888;


const routes = {
	log(req, res) {
		const log = fs.createWriteStream('./log', { flags: 'a' });

		req.pipe(log, { end: false });

		req.on('end', () => {
			res.writeHead(200);
			res.end();
			log.end('\n');
		});

		// This is here incase any errors occur
		log.on('error', (err) => { throw err; }); // bubble up
	},

	payload(req, res) {
		res.writeHead(200);
		res.end();
	},

	data(req, res) {
		res.writeHead(200);
		res.end();
	},

	notFound(req, res) {
		res.writeHead(404);
		res.end('404 not found');
	}
};


http.createServer((req, res) => {
	const route = url.parse(req.url).pathname.substr(1);
	console.log(route);

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
