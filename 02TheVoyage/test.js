var _ = require('ramda');

var _Container = function(val) {
    this.val = val;
};

var Container = function(x) { return new _Container(x) };

_Container.prototype.map = function(f) {
    return Container(f(this.val));
};

var c = Container(3);
console.log(c);

var double = function (x) {
    return 2 * x;
};
var dc = c.map(double);
console.log(dc);

function capitalize(s) {
    return [s.substr(0, 1).toUpperCase(),
            s.substring(1)].join('');
}

//var upper = Container("flamethrower").map(function(s){ return capitalize(s); });
var upper = Container("flamethrower").map(capitalize);

console.log(upper);

var add = function(a, b) {
    return a + b;
};
add = _.curry(add);

var added = Container(3).map(add(1));
console.log(added);

var result = Container([1, 2, 3]).map(_.reverse).map(_.first);
console.log(result);

var length = _.size;

result = Container("flamethrower").map(length).map(add(1));
console.log(result);


var map = _.curry(function(f, obj) {
    return obj.map(f);
});

console.log(Container(3).map(add(1)));
console.log(map(add(1), Container(3)));

var match = _.match
    ,first = _.first
    ,reverse = _.reverse
    ,compose = _.compose;

result = map(match(/cat/g), Container("catsup"));
console.log(result);

result = map(compose(first, reverse), Container("dog"));
console.log(result);