// til at oprette server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//get request på /
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//når der er en der connector
io.on('connection', function(socket){
    console.log('a user connected');
   //når en disconnector
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

//åbner serveren på port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//på connection, hvor vi får en besked af typen 'chat message'. Her printer den i console
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  });

//Sender beskeden til alle
  io.emit('some event', { for: 'everyone' });

//på connection, hvor vi får en besked af typen 'chat message'. Her sender den tilbage
  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });
