

var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 720;

var canvasElement = $("<canvas width = '" + window.innerWidth + "' height='" + window.innerHeight + "' ></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo("body");
//var body = [];

//bodyPaint();
//running loop
var fps = 999;
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.clearRect(0, 0, canvas.width, canvas.height);
    bodyInit();
    bodyPaint();
    bodyMove(timeStep);
    debugUpdate();
window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

var init = false;
function resetSim() {
    body = [];
    init = false;
    $('#Debug').html("");
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
        body.push(Body({ x: 0, y: 0, m: 200000, vX: .002, vY: -.16, color: "#FFFF00" })); // Yellow
        body.push(Body({ x: 365, y: 0, m: 1, vX: 0, vY: 25, color: "#00FF00" })); // Green
        body.push(Body({ x: -150, y: 0, m: 600, vX: 0, vY: 20, color: "#0000FF" })); // Blue
        body.push(Body({ x: 0, y: 150, m: 60, vX: -25, vY: 0, color: "#FF0000" })); // Red
        body.push(Body({ x: 350, y: 0, m: 1000, vX: 0, vY: 20, color: "#FFAA00" })); // Orange
        init = true;
        var i = 0;
        body.forEach(function(b) {
            $("#Debug").append('' +
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
                if (r < (body[i].r*2) && body[j].m >= body[i].m) {

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