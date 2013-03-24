define([
    'jquery',
    'backbone',
    'views/PageView',
    'views/CommunityAreaListView',
    'views/CommunityAreaDetailView',
    'views/DocListView',
    'views/DocDetailView',
    'text!templates/summary.jst'
],
function($, Backbone, PageView,
         CommunityAreaListView, CommunityAreaDetailView, DocListView, DocDetailView,
         SummaryTemplate) {

    var CommunityAreaMonthlySummary = Backbone.View.extend({

        initialize: function(options){
            this.template = _.template(SummaryTemplate);
            this.summary = options.summary; //for legacy 
            this.prior_year = options.prior; 
            this.community_areas = options.community_areas;
        },

        month_from_number: function(month) {
            var months = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ]

            return months[month]
        },

        render: function() {
            var month_crimes = this.aggregate_crimes(this.summary);
            var prior_year_month_crimes = this.aggregate_crimes(this.prior_year);
            var community = this.community_areas.find(_.bind(function(x) {
                return x.get('area_number') == this.options.community 
            }, this));

            this.$el.empty();
            this.$el.append(this.template({
                community: community.attributes,
                month_crimes: month_crimes,
                prior_year_month_crimes: prior_year_month_crimes,
                month_name: this.month_from_number(this.options.month),
                totals_month: this.total_crimes(month_crimes),
                totals_prior_year_month: this.total_crimes(prior_year_month_crimes)
            }));
        },

        aggregate_crimes: function(collection) {
            var crime_spec = {
                violent_crimes: {
                    values:["robbery", "battery", "assault", "homicide","sexual_assault"],
                    name: "violent crimes"
                },
                property_crimes: {
                    values:["theft", "burglary", "motor_vehicle_theft","arson"],
                    name: "property crimes"
                },
                quality_of_life_crimes: {
                    values:["criminal_damage", "narcotics","prostitution"],
                    name: "quality-of-life crimes"
                }
            }

            results = {
                crimes: {},
                no_occurrences: []
            }

            collection.each(function(crime_occurence) { //Each crime
                
                _.each(crime_spec, function(spec, key){ //Check if it is an aggregate type laid out in in the spec
                    if (!results.crimes[key]){ //If we haven't added this type to the results yet, make it so
                        results.crimes[key] = {
                            count: 0,
                            name: spec.name
                        }
                    }

                    _.each(spec.values, function(subtype) { //Check if the crime matches any of the matched types
                        results.crimes[key].count += parseInt(crime_occurence.get(subtype) || 0, 10);
                    });
                })
            });

            //Count the types that nothing happened in
            var all_types  = _(crime_spec).chain().map(function(spec){ return spec.values }) //Loop over the specs and add the types
            .flatten().uniq().value()


            results.no_occurrences = _(crime_spec).chain().map(function(spec){ return spec.values }) //Loop over the specs and add the types
            .flatten().uniq() //Convert the nested array of types into a flat array
            .reject(function(type){ //Reject all the ones with a crime associated with them
                return collection.find(function(crime){
                    return crime.get(type)
                })
            }).map(function(type){ 
                return type.replace("_"," ")
            }).value()
            
            return results;
        },

        total_crimes: function(sums_obj) {
            var total = 0;

            _.each(_.values(sums_obj.crimes), function(v) {
                total += v.count;
            });

            return total;
        },
        show: function(options) {
            this.options = options
            this.render()
            this.$el.show();
            return this;
        },
        hide: function() {
            this.$el.empty();
            this.$el.hide();
            return this;
        }

    });

    return CommunityAreaMonthlySummary;

});
