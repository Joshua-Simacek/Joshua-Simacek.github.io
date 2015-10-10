

//var Body = Class({
//    initialize: function(x, y, m, vX, vY, color) {
//        this.x = x;                // x loc
//        this.y = y;                // y loc
//        this.m = m;                // mass
//        this.vX = vX;              // velocity in x direction
//        this.vY = vY;              // velocity in y direction
//        this.color = color;
//        this.aX = null;            // acceleration in x direction
//        this.aY = null;            // acceleration in y direction
//        this.rC = .225;            // radius constant controes the rate at which the radius grows in proportion to mass
//        this.r = Math.pow(this.m, this.rC);  // radus set proportial to mass
//    },

//    paint: function () {
//        this.r = Math.pow(m, rC); // update the size of the object if the mass has changed
//        canvas.beginPath();
//        canvas.fillStyle = this.color;
//        canvas.arc(this.x, this.y, this, r, 0, 2 * Math.PI);
//        canvas.fill();
//        canvas.closePath();
//    },

//    contains: function(pX, pY) {
//        var d = Math.sqrt(((this.x - pX) * (this.x - pX)) + ((this.y - pY) * (this.y - pY)));
//        return !(d > r);
//    }
//});
function Body(b) {
    b.aX = 0;            // acceleration in x direction
    b.aY = 0;            // acceleration in y direction
    b.rC = .225;            // radius constant controles the rate at which the radius grows in proportion to mass
    b.r = 30;

    b.paint = function() {
        this.r = Math.pow(this.m, this.rC); // update the size of the object if the mass has changed
        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        canvas.fill();
        canvas.closePath();
    };

    b.contains = function(pX, pY) {
        var d = Math.sqrt(((this.x - pX) * (this.x - pX)) + ((this.y - pY) * (this.y - pY)));
        this.r = Math.pow(this.m, this.rC);
        return !(d > r);
    };

    return b;
}
