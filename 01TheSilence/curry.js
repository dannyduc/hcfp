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