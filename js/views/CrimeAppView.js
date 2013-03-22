define([ 'jquery', 'backbone', 'collections/DateSummaryCollection', 'collections/CommunityAreaCollection', 'views/CommunityAreaListView', 'views/CommunityAreaDetailView' ], function($, Backbone, DateSummaryCollection, CommunityAreaCollection, CommunityAreaListView, CommunityAreaDetailView) {

    var CrimeAppView = Backbone.View.extend({
        id: 'content',
        initialize: function(options) {
            console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: Setting up main crime data application.');
            this.router = options.router;

            var communityAreaCollection = new CommunityAreaCollection();
            var communityAreaListView = new CommunityAreaListView({ collection: communityAreaCollection });
            $('#content').append(communityAreaListView.$el);

            var dateSummaryCollection = new DateSummaryCollection();
            var communityAreaDetailView = new CommunityAreaDetailView({ collection: dateSummaryCollection });
            $('#content').append(communityAreaDetailView.$el);

            this.router.on('route', function() {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: Route triggered. Hide all views.');
                communityAreaListView.$el.empty();
                communityAreaDetailView.$el.empty();
            });

            this.router.on('route:community_areas', function(community_area_id) {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `community_area_list` route triggered. Fetch data.');
                communityAreaCollection.fetch();
            });

            this.router.on('route:community_area_detail', function(community_area_id) {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `community_area_detail` route triggered. Fetch data.');
                dateSummaryCollection.fetch({
                    data: { 'community_area': community_area_id, 'related': 1, 'year__gte': 2012 },
                });
            });
        }
    });

    return CrimeAppView;
});
