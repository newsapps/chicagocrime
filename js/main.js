// Configure RequireJS and initialize application

// RequireJS aliases. These let us import libraries with filenames like
// `jquery-1.8.3.min.js` as `jquery`.
console.log('CHICAGO CRIME [js/main.js]: Set up RequireJS paths and shims.');
require.config({
    paths: {
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone',
        bootstrap: '../lib/bootstrap-2.3.1/js/bootstrap.min',
        d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.0.8/d3',
        docs: '../docs',
        highlight: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/7.3/highlight.min',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery',
        json: '../lib/json',
        pagedown: '//cdnjs.cloudflare.com/ajax/libs/pagedown/1.0/Markdown.Converter',
        moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment',
        spin: '//cdnjs.cloudflare.com/ajax/libs/spin.js/1.2.7/spin.min',
        templates: '../templates',
        text: '../lib/text',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore',
        async: '../lib/async'
    },
    shim: {
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        highlight: {
            exports: 'hljs',
        },
        pagedown: {
            exports: 'Markdown'
        },
        spin: {
            exports: 'Spinner'
        },
        underscore: {
            exports: '_'
        }
    }
});

// Load our application. First, require it. Then, call initialize.
require([ 'app' ], function(App){
    console.log('CHICAGO CRIME [js/main.js]: RequireJS configured, calling application initialize.');
    App.initialize();
});
