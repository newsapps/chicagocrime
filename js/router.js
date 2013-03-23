define([ 'backbone' ], function(Backbone) {
    var oldRoute = Backbone.Router.route;
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'community': 'community_areas',
            'community/:community_area_id': 'community_area_detail',
            'docs': 'documentation',
            'docs/:id': 'doc_view',
            'month/:month_num/community/:community_num': 'monthly_summary'
        },
        route: function(route, name, callback) {
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if (!callback) callback = this[name];
            var router = this;
            Backbone.history.route(route, function(fragment) {
                var args = router._extractParameters(route, fragment);
                callback && callback.apply(router, args);
                router.trigger('beforeroute', name, args);
                router.trigger('beforeroute:' + name, name, args);
                router.trigger.apply(router, ['route:' + name].concat(args));
                router.trigger('route', name, args);
                Backbone.history.trigger('route', router, name, args);
            });
            return this;
        },
    });
    return Router;
});
