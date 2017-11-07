var exp = require('express');
var app = exp();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(exp.static('client/'));

app.get('/' , function(req , res){
	res.sendFile('index.html' , {root: "client/"});
});


http.listen(3000 , function(){
	console.log("Started WeOne server at port 3000");
});

io.on('connection' , function(socket){
	console.log("Ammu/Appu is connected !");
	
	socket.on('appu messaged' , function(msg){
		console.log("Message : "+msg);
		io.emit('ammu received' , msg);
	});
	
	socket.on('disconnect' , function(){
		console.log('User disconnected !');
	});
});