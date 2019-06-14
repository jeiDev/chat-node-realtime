function routes() {
	const express = require("express"),
		app = express(),
		http = require('http').Server(app),
		path = require("path"),
		io = require("socket.io")(http);

	var userConnect = {}
	var userDisconnect = []
	var msgSave = []
	var blockMsg = {}


	/******************************
	 * ROUTES *********************
	******************************/
	app.use(express.static('public'))
	app.get('/', function (req, res) {
		let url = `${__dirname}/../public/pages/index.html`
		res.sendFile(path.join(url));
	});

	app.get('/login', function (req, res) {
		let url = `${__dirname}/../public/pages/login.html`
		res.sendFile(path.join(url));
	});

	app.get('/profile', function (req, res) {
		let url = `${__dirname}/../public/pages/profile.html`
		res.sendFile(path.join(url));
	});
	
	/******************************
	 * SOCKECT ********************
	******************************/
	io.on('connection', function (socket) {
	
		socket.on('getMessageId', function (id) {
			io.emit('getMessage', {messages: msgSave, id});
		});

		socket.on('message', function (msg) {
			msgSave.push(msg)
			io.emit('msg', msg);
		});

		socket.on('dataUser', function (user) {
			console.log(user)
			if(!userConnect[user.id]) userConnect[user.id] = {name: user.name, image: user.image}
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
				
			},15000)
		});

	})

	/******************************
	 * RUN PORT SERVER ************
	******************************/
	http.listen(80, function () {
		console.log('listening on *:80');
	});

}

module.exports.routes = routes;