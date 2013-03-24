define(['jquery','backbone', 'async','collections/DateSummaryCollection','text!templates/summary.jst'],function($, Backbone, async, DateSummaryCollection, SummaryTemplate) {

    var CommunityAreaMonthlySummary = Backbone.View.extend({

        initialize: function(options){
            this.template = _.template(SummaryTemplate);
            
            //Options
            this.month = options.month;
            this.year = (new Date()).getFullYear();
            this.community_area_id = options.community_area_id;

            //Set up the collections
            this.monthCrimesCollection = new DateSummaryCollection();
            this.priorYearMonthCrimes = new DateSummaryCollection();
            this.loaded = false;

            //Binding
            this.bind('loaded',function(){
                this.loaded = true;
                this.render();
            },this);
            
            this.load_data();
            this.render();
        },

        load_data: function(){
            var view = this;

            function fix_month(month){
                month = String(month)
                if (month.length == 2){
                    return month
                } 
                return "0" + month
            }

            var end_month = Number(view.month) + 1
            var year = view.year;

            if(end_month > 12){
                end_month = 1;
                year = year + 1;
            }

            start_month = fix_month(view.month)
            end_month = fix_month(end_month)

            async.parallel({
                this_year: function(cb_p){
                    view.monthCrimesCollection.fetch({
                        data: {
                            'community_area': view.community_area_id,
                            'related': 1,
                            'crime_date__gte': year + '-' + start_month  + '-01 00:00',
                            'crime_date__lt' : year + '-' + end_month + '-01 00:00',
                            'limit': 0
                        },
                        success: function(){ cb_p() }
                    })
                },
                last_year: function(cb_p){
                    view.priorYearMonthCrimes.fetch({
                        data: {
                            'community_area': view.community_area_id,
                            'related': 1,
                            'crime_date__gte': (year - 1) + '-' + start_month  + '-01 00:00',
                            'crime_date__lt': (year - 1) + '-' + end_month + '-01 00:00',
                            'limit': 0
                        },
                        success: function(){ cb_p() }
                    })
                }
            },function(err, results){
                view.community = view.monthCrimesCollection.meta.community_area
                view.trigger("loaded")
            })
        },

        month_from_number: function(month) {
            var months = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ]

            return months[month - 1]
        },

        render: function() {
            console.log('CHICAGO CRIME [js/views/CommunityAreaMonthlySummary.js]: Render summery.');
            this.$el.empty() //Clear out the content
            if (!this.loaded){ 
                return this; //Don't add anything if nothing is loaded
            }

            var month_aggregate = this.aggregate_crimes(this.monthCrimesCollection);
            var prior_year_month_aggregate = this.aggregate_crimes(this.priorYearMonthCrimes);

            this.$el.append(this.template({
                community: this.community,
                month_crimes: month_aggregate,
                prior_year_month_crimes: prior_year_month_aggregate,
                month_name: this.month_from_number(Number(this.month)),
                totals_month: this.total_crimes(month_aggregate),
                totals_prior_year_month: this.total_crimes(prior_year_month_aggregate)
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

        total_crimes: function(aggregate_crimes) { //Count the total number of crimes in an aggregate.
            var total = 0;
            _.each(_.values(aggregate_crimes.crimes), function(v) {
                total += v.count;
            });
            return total;
        }
    });

    return CommunityAreaMonthlySummary;

});
