define([ 'jquery', 'backbone', 
         'collections/DateSummaryCollection', 
         'views/PageView', 'views/CommunityAreaListView', 'views/CommunityAreaDetailView', 'views/DocListView', 'views/DocDetailView' ], 
function($, Backbone, DateSummaryCollection, PageView, CommunityAreaListView, CommunityAreaDetailView, DocListView, DocDetailView) {

    var CrimeAppView = Backbone.View.extend({
        id: 'content',
        initialize: function(options) {
            console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: Setting up main crime data application.');
            this.router = options.router;

            // Set height
            this.$el.css('min-height', ($(window).height() - 100) + 'px');

            // Home page view
            var homePageView = new PageView({template: 'templates/home.jst', 'id': 'home-page'});
            $('#content').append(homePageView.$el);

            // Community area list view
            var communityAreaListView = new CommunityAreaListView();
            $('#content').append(communityAreaListView.$el);

            // Community area daily summary detail view
            var dateSummaryCollection = new DateSummaryCollection();
            var communityAreaDetailView = new CommunityAreaDetailView({ collection: dateSummaryCollection });
            $('#content').append(communityAreaDetailView.$el);

            // Documentation
            var docs = ['api_docs.md', 'frontend_development.md'];
            var docListView = new DocListView({'docs': docs});
            $('#content').append(docListView.$el);

            var docDetailView = new DocDetailView({'docs': docs});
            $('#content').append(docDetailView.$el);

            this.router.on('beforeroute', function() {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `beforeroute` triggered on any route. Hide all views.');
                homePageView.hide();
                communityAreaListView.hide();
                communityAreaDetailView.hide();
                docListView.hide();
                docDetailView.hide();
            });

            this.router.on('route:home', function(community_area_id) {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `home` route triggered.');
                homePageView.show();
            });

            this.router.on('route:community_areas', function(community_area_id) {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `community_area_list` route triggered. Display list.');
                communityAreaListView.show();
            });

            this.router.on('route:community_area_detail', function(community_area_id) {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `community_area_detail` (id: ' + community_area_id + ') route triggered. Fetching data.');
                dateSummaryCollection.fetch({
                    data: { 
                        'community_area': community_area_id, 
                        'related': 1, 
                        'crime_date__gte': '2012-09-01', 
                        'limit': 0 
                    },
                });
            });

            this.router.on('route:documentation', function() {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `documentation` route triggered.');
                docListView.show();
            });

            this.router.on('route:doc_view', function(doc) {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `doc_detail` route triggered.');
                docDetailView.show(doc);
            });
        }
    });

    return CrimeAppView;
});
