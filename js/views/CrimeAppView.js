define([ 'jquery', 'backbone', 'async',
         'collections/DateSummaryCollection', 
         'collections/CommunityAreaCollection', 
         'views/PageView', 'views/CommunityAreaListView',
         'views/CommunityAreaDetailView', 'views/DocListView',
         'views/DocDetailView', 'views/CommunityAreaMonthlySummary' ], 
function($, Backbone, async, DateSummaryCollection, CommunityAreaCollection, PageView, CommunityAreaListView, CommunityAreaDetailView, DocListView, DocDetailView, CommunityAreaMonthlySummary) {

    var CrimeAppView = Backbone.View.extend({
        id: 'content',
        initialize: function(options) {
            console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: Setting up main crime data application.');
            var app = this;
            this.router = options.router;

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

            var thisYearCollection = new DateSummaryCollection() //This is so wrong. 
            var priorYearCollection = new DateSummaryCollection() //This is so wrong. 
            var communityAreaCollection = new CommunityAreaCollection() //This is so wrong. Shouldn't be passing in a collection. Or anything for that matter..
            var communityAreaMonthlySummary = new CommunityAreaMonthlySummary({ summary: thisYearCollection, prior: priorYearCollection, community_areas: communityAreaCollection });
            $('#content').append(communityAreaMonthlySummary.$el);

            // Size all containers
            $('#content > div').css('min-height', ($(window).height() - 100) + 'px');
            
            this.router.on('beforeroute', function() {
                console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: `beforeroute` triggered on any route. Hide all views.');

                homePageView.hide();
                communityAreaListView.hide();
                communityAreaDetailView.hide();
                docListView.hide();
                docDetailView.hide();
                communityAreaMonthlySummary.hide()
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

            this.router.on('route:monthly_summary', function(community_num,month_num) {
                var month, end;

                var year = (new Date()).getFullYear()
                var start_month = Number(month_num - 1) //Use 0-11 instead of 1-12
                var end_month = start_month + 1

                if(end_month > 12){
                    end_month = 1;
                    year = year + 1;
                }

                async.parallel({
                    this_year: function(cb_p){
                        thisYearCollection.fetch({
                            data: {
                                'community_area': community_num,
                                'related': 1,
                                'crime_date__gte': year + '-' + start_month  + '-01 00:00',
                                'crime_date__lt' : year + '-' + end_month + '-01 00:00',
                                'limit': 0
                            },
                            success: function(){ cb_p() }
                        })
                    },
                    last_year: function(cb_p){
                        priorYearCollection.fetch({
                            data: {
                                'community_area': community_num,
                                'related': 1,
                                'crime_date__gte': (year - 1) + '-' + start_month  + '-01 00:00',
                                'crime_date__lt': (year - 1) + '-' + end_month + '-01 00:00',
                                'limit': 0
                            },
                            success: function(){ cb_p() }
                        })
                    },
                    community: function(cb_p){
                        communityAreaCollection.fetch({
                            success: function(){ cb_p() }
                        })
                    }
                },function(err, results){
                    communityAreaMonthlySummary.show({community:community_num,month:start_month});
                })
            });
        }
    });

    return CrimeAppView;
});
