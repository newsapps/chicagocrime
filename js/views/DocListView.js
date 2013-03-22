define([
    // Libraries
    'jquery',
    'underscore',
    'backbone',
    'text!templates/list.jst'
], function($, _, Backbone, ListTemplate) {

    var DocListView = Backbone.View.extend({
        id: 'doc-list',
        initialize: function(options) {
            this.docs = options.docs;
            this.template = _.template(ListTemplate);
            this.render();
        },
        render: function(context) {
            var rows = [];
            _.each(this.docs, function(row) {
                var title = row.split('.').shift().replace(/_/g, " ");
                rows.push({
                    label: title.charAt(0).toUpperCase() + title.slice(1),
                    link: '#docs/' + row
                });
            });
            this.$el.html(this.template({
                'title': 'Documentation',
                'rows': rows
            }));
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

    return DocListView;

});
