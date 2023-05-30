const Timer = require('./client/src/classes/Timer.js');
const server = require('express')(); 
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const timer = new Timer();
// Requirements

var players = {};
/*
Object that will store all connections to the server (players)
Whether it needs to be replaced with Firebase may be a different story
*/
timer.start()

io.on('connection', function (socket) { // on connect event
    console.log('A user connected: ' + socket.id);


    players[socket.id] = {
        playerId : socket.id,
        x : 300,
        y : 300
        // create player entry in dictionary
    };

    //console.log(Object.keys(players).length);



    socket.emit('currentPlayers', players);
    // sends event to all existing players, about a new player

    socket.broadcast.emit('newPlayer', players[socket.id]); 
    // sends an event to the newPlayer, loads current sprites
   

    socket.on("stevensuckmedaddy", function(){
        console.log("Hello World");
    })

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        
        delete players[socket.id];

        io.emit('left', socket.id);
        // remove player data and emit that they have left the game
    });

    socket.on('heDothMoveth', function(movementData){
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });



});

http.listen(3000, function () {
    console.log('Server started!');
});



