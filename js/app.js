define([ 'jquery', 'underscore', 'backbone', 'router', 'spin', 'views/NavView', 'views/CrimeAppView', 'text!templates/frame.jst' ], 
function($, _, Backbone, Router, Spinner, NavView, CrimeAppView, HomeTemplate) {
    // Initialize
    var initialize = function() {
        console.log('CHICAGO CRIME [js/app.js]: Application initializing.');

        // Load routers
        console.log('CHICAGO CRIME [js/app.js]: Initialize router.');
        var router = new Router(); 

        // Render the basic page framework
        console.log('CHICAGO CRIME [js/app.js]: Render page skeleton.');
        $('body').html(_.template(HomeTemplate));

        // Render the basic page framework
        console.log('CHICAGO CRIME [js/app.js]: Create navigation view.');
        var nav = new NavView({ 'router': router, el: $("#nav") }); //Pass in the router so as to generate the menu

        // Set up spinner
        var spinner = new Spinner({
            length: 11, // The length of each line
            width: 5, // The line thickness
            radius: 12, // The radius of the inner circle
            color: '#eee', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
        }).spin();
        
        $('#spinner').append(spinner.el);

        console.log('CHICAGO CRIME [js/app.js]: Initialize crime application controller view.');
        var app = new CrimeAppView({ 'el': $('#content'), 'router': router }); //Pass the router in here to bind to route changes

        console.log('CHICAGO CRIME [js/app.js]: Enable Backbone history.');
        Backbone.history.start();
    };

    // Return our module interface
    return {
        initialize: initialize
    };

});




