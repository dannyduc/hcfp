var _ = require('ramda');

var _Container = function(val) {
    this.val = val;
};

var Container = function(x) { return new _Container(x) };

_Container.prototype.map = function(f) {
    return Container(f(this.val));
};

var map = _.curry(function(f, obj) {
    return obj.map(f);
});


function capitalize(s) {
    return [s.substr(0, 1).toUpperCase(),
        s.substring(1)].join('');
}

Container("flamethrower").map(capitalize);
//=> Container("Flamethrower")

map(capitalize, Container("flamethrower"));
//=> Container("Flamethrower")
