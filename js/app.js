define([ 'jquery', 'underscore', 'backbone', 'router', 'views/NavView', 'views/CrimeAppView', 'text!templates/home.jst' ], 
function($, _, Backbone, Router, NavView, CrimeAppView, HomeTemplate) {
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

        // @TODO Set up spinner view

        console.log('CHICAGO CRIME [js/app.js]: Initialize crime application controller view.');
        var app = new CrimeAppView({ 'router': router });

        console.log('CHICAGO CRIME [js/app.js]: Enable Backbone history.');
        Backbone.history.start();
    };

    // Return our module interface
    return {
        initialize: initialize
    };

});




