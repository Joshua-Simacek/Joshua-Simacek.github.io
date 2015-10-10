var Class = function (methods) {
    var _class = function () {
        this.initialize.apply(this.arguments);
    };

    for (var property in methods) {
        _class.prototype[property] = methods[property];
    }

    if (!_class.prototype.initialize) {
        _class.prototype.initialize = function () { };
    }

    return _class;
};