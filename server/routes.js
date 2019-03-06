function routes() {
	const express = require("express"),
		app = express(),
		http = require('http').Server(app),
		path = require("path"),
		io = require("socket.io")(http);

	var userConnect = {},
		userDisconnect = []

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
		socket.on('message', function (msg) {
			io.emit('message', msg);
		});

		socket.on('dataUser', function (user) {
			if(!userConnect[user.id]) userConnect[user.id] = {name: user.name}
			io.emit('online', userConnect);
			userDisconnect.splice(userDisconnect.indexOf(user.id), 1)
			socket.on('disconnect', function () {
				if(userDisconnect.indexOf(user.id) === -1) userDisconnect.push(user.id)
				io.emit('disconn', user.id);
			});

			setInterval(()=>{
				if(userDisconnect.length > 0){
					io.emit('status', userDisconnect);
					
					for (let i = 0; i < userDisconnect.length; i++) delete userConnect[userDisconnect[i]]

					userDisconnect = []
				}
				
			},5000)
		});

	})

	http.listen(80, function () {
		console.log('listening on *:80');
	});

}

module.exports.routes = routes;