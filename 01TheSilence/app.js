var _ = require('ramda');

// implement map using reduce
var newmap = _.curry(function (f, list) {
    var concatList = function (acc, elt) {
        return acc.concat(f(elt));
    };

    return _.reduce(concatList, [], list);
});

var result = newmap(_.add(3), [1, 2, 3]);
console.log(result);

console.log(_.reduce(_.add, 0)([1, 2, 3]));