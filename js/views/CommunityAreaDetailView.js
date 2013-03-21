define([ 'backbone' ], function(Backbone) {
    var CommunityAreaDetailView = Backbone.View.extend({
        el: '#community-area-detail',
        initialize: function(options) {
            this.collection = options.collection;
            this.collection.bind('sync', this.render, this);
        },
        render: function() {
            console.log(arguments);
            console.log('CHICAGO CRIME [js/views/CommunityAreaDetailView.js]: Render community area detail.');
            this.$el.html('<h1>YO MOMMA</h1>');
            this.$el.show();
            return this;
        }
    });
    return CommunityAreaDetailView;
});
