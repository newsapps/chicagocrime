define([ 'jquery', 'backbone', 'text!templates/home.jst' ], function($, Backbone, HomeTemplate) {
    // Add a "fetch" event to signal start of collection AJAX call.
    var fetch = Backbone.Collection.prototype.fetch;
    Backbone.Collection.prototype.fetch = function(options) {
        this.trigger("fetch");
        return fetch.call(this, options);
    };

    // Initialize
    var initialize = function() {
        console.log('CHICAGO CRIME [js/app.js]: Application initializing.');

        // Render the basic page framework
        $('body').html(_.template(HomeTemplate));

        // Set up page markup
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




