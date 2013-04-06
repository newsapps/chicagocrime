define([
    'jquery',
    'backbone',
    'views/PageView',
    'views/CommunityAreaListView',
    'views/CommunityAreaDetailView',
    'views/DocListView','views/DocDetailView',
    'views/CommunityAreaMonthlySummary', 
    'views/TheftReportView'
], function($, Backbone, PageView, CommunityAreaListView, 
            CommunityAreaDetailView, DocListView, DocDetailView, 
            CommunityAreaMonthlySummary, TheftReportView) {

    var CrimeAppView = Backbone.View.extend({
        id: 'content',
        swap_view: function(new_view,options){ //Delete the old view and set the new view. Removes race conditions
            this.$("#loading").show();
            if(this.currentView){
                this.currentView.remove();
            }
            this.$el.empty();
            this.currentView = new new_view(options);
            this.$el.append(this.currentView.el);
        },
        initialize: function(options) {
            console.log('CHICAGO CRIME [js/views/CrimeAppView.js]: Setting up main crime data application.');
            var app = this;
            this.router = options.router;
            this.currentView = null

            // Size all containers
            $('#content > div').css('min-height', ($(window).height() - 100) + 'px');

            this.router.on('route:home', function(args) {
                app.swap_view(PageView,{template: 'templates/home.jst'});
            });

            this.router.on('route:community_areas', function(args) {
                app.swap_view(CommunityAreaListView);
            });

            this.router.on('route:community_area_detail', function(community_area_id) {
                app.swap_view(CommunityAreaDetailView,{community_area_id: community_area_id });
            });

            this.router.on('route:monthly_summary', function(community_area_id,month_num) {
                if(month_num > (new Date).getMonth() + 1){
                    window.location.href = '#/';
                }
                app.swap_view(CommunityAreaMonthlySummary,{community_area_id: community_area_id, month: month_num });
            });

            this.router.on('route:documentation', function() {
                app.swap_view(DocListView);
            });

            this.router.on('route:doc_view', function(id) {
                app.swap_view(DocDetailView,{doc_id: id});
            });

            this.router.on('route:theft_report', function() {
                app.swap_view(TheftReportView);
            });


        }
    });

    return CrimeAppView;
});
