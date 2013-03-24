define([ 'backbone' ], function(Backbone) {
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'community': 'community_areas',
            'community/:community_area_id': 'community_area_detail',
            'community/:community_num/month/:month_num': 'monthly_summary',
            'docs': 'documentation',
            'docs/:id': 'doc_view'
        }
    });
    return Router;
});
