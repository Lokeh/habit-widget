/* index.js */
const http = require("http");
const fs = require("fs");
const port = process.argv[2] || 8888;


http.createServer(function(request, response) {
	const log = fs.createWriteStream('./log', { flags: 'a' });

	log.write('\n');
	request.pipe(log); // automatically calls log.end??

	request.on('end', () => {
		response.writeHead(200);
		response.end();
	});

	// This is here incase any errors occur
	log.on('error', function (err) {
		console.log(err);
	});
}).listen(parseInt(port, 10));

console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
