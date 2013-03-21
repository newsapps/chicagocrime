define([ 'underscore', 'backbone', 'text!templates/table.jst' ], function(_, Backbone, TableTemplate) {
    var CommunityAreaDetailView = Backbone.View.extend({
        el: '#community-area-detail',
        initialize: function(options) {
            this.template = _.template(TableTemplate);
            this.collection.bind('sync', this.render, this);
        },
        render: function() {
            console.log('CHICAGO CRIME [js/views/CommunityAreaDetailView.js]: Render community area detail table.');
            var rows = this.collection.toJSON();
            this.$el.html(this.template({ 'headers': _.keys(rows[0]), 'rows': rows }));
            this.$el.show();
            return this;
        }
    });
    return CommunityAreaDetailView;
});
