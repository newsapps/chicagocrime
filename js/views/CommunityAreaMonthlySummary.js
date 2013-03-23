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
                success: _.bind(function() {
                    this.prior_year = new DateSummaryCollection();
                    this.prior_year.fetch({
                        data: {
                            'community_area': this.options.community,
                            'related': 1,
                            'crime_date__gte': '2012-' + month  + '-01 00:00',
                            'crime_date__lt': '2012-' + end + '-01 00:00',
                            'limit': 0
                        },
                        success: _.bind(this.render, this)
                    });
                }, this)
            });

            return this;
        },

        render: function() {
            var month = this.sums(this.summary),
                prior = this.sums(this.prior_year);

            this.$el.append(this.template({
                month: month,
                prior: prior,
                totals: this.total_crimes(month),
                totals_prior: this.total_crimes(prior)
            }));

            $('#content').append(this.$el);
        },

        sums: function(collection) {
            var crimes = ["arson", "assault", "battery", "burglary",
                "criminal_damage", "homicide", "motor_vehicle_theft",
                "narcotics", "prostitution", "robbery", "sexual_assault",
                "theft"];

            var sums = {};

            collection.each(function(val, idx) {
                _.each(crimes, function(i) {
                    if ( !sums[i] ) {
                        sums[i] = parseInt(val.get(i), 10);
                    } else {
                        sums[i] += parseInt(val.get(i), 10);
                    }
                });
            });

            return sums;
        },

        total_crimes: function(sums_obj) {
            var total = 0;

            _.each(_.values(sums_obj), function(v) {
                total += v;
            });

            return total;
        }

    });

    return CommunityAreaMonthlySummary;

});
