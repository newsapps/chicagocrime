define([ 'underscore', 'backbone', 'collections/DateSummaryCollection','text!templates/table.jst' ], function(_, Backbone, DateSummaryCollection,TableTemplate) {
    var CommunityAreaDetailView = Backbone.View.extend({
        initialize: function(options) {
            this.dateSummaryCollection = new DateSummaryCollection()
            this.template = _.template(TableTemplate);
            this.loaded = false
            
            this.dateSummaryCollection.bind('sync',function(){
                this.loaded = true;
                this.render();
            },this);

            this.dateSummaryCollection.fetch({
                data: { 
                    'community_area': this.options.community_area_id, 
                    'related': 1, 
                    'crime_date__gte': '2012-09-01', 
                    'limit': 0 
                }
            });
            this.render();
        },
        render: function() {
            console.log('CHICAGO CRIME [js/views/CommunityAreaDetailView.js]: Render community area detail table.');
            this.$el.empty() //Clear out the content
            
            if (!this.loaded){ 
                return this; //Don't add anything if nothing is loaded
            }

            this.$el.append(this.template({
                'title': this.dateSummaryCollection.meta.community_area.name,
                'link':{
                    'title':"View a written monthly summary of crime.",
                    'href':'#/community/'+this.dateSummaryCollection.meta.community_area.area_number +'/month/'+ ((new Date()).getMonth() + 1)
                },
                'data': [ this.dateSummaryCollection.meta.community_area ],
                'order': ["area_number", "hardship_index", "pct_crowded", "pct_no_diploma", "pct_old_and_young", "pct_poverty", "pct_unemployed", "per_capita_income", "population", "shape_area"] 
            }));

            data = this.dateSummaryCollection.map(function(model){
                return model.attributes;
            })

            this.$el.append(this.template({
                'title': '',
                'data': data,
                'order': ["crime_date", "arson", "assault", "battery", "burglary", "criminal_damage", "homicide", "motor_vehicle_theft", "narcotics", "prostitution", "robbery", "sexual_assault", "theft"]
            }));
            return this;
        }
    });
    return CommunityAreaDetailView;
});
