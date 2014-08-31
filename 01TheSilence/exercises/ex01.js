/********************************************************
 T E S T I N G :  M E S S Y  V S  C L E A N
 ********************************************************/

//////////////////////// MESSY //////////////////////////
// If we want to test a messy function like daysThisMonth
// we have to know how it is implemented and ovveride or
// "mock" the responses of its environment.

var realDate = Date;
var Date = function() {
    if(arguments.length === 0) {
        return new realDate(1929, 10-1, 24);
    } else {
        return new realDate(arguments[0], arguments[1], arguments[2]);
    }
};

assertEqual( daysThisMonth(), 31 );
Date = realDate;

//////////////////////// CLEAN //////////////////////////
// Gross, isn't it? We want to test a function's
// interface, not its implementation. It is much easier
// to test daysInMonth(). Pick a month and write the
// test. (Thirty days hath September, April, June and
// November...)

assertEqual( daysInMonth(1929, 10), 31 );


console.log("All tests pass.");

/********************************************************
 B A C K G R O U N D  C O D E
 ********************************************************/

function daysThisMonth() {
    var date  = new Date(),
        y     = date.getFullYear(),
        m     = date.getMonth(),
        start = new Date(y, m, 1),
        end   = new Date(y, m + 1, 1);
    return (end - start) / (1000 * 60 * 60 * 24);
}

function daysInMonth(y, m) {
    var start = new Date(y, m - 1, 1),
        end   = new Date(y, m, 1);
    return (end - start) / (1000 * 60 * 60 * 24);
}

function assertEqual(x,y, msg) {
    if(x != y) throw("expected "+x+" to equal "+y);
}