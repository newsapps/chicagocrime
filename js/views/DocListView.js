define([
    // Libraries
    'jquery',
    'underscore',
    'backbone',
    'text!templates/list.jst'
], function($, _, Backbone, ListTemplate) {

    var DocListView = Backbone.View.extend({
        docs: ['api_docs.md', 'frontend_development.md'],
        initialize: function(options) {
            this.template = _.template(ListTemplate);
            this.render();
        },
        render: function(context) {
            var links = [];
            _.each(this.docs, function(doc) {
                var title = doc.split('.').shift().replace(/_/g, " ");
                links.push({
                    label: title.charAt(0).toUpperCase() + title.slice(1),
                    link: '#docs/' + doc
                });
            });
            this.$el.html(this.template({
                'title': 'Documentation',
                'rows': links
            }));
            return this;
        }    
    });

    return DocListView;

});
