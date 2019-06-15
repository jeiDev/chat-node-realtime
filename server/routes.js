async function routes() {
	const express = require("express"),
		request = require("request")
		app = express(),
		http = require('http').Server(app),
		path = require("path"),
		io = require("socket.io")(http),
		apiBackend = "http://localhost:3000/api/";

	var userConnect = {}
	var userDisconnect = []
	var msgSave = []
	var msgSaveTMP = []

	await request.get({url: `${apiBackend}MessagesUsers`}, function optionalCallback(err, httpResponse, body) {
		if (err) {
			return console.error('upload failed:', err);
		}
		
		let data = JSON.parse(body)

		Object.keys(data).forEach(key => {
			data[key].id = data[key].idUser
			delete data[key].idUser
			msgSave.push(data[key])
		})
	});

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
	 * SAVE MGS IN DB *************
	******************************/
	intervalSendMsg()
	function intervalSendMsg(){ 
		setTimeout(()=>{
			if(msgSaveTMP.length < 1) intervalSendMsg()
			else popMsg()
		},5000)
	}

	function popMsg(){
		let msg = msgSaveTMP.pop()
		sendMsg(msg)
	}

	function sendMsg(msg){
		msg.idUser = msg.id
		delete msg.id
		request.post({url: `${apiBackend}MessagesUsers`, json: msg}, function optionalCallback(err, httpResponse, body) {
			if (err) {
				msgSaveTMP.push(msg)
				popMsg()
				return console.error('upload failed:', err);
			}
			console.log('Upload successful!  Server responded with:', body);
			if(msgSaveTMP.length > 0 ) popMsg()
			else intervalSendMsg()
		});
	}
	
	/******************************
	 * SOCKECT ********************
	******************************/
	io.on('connection', function (socket) {
	
		socket.on('getMessageId', function (id) {
			io.emit('getMessage', {messages: msgSave, id});
		});

		socket.on('message', function (msg) {
			msgSave.push(msg)
			msgSaveTMP.push(msg)
			io.emit('msg', msg);
		});

		socket.on('dataUser', function (user) {
			if(!userConnect[user.id]) userConnect[user.id] = {name: user.name, image: user.image, status: user.status}
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