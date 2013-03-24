define([
    // Libraries
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {

    var DocDetailView = Backbone.View.extend({
        initialize: function(options) {
            this.doc_id = options.doc_id;
            this.render();
        },
        render: function(){ //Convention
            this.$el.append("<h1>Documentation</h1>")
            var el = $('<div>').hide().appendTo(this.$el);
            require(['text!docs/' + this.doc_id], function(doc) {
                el.html($('<pre>' + doc + '</pre>')).show()
            });
        }
    });

    return DocDetailView;

});
