var _ = require('ramda');

function compose(g, f) {
    return function(x) {
        return g(f(x));
    }
}

var toUpper = function(s) {
    return s.toUpperCase();
};

var arrayByDashes = _.split("-");
var firstChar = _.substring(0, 1);

var firstUpper = compose(toUpper, firstChar);

var getFirstUpperOfDashes = compose(_.map(firstUpper), arrayByDashes);

var inefficientHead = compose(_.head, _.take(2));

var app = compose(inefficientHead, getFirstUpperOfDashes);

var result = app("what-the-hell");
console.log(result);