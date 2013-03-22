define([
    // Libraries
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {

    var PageView = Backbone.View.extend({
        initialize: function(options) {
            var page = this;
            var context = options.context || {}

            // Get and compile template
            require([ 'text!' + options.template ], function(template) {
                page.template = _.template(template);
                page.render(context);
            });
        },
        render: function(context) {
            // Replace HTML with contents of template. Takes optional
            // `context` parameter to pass to template.
            this.$el.html(this.template(context));
            this.$el.css('min-height', ($(window).height() - 100) + 'px');
            return this;
        },
        show: function() {
            this.$el.show();
            return this;
        },
        hide: function() {
            this.$el.hide();
            return this;
        }
    });

    return PageView;

});
