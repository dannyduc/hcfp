# App template

##Setup
	mkdir -p app/scripts/vendor
	touch app/index.html
	touch app/.bowerrc
	touch app/bower.json
	touch app/scripts/main.js
	touch app/scripts/app.js
	
###.bowerrc
	{
		"directory": "scripts/vendor"
	}
	
###bower.json
	{
	    "name": "app",
    	"version": "0.0.0",
    	"dependencies": {
        	"requirejs": "latest",
        	"jquery": "2.1.0"
    	},
    	"ignore": [
        	"**/.*",
        	"node_modules",
        	"bower_components",
        	"test"
    	]
	}

###index.html
	<script data-main="scripts/main.js" src="scripts/vendor/requirejs/require.js"></script>
	
###main.js
	require.config({
		paths: {
			"jquery": "vendor/jquery/dist/jquery.min"
    	}
	});

	require(['jquery', 'app'], function($, app) {
    	$(app);
	});

###app.js	
	define(['jquery'], function($) {
	    console.log($)
	});
	
###Install
	cd app
	bower install
	
###Run
	server	
	