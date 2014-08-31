var _Maybe = function(x) {
    this.val = x;
};

var Maybe = function(x) { return new _Maybe(x); };

_Maybe.prototype.map = function(f) {
    return this.val ? Maybe(f(this.val)) : Maybe(this.val);
};

var _ = require('ramda')
    ,map = _.map;

var capitalize = function(s) {
    return [s.substring(0, 1).toUpperCase(), s.substring(1)].join('');
};

var result = map(capitalize, Maybe("flamethrower"));
console.log(result);

result = map(capitalize, Maybe(null));
console.log(result);

var compose = _.compose
    ,first = _.first
    ,match = _.match;

//var firstMatch = compose(first, match(/cat/g));
var firstMatch = compose(map(first), Maybe, match(/cat/g));

result = firstMatch("dogsup");
console.log(result)
