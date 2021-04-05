var express = require('express');
var app = express();
var server = app.listen(2000);
var players = 0;
var arenaData;

function setArenaData(env_data){
  arenaData=env_data;
}

app.use(express.static('public'));
console.log("server is running");


var socket=require('socket.io');
var io=socket(server);
io.on('connection',newConnection);

function newConnection(socket) {
    console.log(socket.id);
    players++;
    
    // if(players==1){
    //     socket.emit('create_arena');
    // }

    // else{
    //     socket.emit('set_data',arenaData);
    // }
    socket.emit('number_of_players', players);
    socket.broadcast.emit('updated_player_legth', players);

    socket.on('player_data', playerdata);
    socket.on('shoot',Shoot);
    socket.on('arena_data',setArenaData);

    function Shoot(shoot_data){
        socket.broadcast.emit('shoot',shoot_data);
        //console.log(shoot_data);
    }

    function playerdata(all_data) {
        socket.broadcast.emit('player_data', all_data);
        //console.log(all_data);
    }

    
}