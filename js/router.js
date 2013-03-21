define([ 'backbone' ], function(Backbone) {
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'community': 'community_areas',
        }
    });
    return Router;
});
