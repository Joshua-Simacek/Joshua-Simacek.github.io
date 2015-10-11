

var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 720;

var canvasElement = $("<canvas width = '" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "' ></canvas>");
//var canvasElement = $("<canvas width = '" + window.innerWidth + "' height='" + window.innerHeight + "' ></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo("#canvasHolder");

//var fps = 999;
//setInterval(function () {
//    bodyInit();
//    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//    bodyPaint();
//    bodyMove(.1);
//    //debugUpdate();
//    //body.forEach(function(b) { b.paint(); });
//    //console.log("loop");
//}, 1000 /fps);




function loop() {
    var timeStep = $('#timeStep').val();
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    if (running) {
        canvas.clearRect(0, 0, canvas.width, canvas.height);
        bodyPaint();
        bodyMove(timeStep);
        debugUpdate();
    }
window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);



$(function () {
    bodyInit();
    running = true;
});

var init = false;
function resetSim() {
    body = [];
    init = false;
    running = false;
    var preset = $('#presets').val();
    canvas.clearRect(0, 0, canvas.width, canvas.height);
    bodyInit(preset);
    bodyPaint();
    $('#Debug').html("");
    $('#pauseButton').html("start");
}
var running = true;
function toggleRun() {
    running = !running;
}

function Body(b) {
    b.aX = 0;            // acceleration in x direction
    b.aY = 0;            // acceleration in y direction
    b.rC = .225;         // radius constant controles the rate at which the radius grows in proportion to mass
    b.r = 0;

    b.paint = function () {
        this.r = Math.pow(this.m, this.rC); // update the size of the object if the mass has changed

        var oX = canvas.width / 2;
        var oY = canvas.height / 2;
        var cX = this.x + oX;
        var cY = oY - this.y;

        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.arc(cX, cY, this.r, 0, 2 * Math.PI);
        canvas.fill();
        canvas.closePath();
    };

    b.contains = function (pX, pY) {
        var d = Math.sqrt(((this.x - pX) * (this.x - pX)) + ((this.y - pY) * (this.y - pY)));
        this.r = Math.pow(this.m, this.rC);
        return !(d > r);
    };

    return b;
}

bodyPaint = function () {
    var n = body.length;
    for (var i = 0; i < n; i++) {
        body[i].paint();
    }
    //body.forEach(function (b) { b.paint(); });
}

var body = [];
bodyInit = function (option) {
    
    if (!init) {

        init = true;

        switch(option) {
            case "_default":
                _default();
                break;
            case "fourStarBallet":
                fourStarBallet();
                break;
            case "binaryStars":
                binaryStars();
                break;
            case "binaryStarSystem":
                binaryStarSystem();
                break;
            case "solarSystem":
                solarySystem();
                break;
            default:
                _default();
        }

        var i = 0;
        body.forEach(function(b) {
            $("#Debug").append(
                '<ul>' +
                '<li id="' + i + '_body" style="color: '+ b.color + '"> Body: ' + i + '</li>' +
                '<li id="' + i + '_m"> _m: ' + b.m + '</li>' +
                '<li id="' + i + '_r"> _r: ' + b.r + '</li>' +
                '<li id="' + i + '_x"> _x: ' + b.x + '</li>' +
                '<li id="' + i + '_y"> _y: ' + b.y + '</li>' +
                '<li id="' + i + '_vX"> vX: ' + b.vX + '</li>' +
                '<li id="' + i + '_vY"> vY: ' + b.vY + '</li>' +
                '<li id="' + i + '_aX"> aX: ' + b.aX + '</li>' +
                '<li id="' + i + '_aY"> aY: ' + b.aY + '</li>' +
                '</ul>');
            i++;
        });
    }
};

bodyMove = function (t) {
    //var t = .1;   // timestep
    var eps = .00001; // so r cannot equal zero
    var a = 100;      // gravity dampening factor for when r is samll

    var n = body.length;

    for (var j = 0; j < n; j++) {

        body[j].aX = 0;
        body[j].aY = 0;

        for (var i = 0; i < n; i++) {

            if (j !== i) {

                var dx = body[j].x - body[i].x;
                var dy = body[j].y - body[i].y;

                var r = Math.sqrt((dx * dx) + (dy * dy) + eps); //radial distance between bodies

                var g = .6 * body[i].m / (r * r + a);

                //combine colliding bodies
                if (r < (body[i].r*1) && body[j].m >= body[i].m) {

                    body[j].m += body[i].m;
                    body[j].aX += body[i].aX;
                    body[j].aY += body[i].aY;
                    body.splice(i, 1);
                    if (j > i) { j--; }
                    i--;
                    n--;

                } else {
                //accelerate bodies this frame if they are not colliding
                body[j].aX += -g * dx / r;
                body[j].aY += -g * dy / r;
                }
            }// end if
        }// end for(i)

        //update velocity this frame
        body[j].vX += body[j].aX * t;
        body[j].vY += body[j].aY * t;

        //udpate x,y location this frame
        body[j].x = body[j].x + body[j].vX * t;
        body[j].y = body[j].y + body[j].vY * t;

    }// end for(j)
}// end bodyMove()

