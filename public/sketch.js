let enviornment;
let Players = [];
let size;
var socket;
let player;

function setup() {
    socket = io.connect(window.location.hostname);

    createCanvas(windowWidth, windowHeight);
    size = 1;
    
    // socket.on('create_arena',createArena);
    // socket.on('set_data',Setdata);

   enviornment=new Enviornment();
    // camera.on(); frameRate(3);
    socket.on('number_of_players', Spawn1);
    socket.on('updated_player_legth', Spawn);
    socket.on('player_data', RestUpdate);
    socket.on('shoot', player_shoot);
    player = new Player(enviornment);
    textAlign(CENTER);
}
function createArena(){
    enviornment = new Enviornment();
    var env_data=JSON.stringify(enviornment);
    socket.emit('arena_data',env_data);
}

function Setdata(arenaData){
    enviornment=JSON.parse(arenaData);
}

function Spawn1(players) {
    player.id = players;
    console.log(player.id);
    for (let i = 0; i < players - 1; i++) {
        Players[i] = new Player(enviornment);
        Players[i].id = i + 1;
    }
    // console.log(players); console.log(Players.length);
}

function Spawn(players) {
    Players.push(new Player(enviornment));
    Players[Players.length - 1].id = players;
    //console.log(Players.length);
}

function draw() {

    background(0);
    enviornment.update();
    update();

    //console.log(frameRate());
    collision();
    drawSprites();

}

function collision() {

    player.collison(enviornment.env_collider);
}

function mouseDragged() {}

function mousePressed() {

    player.shoot(camera.mouseX, camera.mouseY, camera.position.x, camera.position.y);
    var shoot_data = {
        mouse_x: camera.mouseX,
        mouse_y: camera.mouseY,
        camera_x: camera.position.x,
        camera_y: camera.position.y,
        Player_id: player.id
    }
    socket.emit('shoot', shoot_data);

}

function player_shoot(shoot_data) {
    for (let i = 0; i < Players.length; i++) {
        if (Players[i].id === shoot_data.Player_id) {
            Players[i].shoot(shoot_data.mouse_x, shoot_data.mouse_y, shoot_data.camera_x, shoot_data.camera_y);
        }
    }
}

function update() {

    cursor(CROSS);
    camera.zoom = 2;
    camera.position.x = player.x;
    camera.position.y = player.y;
    player.update();
    fill(255);
    text('Player: ' + player.id, player.x, player.y - 60);
    var all_data = {

        Player_x: player.sprite.position.x,
        Player_y: player.sprite.position.y,
        Player_id: player.id
    }
    for (let i = 0; i < Players.length; i++) {
        fill(255, 0, 0);
        text('Player: ' + Players[i].id, Players[i].sprite.position.x, Players[i].sprite.position.y - 60);
    }


    socket.emit('player_data', all_data);
}

function RestUpdate(all_data) {
    for (let i = 0; i < Players.length; i++) {
        if (Players[i].id === all_data.Player_id) {
            Players[i].sprite.position.x = all_data.Player_x;
            Players[i].sprite.position.y = all_data.Player_y;
            //console.log(Players[i].id);
            Players[i].update();


        }
    }
}