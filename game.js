var CANVAS_WIDTH = "1280";
var CANVAS_HEIGHT = "720";

var canvas = document.getElementById("canvas").getContext("2d");



var fps = 30;
setInterval(function () {
    update();
    draw();
}, 1000 / fps);

var vX = 0;
var vY = 0;

var left = false;
var right = false;
var up = false;
var down = false;
var shooting = false;
var projectileDirection = "up";

$(document).keydown(function (e) {

    $('#KeyCodeLabel').text(e.keyCode);

    if (e.keyCode == 32 && e.target == document.body) {
        //body.expel();

        e.preventDefault();
    }
    if (e.keyCode == 16) {
        shooting = true;
    }

    switch (e.which) {

        case 37: // left
            vX = -1;
            left = true;
            break;

        case 38: // up
            vY = -1;
            up = true;
            break;

        case 39: // right
            vX = 1;
            right = true;
            break;

        case 40: // down
            vY = 1;
            down = true;
            break;

        case 87: //w
            projectileDirection = "up";
            break;

        case 68: //d
            projectileDirection = "right";
            break;

        case 83: //s
            projectileDirection = "down";
            break;

        case 65: //a
            projectileDirection = "left";
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).keyup(function (e) {

    if (e.keyCode === 16) {
        shooting = false;
    }

    switch (e.which) {
        case 37: // left
            if (right === false) {
                vX = 0;
            } else {
                vX = 1;
            }
            left = false;
            break;

        case 38: // up
            if (down === false) {
                vY = 0;
            } else {
                vY = 1;
            }

            up = false;
            break;

        case 39: // right
            if (left === false) {
                vX = 0;
            } else {
                vX = -1;
            }

            right = false;
            break;

        case 40: // down
            if (up === false) {
                vY = 0;
            } else {
                vY = -1;
            }

            down = false;
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

function update() {
    handleCollisions();

    body.x += 5 * vX;
    body.y += 5 * vY;

    if (shooting) {
        body.expel();
    }

    projectiles.forEach(function (i) {
        i.update();
    });

    enemies.forEach(function (i) {
        i.update();
    });

    enemies = enemies.filter(function (enemy) {
        return enemy.active;
    });

    if (Math.random() < 0.1) {
        enemies.push(enemy());
    };

    projectiles = projectiles.filter(function (i) {
        return i.active;
    });


}

function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    body.draw();
    projectiles.forEach(function (i) {
        i.draw();
    });
    enemies.forEach(function (i) {
        i.draw();
    })
}

var projectiles = [];

function projectile(i) {
    i.active = true;

    i.vX = 0;
    i.vY = 0;
    i.size = 3;
    i.color = "#aa0000";

    i.inBounds = function () {
        return i.x >= 0 && i.x <= CANVAS_WIDTH && i.y >= 0 && i.y <= CANVAS_HEIGHT;
    };

    i.draw = function () {
        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        canvas.fill();
        canvas.closePath();
    }

    i.update = function () {
        switch (i.direction) {
            case "left":
                i.vX = -i.speed;
                break;
            case "right":
                i.vX = i.speed;
                break;
            case "down":
                i.vY = i.speed;
                break;
            case "up":
                i.vY = -i.speed;
        }
        i.x += i.vX;
        i.y += i.vY;

        i.active = i.active && i.inBounds();
    }

    return i;
}

var enemies = [];

function enemy(i) {
    i = i || {};

    i.active = true;
    i.age = Math.floor(Math.random() * 128);

    i.color = "#0000aa";

    i.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
    i.y = 0;
    i.vX = 0;
    i.vY = 2;

    i.size = 20;

    i.inBounds = function () {
        return i.x >= 0 && i.x <= CANVAS_WIDTH && i.y >= 0 && i.y <= CANVAS_HEIGHT;
    };

    i.update = function () {
        i.x += i.vX;
        i.y += i.vY;

        i.vX = 3 * Math.sin(i.age * Math.PI / 64);

        i.age++;

    };

    i.draw = function () {
        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        canvas.fill();
        canvas.closePath();

        i.active = i.active && i.inBounds();


    };

    i.die = function () {
        i.active = false;
        //events
    }
    return i;
}

function collision(a, b) {

    return a.x < b.x + b.size &&
           a.x + a.size > b.x &&
           a.y < b.y + b.size &&
           a.y + a.size > b.y;
}

function handleCollisions() {
    projectiles.forEach(function (projectile) {
        enemies.forEach(function (enemy) {
            if (collision(projectile, enemy)) {
                enemy.die();
                projectile.active = false;
                console.log("collision");
            }
        });
    });


}

var body = {
    color: "#00aa00",
    x: 0,
    y: 0,
    draw: function () {
        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.arc(this.x, this.y, 25, 0, 2 * Math.PI);
        canvas.fill();
        canvas.closePath();
    },
    expel: function () {

        projectiles.push(projectile({
            direction: projectileDirection,
            speed: 7,
            x: this.x,
            y: this.y
        }))
    },

    die: function () {
        this.active = false;
    }
}