define(['jquery','underscore','backbone'], function($, _, Backbone) {

    var PageView = Backbone.View.extend({
        initialize: function(options) {
            var page = this;

            // Get and compile template
            require([ 'text!' + options.template ], function(template) {
                page.template = _.template(template);
                page.render();
            });
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });

    return PageView;

});
