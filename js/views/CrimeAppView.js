define([ 'jquery', 'backbone', 'collections/DateSummaryCollection', 'views/CommunityAreaDetailView' ], function($, Backbone, DateSummaryCollection, CommunityAreaDetailView) {

    var CrimeAppView = Backbone.View.extend({
        el: '#content',
        initialize: function(options) {
            console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: Setting up main crime data application.');
            this.router = options.router;

            var dateSummaryCollection = new DateSummaryCollection();

            var communityAreaDetailView = new CommunityAreaDetailView({
                collection: dateSummaryCollection 
            });

            //this.router.on('route', function() {
                //console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: Any route triggered. Hide all views.');
                //communityAreaDetailView.$el.hide();
            //});
            
            this.router.on('route:community_area_detail', function(community_area_id) {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `community_area_detail` route triggered. Fetch data.');
                dateSummaryCollection.fetch({
                    data: { 'community_area': community_area_id },
                    success: function(data) { console.log('should run after routing shit'); console.log(data); return data; }
                });
            });
        }
    });

    return CrimeAppView;
});
