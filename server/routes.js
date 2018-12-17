function routes(){
	let express = require('express'),
		app = express(),
		fs = require('fs'),
		path = require("path");

	//app.use(express.static('public'));
	app.get('*', function(req, res) {	
		
		let url = req.url == "/" ? "home" : req.url
			url = url.substring(1, url.lenght)
			url = url.replace('/', '-')

		if (fs.existsSync(path.join(__dirname+'/../public/pages/'+url+'.html'))) {
			res.sendFile(`/pages/${url}.html`, { root: path.join(__dirname, '../public') });
		}else{
			res.sendFile('/pages/error404.html', { root: path.join(__dirname, '../public') });
		}

	})

	app.listen('8080', ()=>{
		console.log("Server listen at port 8080")
	});

}

module.exports.routes = routes;