define([ 'underscore', 'backbone', 'text!templates/nav.jst' ], function(_, Backbone, NavTemplate) {
    var NavView = Backbone.View.extend({
        el: '#nav',
        initialize: function(options) {
            console.log('CHICAGO CRIME [js/views/NavView.js]: Initialize navigation view');
            this.template = _.template(NavTemplate);

            // Decompose router to create hash links and labels
            var menuItems = {};
            _.each(_.pairs(options.router.routes), function(route) {
                // Pop off the first argument in route path (e.g. 'foo' in 'foo/bar')
                var path = '#' + route[0].split('/').shift();

                // Replace underscores and uppercase first letter of route name
                var label = route[1].replace('_', ' ');
                label = label.charAt(0).toUpperCase() + label.slice(1);

                // Add to menu if not already there
                if (!_.has(menuItems, path)) {
                    menuItems[path] = label;
                }
            }); 

            this.render(menuItems);
        },
        render: function(menuItems) {
            this.$el.find('.brand').after(this.template({ 'menuItems': menuItems }));
            return this;
        }
    });
    return NavView;
});
