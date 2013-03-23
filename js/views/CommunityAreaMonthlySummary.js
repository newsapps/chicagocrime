define([
    'jquery',
    'backbone',
    'collections/DateSummaryCollection',
    'views/PageView',
    'views/CommunityAreaListView',
    'views/CommunityAreaDetailView',
    'views/DocListView',
    'views/DocDetailView',
    'text!templates/summary.jst'
],
function($, Backbone, DateSummaryCollection, PageView, CommunityAreaListView,
         CommunityAreaDetailView, DocListView, DocDetailView, SummaryTemplate) {

    var CommunityAreaMonthlySummary = Backbone.View.extend({

        initialize: function() {
            var month, end;

            if ( parseInt(this.options.month, 10) > 9 ) {
                month = this.options.month;
                end = (parseInt(this.options.month, 10) + 1) % 12;
            } else {
                month = '0' + this.options.month;
                end = (parseInt(this.options.month, 10) + 1) % 12;
            }

            if ( parseInt(end, 10) < 9 )
                end = '0' + end;

            this.template = _.template(SummaryTemplate);

            this.summary = new DateSummaryCollection();
            this.summary.fetch({
                data: {
                    'community_area': this.options.community,
                    'related': 1,
                    'crime_date__gte': '2013-' + month  + '-01 00:00',
                    'crime_date__lt': '2013-' + end + '-01 00:00',
                    'limit': 0
                },
                success: _.bind(this.render, this)
            });

            return this;
        },

        render: function() {
            this.$el.append(this.template());

            $('#content').append(this.$el);
        }

    });

    return CommunityAreaMonthlySummary;

});
