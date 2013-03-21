define([ 'jquery', 'underscore', 'backbone', 'router', 'views/NavView', 'text!templates/home.jst' ], function($, _, Backbone, Router, NavView, HomeTemplate) {
    // Add a "fetch" event to signal start of collection AJAX call.
    var fetch = Backbone.Collection.prototype.fetch;
    Backbone.Collection.prototype.fetch = function(options) {
        this.trigger("fetch");
        return fetch.call(this, options);
    };

    // Initialize
    var initialize = function() {
        console.log('CHICAGO CRIME [js/app.js]: Application initializing.');

        // Load routers
        console.log('CHICAGO CRIME [js/app.js]: Initialize router');
        var router = new Router(); 

        // Render the basic page framework
        console.log('CHICAGO CRIME [js/app.js]: Render page skeleton.');
        $('body').html(_.template(HomeTemplate));

        // Render the basic page framework
        console.log('CHICAGO CRIME [js/app.js]: Create navigation view.');
        var nav = new NavView({ 'router': router });

        // Set up spinner view
        // Set up menu view
        // Home page view
        // Community Area view
    };

    // Return our module interface
    return {
        initialize: initialize
    };

});




