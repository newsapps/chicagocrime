define([
    // Libraries
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {

    var DocDetailView = Backbone.View.extend({
        initialize: function(options) {
            var detail = this;
            var path = options.doc_id;
            this.$el.append("<h1>Documentation</h1>")
            var el = $('<div>').hide().appendTo(detail.$el);
            require(['text!docs/' + path], function(doc) {
                el.html($('<pre>' + doc + '</pre>')).show()
            });
        }
    });

    return DocDetailView;

});
