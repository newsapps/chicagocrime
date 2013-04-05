define([
    'backbone',
], function(Backbone) {

    var TheftReportView = Backbone.View.extend({
        initialize: function(options) {
            this.render();
        },
        render: function() {
            this.$el.html('Hello world! An awesome theft report will be here soon.');
            return this;
        }
    });

    return TheftReportView;

});
