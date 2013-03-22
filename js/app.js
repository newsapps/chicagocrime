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
        var nav = new NavView({ 'router': router });

        // Set up spinner view
        var target = document.getElementById('#spinner');
        var opts = {
            lines: 13, // The number of lines to draw
            length: 11, // The length of each line
            width: 5, // The line thickness
            radius: 12, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#eee', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        var spinner = new Spinner(opts).spin();
        $('#spinner').append(spinner.el);

        console.log('CHICAGO CRIME [js/app.js]: Initialize crime application controller view.');
        var app = new CrimeAppView({ 'el': $('#content'), 'router': router });

        console.log('CHICAGO CRIME [js/app.js]: Enable Backbone history.');
        Backbone.history.start();
    };

    // Return our module interface
    return {
        initialize: initialize
    };

});




