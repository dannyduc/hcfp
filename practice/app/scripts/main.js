require.config({
    paths: {
        "jquery": "vendor/jquery/dist/jquery.min",
        "pointfree": "vendor/pointfree/dist/pointfree.amd",
        "bacon": "vendor/bacon/dist/Bacon.min",
        "ramda": "ramda",
        "either": "data.either.umd",
        "io": "io",
        "future": "data.future.umd"
    }
});

require(['jquery', 'app'], function($, app) {
    $(app);
});