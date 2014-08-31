var _ = require("ramda");

// secret input: time
function daysThisMonth() {
    var date = new Date()
        , y = date.getFullYear()
        , m = date.getMonth()
        , start = new Date(y, m, 1)
        , end = new Date(y, m + 1, 1);
    return (end - start) / (1000 * 60 * 60 * 24);
}

console.log(daysThisMonth());

// always works the same
function daysInMonth(y, m) {
    var start = new Date(y, m - 1, 1)
        , end = new Date(y, m, 1);
    return (end - start) / (1000 * 60 * 60 * 24);
}

console.log(daysInMonth(2014, 8));