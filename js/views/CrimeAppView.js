define([ 'jquery', 'backbone', 'collections/DateSummaryCollection', 'views/CommunityAreaListView', 'views/CommunityAreaDetailView' ], function($, Backbone, DateSummaryCollection, CommunityAreaListView, CommunityAreaDetailView) {

    var CrimeAppView = Backbone.View.extend({
        id: 'content',
        initialize: function(options) {
            console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: Setting up main crime data application.');
            this.router = options.router;

            var communityAreaListView = new CommunityAreaListView();
            $('#content').append(communityAreaListView.$el);

            var dateSummaryCollection = new DateSummaryCollection();
            var communityAreaDetailView = new CommunityAreaDetailView({ collection: dateSummaryCollection });
            $('#content').append(communityAreaDetailView.$el);

            this.router.on('beforeroute', function() {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: Route triggered. Hide all views.');
                communityAreaListView.hide();
                communityAreaDetailView.hide();
            });

            this.router.on('route:community_areas', function(community_area_id) {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `community_area_list` route triggered. Display list.');
                communityAreaListView.show();
            });

            this.router.on('route:community_area_detail', function(community_area_id) {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `community_area_detail` route triggered. Fetch data.');
                dateSummaryCollection.fetch({
                    data: { 
                        'community_area': community_area_id, 
                        'related': 1, 
                        'crime_date__gte': '2012-09-01', 
                        'limit': 0 
                    },
                });
            });
        }
    });

    return CrimeAppView;
});
