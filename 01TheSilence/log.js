var _ = require('ramda');

var get = function(name, object) {
    return object[name];
};

get = _.curry(get);

var articles = [
    {
        title: 'Everything Sucks',
        url: 'http://do.wn/sucks.html',
        author: {
            name: 'Debbie Downer',
            email: 'debbie@do.wn'
        }
    },
    {
        title: 'If You Please',
        url: 'http://www.geocities.com/milq',
        author: {
            name: 'Caspar Milquetoast',
            email: 'hello@me.com'
        }
    }
];

var log = function(x) { console.log(x); return x; };

var firstTitle = _.compose(get('title'), log, _.head);
var firstLetter = _.compose(_.head, firstTitle);

console.log(firstLetter(articles));

