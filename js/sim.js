


//var Simulation = Class({
//    initialize: function () {
//        this.body = [];
//    },

//    zoom: function () {

//    },

//    paint: function () {

//        //var w = canvas.width;
//        //var h = canvas.height;

//        //canvas.translate(w / 2, h / 2);
//        //canvas.scale(scale, scale);
//        //canvas.translate(w / 2, h / 2);

//        body.forEach(function (b) { b.paint(); });
//    },

//    bodyInit: function (option) {

//        body.push(new Body(0, 0, 200000, .002, -.16, "#FFFF00")); // Yellow
//        body.push(new Body(365, 0, 1, 0, 25, "#00FF00"));         // Green
//        body.push(new Body(-150, 0, 600, 0, 20, "#0000FF"));      // Blue
//        body.push(new Body(0, 150, 60, -25, 0, "#FF0000"));       // Orange
//        body.push(new Body(350, 0, 1000, 0, 20, "#FFAA00"));      // Red
//    },

//    bodyMove: function () {
//        var t = .00001;   // timestep
//        var eps = .00001; // so r cannot equal zero
//        var a = 100;      // gravity dampening factor for when r is samll


//        for (var j = 0; j < body.length; j++) {

//            body[j].aX = 0;
//            body[j].aY = 0;

//            for (var i = 0; i < body.length; i++) {

//                if (j !== i) {

//                    var dx = body[j].x - body[i].x;
//                    var dy = body[j].y - body[j].y;

//                    var r = Math.sqrt(dx * dx + dy * dy + eps); //radial distance between bodies

//                    var g = .6 * body[i].m / (r * r + a);

//                    //combine colliding bodies
//                    if (r < body[i].r && body[j].m >= body[i].m) {

//                        body[j].m += body[i].m;
//                        body[j].aX += body[i].aX;
//                        body[j].aY += body[i].aY;
//                        Array.splice(i, 1);
//                        if (j > i) { j--; }
//                        i--;

//                    } else {
//                        //accelerate bodies this frame if they are not colliding
//                        body[j] += -g * dx / r;
//                        body[j] += -g * dy / r;
//                    }
//                }// end if
//            }// end for(i)

//            //update velocity this frame
//            body[j].vX += body[j].aX * t;
//            body[j].vY += body[j].aY * t;

//        }// end for(j)
//    }// end bodyMove()
//});





    bodyPaint = function() {
        body.forEach(function(b) { b.paint(); });
    }


    var body = [];
    bodyInit = function (option) {


        body.push(Body({ x: 0, y: 0, m: 200000, vX: .002, vY: -.16, color: "#FFFF00" })); // Yellow
        body.push(Body({ x: 365, y: 0, m: 1, vX: 0, vY: 25, color: "#00FF00" })); // Green
        body.push(Body({ x: 150, y: 0, m: 600, vX: 0, vY: 20, color: "#0000FF" })); // Blue
        body.push(Body({ x: 0, y: 150, m: 60, vX: -25, vY: 0, color: "#FF0000" })); // Orange
        body.push(Body({ x: 350, y: 0, m: 1000, vX: 0, vY: 20, color: "#FFAA00" })); // Red
    };


    //paint: function () {

    //    //var w = canvas.width;
    //    //var h = canvas.height;

    //    //canvas.translate(w / 2, h / 2);
    //    //canvas.scale(scale, scale);
    //    //canvas.translate(w / 2, h / 2);

    //    //body.forEach(function (b) { b.paint(); });

    //    for (var i = 0; i < body.length; i++) {
    //        body[i].paint();
    //    }
    //},

    bodyMove = function () {
        var t = .00001;   // timestep
        var eps = .00001; // so r cannot equal zero
        var a = 100;      // gravity dampening factor for when r is samll


        for (var j = 0; j < body.length; j++) {

            body[j].aX = 0;
            body[j].aY = 0;

            for (var i = 0; i < body.length; i++) {

                if (j !== i) {

                    var dx = body[j].x - body[i].x;
                    var dy = body[j].y - body[j].y;

                    var r = Math.sqrt(dx * dx + dy * dy + eps); //radial distance between bodies

                    var g = .6 * body[i].m / (r * r + a);

                    //combine colliding bodies
                    //if (r < body[i].r && body[j].m >= body[i].m) {

                    //    body[j].m += body[i].m;
                    //    body[j].aX += body[i].aX;
                    //    body[j].aY += body[i].aY;
                    //    Array.splice(i, 1);
                    //    if (j > i) { j--; }
                    //    i--;

                    //} else {
                        //accelerate bodies this frame if they are not colliding
                        body[j] += -g * dx / r;
                        body[j] += -g * dy / r;
                    //}
                }// end if
            }// end for(i)

            //update velocity this frame
            body[j].vX += body[j].aX * t;
            body[j].vY += body[j].aY * t;

        }// end for(j)
    }// end bodyMove()
