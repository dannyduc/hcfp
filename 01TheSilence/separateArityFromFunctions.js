var _ = require('ramda');


function curry(fn) {
    return function () {
        if (fn.length > arguments.length) {
            var slice = Array.prototype.slice;
            var args = slice.apply(arguments);
            return function () {
                return fn.apply(
                    null, args.concat(slice.apply(arguments)));
            };
        }
        return fn.apply(null, arguments);
    };
}

function get(property, object) {
    return object[property];
}

var get = curry(get);

var people = [
    {name: 'a'},
    {name: 'b'},
    {name: 'c'}
];

//// args up front
function getPersonName(person) {
    return get('name', person);
}

var names = people.map(getPersonName);
console.log(names);

// more args later
// ** MAGIC! **

var names = people.map(get('name'));
console.log(names);

