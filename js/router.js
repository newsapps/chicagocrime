define([ 'backbone' ], function(Backbone) {
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'community': 'community_areas',
            'community/:community_area_id': 'community_area_detail'
        }
    });
    return Router;
});
