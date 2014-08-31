var _ = require('ramda');

function curry(fn) {
    return function() {
        if (fn.length > arguments.length) {
            var slice = Array.prototype.slice;
            var args = slice.apply(arguments);
            return function() {
                fn.apply(null, args.concat(slice.apply(arguments)));
            };
        }
        return fn.apply(null, arguments);
    };
}

var split = _.split;

//var words = function(str) {
//    return split(' ', str);
//};

var words = split(' ');

console.log(words("Jingle bells Batman smells"));

var greater = function(x, y) { return x > y ? x : y };
var reduce = _.reduce;

//var max = function(xs) {
//    return reduce(greater, -Infinity, xs);
//};
var max = reduce(greater, -Infinity);

console.log(max([323, 523, 554, 123, 5234]));