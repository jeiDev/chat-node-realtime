function socket() {
	const io = require("socket.io")(http);
     
    io.on('conecction', function(socket){
        console.log("User connected")
    })
}

module.exports.socket = socket;