debugUpdate = function () {
    var i = 0;
    body.forEach(function (b) {
        $('#' + i + '_body').css("color",b.color);
        $('#' + i + '_m').text(' _m: ' + b.m);
        $('#' + i + '_r').text(' _r: ' + b.r);
        $('#' + i + '_x').text(' _x: ' + b.x);
        $('#' + i + '_y').text(' _y: ' + b.y);
        $('#' + i + '_vX').text(' vX: ' + b.vX);
        $('#' + i + '_vY').text(' vY: ' + b.vY);
        $('#' + i + '_aX').text(' aX: ' + b.aX);
        $('#' + i + '_aY').text(' aY: ' + b.aY);
        i++;
    });
}

//Presets
_default = function () {
    body = [];

    body.push(Body({ x: 0, y: 0, m: 200000, vX: .002, vY: -.16, color: "#FFFF00" })); // Yellow
    body.push(Body({ x: 365, y: 0, m: 1, vX: 0, vY: 25, color: "#00FF00" }));         // Green
    body.push(Body({ x: -150, y: 0, m: 600, vX: 0, vY: 20, color: "#0000FF" }));      // Blue
    body.push(Body({ x: 0, y: 150, m: 60, vX: -25, vY: 0, color: "#FF0000" }));       // Red
    body.push(Body({ x: 350, y: 0, m: 1000, vX: 0, vY: 20, color: "#FFAA00" }));      // Orange
}

fourStarBallet = function() {
    body = [];

    body.push(Body({ x:150 , y:0 ,  m: 200000, vX: 0, vY:15, color: "#00ff00" }));
    body.push(Body({ x: 0, y: 150,  m: 200000, vX: -15, vY: 0, color: "#ff0000" }));
    body.push(Body({ x: -150, y: 0, m: 200000, vX: 0, vY: -15, color: "#0000ff" }));
    body.push(Body({ x: 0, y: -150, m: 200000, vX: 15, vY: 0, color: "#ffff00" }));
}

binaryStars = function() {
    body = [];

    body.push(Body({ x: 100, y: 0, m: 200000, vX: 0, vY: 15, color: "#00ff00" }));
    body.push(Body({ x: -100, y: 0, m: 200000, vX: 0, vY: -15, color: "#ffff00" }));
}

binaryStarSystem =function() {
    body = [];

    body.push(Body({ x: 50, y: 0, m: 200000, vX: 0, vY: 20, color: "#00ff00" }));
    body.push(Body({ x: -50, y: 0, m: 200000, vX: 0, vY: -20, color: "#ffff00" }));
    body.push(Body({ x: 300, y: 0, m: 600, vX: 0, vY: 30, color: "#0000ff" }));
    body.push(Body({ x: 290, y: 0, m: 1, vX: 0, vY: 33, color: "#ffffff" }));
    body.push(Body({ x: 450, y: 0, m: 1000, vX: 0, vY: 25, color: "#ffaa00" }));
    body.push(Body({ x: 460, y: 0, m: 5, vX: 0, vY: 30, color: "#ff0000" }));
}

solarySystem = function() {
    body = [];

    var name = ["Sun", "Mercury", "Venus", "Earth", "Mars",
         "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

    var E = 65;
    var mass = [
        33295*E,  //sun mass
        0.0058*E, //mercury mass
        0.815*E,  //venus mass
        1*E,      //earth mass
        0.107*E,  //mars mass
        318*E,    //jupiter mass
        95.1*E,   //saturn mass
        14.5*E,   //uranus mass
        17.2*E,   //neptune mass
        0.01*E    //pluto mass
    ];

    var distance = [0, 57.9, 108, 150, 228, 778, 1430, 2870, 4500, 5900];
    var velocity = [0, 172.7, 126.3, 107.4, 87, 47.2, 34.8, 24.5, 19.6, 17.1];

    var colors = ["#ffff00", "#333333", "#00FF00", "#0000ff", "#ff0000", "ffaa00", "#ffffff", "#00ff00", "#00ffff", "#ffaa00"];

    var n = name.length;

    for (var j = 0; j < n; j++) {
        body.push(Body({ x: distance[j], y: 0, m: mass[j], vX: 0, vY: velocity[j], color: colors[j], rC: .3 }));
    }
}