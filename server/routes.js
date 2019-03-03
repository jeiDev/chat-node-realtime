function routes() {
	const express = require("express"),
		app = express(),
		http = require('http').Server(app),
		path = require("path"),
		io = require("socket.io")(http);

	app.use(express.static('public'))
	app.get('/', function (req, res) {
		let url = `${__dirname}/../public/pages/index.html`
		res.sendFile(path.join(url));
	});

	app.get('/login', function (req, res) {
		let url = `${__dirname}/../public/pages/login.html`
		res.sendFile(path.join(url));
	});

	io.on('connection', function (socket) {
		console.log("User connected")

		socket.on('message', function (msg) {
			io.emit('message', msg);
			console.log('message: ' + msg);
		});

		//socket.broadcast.emit('hi');

		socket.on('disconnect', function () {
			console.log('user disconnected');
		});

	})

	http.listen(80, function () {
		console.log('listening on *:80');
	});

}

module.exports.routes = routes;