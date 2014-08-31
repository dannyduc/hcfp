define(['jquery', 'ramda', 'pointfree', 'either', 'io', 'bacon', 'future', 'maybe'], function($, _, P, either, io, bacon, Future, Maybe) {

    io.extendFn();

    var compose = P.compose;
    var map = P.map;
    var Right = either.Right;
    var Left = either.Left;
    var IO = io.IO;
    var runIO = io.runIO;

    io.extendFn();

    var add = _.add;
    var capitalize = function(s) {
      return s[0].toUpperCase() + s.slice(1);
    };
    var first = _.first;
    var match = _.match;
    var concat = _.concat;
    var get = _.get;

// Container/Identity

    var _Container = function(val) {
        this.val = val;
    };

    var Container = function(x) { return new _Container(x); };

    Container(3);
    //=> _Container {val: 3}

// Functor: an object or data structure you can map over, has map prototype

    _Container.prototype.map = function(f) {
        return Container(f(this.val));
    };

//    var map = _.curry(function(f, obj) {
//        return obj.map(f);
//    })

    map(add(1), Container(3));
    //=> _Container {val: 4}

// Maybe

    //var _Maybe = function(val) { this.val = val; };
    //var Maybe = function(x) { return new _Maybe(x); };
    //_Maybe.prototype.map = function(f) {
    //    return this.val ? Maybe(f(this.val)) : Maybe(null);
    //};

    map(capitalize, Maybe("flamethrower"));
    //=> Maybe("Flamethrower");

    map(capitalize, Maybe(null));
    //=> Maybe(null);

    var firstMatch = compose(map(first), Maybe, match(/cat/g))
    firstMatch("dogsup");
    //=> Maybe(null);

// Either

    var determineAge = function(user) {
        return user.age ? Right(user.age) : Left("couldn't get age");
    };

    var yearOlder = compose(map(add(1)), determineAge);

    yearOlder({age: 22});
    //=> Right(23)

    yearOlder({age: null});
    //=> Left("couldn't get age")

// IO: a lazy computation "builder"

    var email_io = IO(function() { return $("#email").val() });
    var msg_io = map(concat("welcome "), email_io);

    runIO(msg_io);
    //=> "welcome steve@foodie.net"

    var Store = {
        get: function(x) { return localStorage[x]; }.toIO()
    };

    localStorage.preferences = JSON.stringify({"background-color": "#efefef"});

    var log = function(x) {
        console.log(x);
        return x;
    };

    var getBgColor = compose(get("background-color"), JSON.parse);
    var bgPref = compose(map(getBgColor), Store.get);

    var app = bgPref('preferences');
    //=> IO()

    runIO(app);

// EventStream

    var getElementQuery = function(e) {
        var elt = e.target;
        var q = elt.id ? ('#' + elt.id) : elt.nodeName;
        return q;
    };

    var id_s = map(getElementQuery, bacon.fromEventTarget(document, 'click'));
    //=> EventStream(String)

    var getElement = function(q) {
        return document.querySelector(q);
    };

    var element_s = map(getElement, id_s);

//    id_s.onValue(function(id) { console.log(id)});
    element_s.onValue(function(el) { console.log('The inner html is ' + el.innerHTML) });

// Future: has an eventual value, similar to promise, but it's "lazy"

    function getPost(id) {
        return new Future(function(rej, res) {
            setTimeout(function() {
                res({id: id, title: 'Love them futures'});
            }, 300)
        });
    }

    var getTitle = compose(map(_.get('title')), getPost);

    getTitle(3).fork(log, function(t){
        console.log(t)
    });

// Pointed Functors: of :: a -> F a

// Monads: Pointed Functor + mjoin|mchain
// mjoin :: M M a -> M a
// chain :: (a -> M b) -> M a -> M b

    //var chain = function(f) {
    //    return compose(mjoin, map(f));
    //};

    //var mjoin = chain(id);

    //mjoin(Container(Container(2)));
    //=> Container(2)

    //var sendToServer = httpGet('/upload');

    //var uploadFromFile = compose(mjoin, map(sendToServer), mjoin, map(readFile), askUser);
    //var uploadFromFile = compose(chain(sendToServer), chain(readFile), askUser);

    //uploadFromFile("what file?").fork(logErr, alertSuccess)


// Lens or Monads Transformer

// Applicative Functor: Pointed Functor + ap

    //Container.of(f).app(Container(x))
    //=> Container(f(x)

    Maybe.of(add).ap(Maybe(1)).ap(Maybe(3));
    //=> Maybe(4);

// Monoids: "Combination/Accumulation" functions: empty, concat, mconcat

    var _Sum = function(v) { this.val = x; };
    var Sum = function(x) { return new _Sum(x); };
    _Sum.prototype.concat = function(s2) {
        return Sum(this.val + s2.val);
    };
    _Sum.prototype.empty = function() { return Sum(0); };

    Sum(2).concat(Sum(3)).concat(Sum(5));
    //=> Sum(10)

    //mconcat([Sum(2), Sum(3), Sum(5)]);
    //=> Sum(10)
});