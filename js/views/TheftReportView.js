define([
    'backbone',
    'moment',
    'collections/DateSummaryCollection',
], function(Backbone, moment, DateSummaryCollection) {
    var TheftReportView = Backbone.View.extend({
        collection: new DateSummaryCollection(),
        id: 'theft-report',
        initialize: function(options) {
            this.now = moment().subtract('weeks', 1);
            this.last_month = moment().subtract('weeks', 3);
            this.collection.bind('sync', this.render, this);
            this.collection.fetch({
                data: {
                    'crime_date__gte': this.last_month.format(),
                    'limit': 0
                }
            });
        },
        render: function() {
            var theft_counts = this.collection.pluck('theft');
            var sum = _.reduce(theft_counts, function(memo, num){ 
                return memo + num; 
            }, 0);
            var template = _.template('<p>There were <%= thefts %> thefts in Chicago from <%= then %> to <%= now %></p>'); 
            this.$el.html(template({ 
                'thefts': sum, 
                'then': this.last_month.format('MMMM Do YYYY'), 
                'now': this.now.format('MMMM Do YYYY') 
            }));
            return this;
        }
    });

    return TheftReportView;

});
