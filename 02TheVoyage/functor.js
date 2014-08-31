// an object or data structure you can map over
// functions: map

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

console.log(
    map(_.add(1), Container(2))
);
