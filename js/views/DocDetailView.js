define([
    // Libraries
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {

    var DocDetailView = Backbone.View.extend({
        id: 'doc-detail',
        initialize: function(options) {
            // Render docs. @TODO split out into view?
            var detail = this;
            _.each(options.docs, function(path) {
                var id = path.split('.').shift();
                var el = $('<div>')
                    .attr('id', id)
                    .attr('class', 'doc-item')
                    .hide()
                    .appendTo(detail.$el);

                require(['text!docs/' + path], function(doc) {
                    el.html($('<pre>' + doc + '</pre>'))
                });
            });

        },
        show: function(path) {
            this.$el.show();
            var id = path.split('.').shift();
            $('#' + id).show();
            return this;
        },
        hide: function() {
            this.$el.find('.doc-item').hide();
            this.$el.hide();
            return this;
        }
    });

    return DocDetailView;

});
