define([ 'underscore', 'backbone', 'text!templates/table.jst' ], function(_, Backbone, TableTemplate) {
    var CommunityAreaDetailView = Backbone.View.extend({
        id: 'community-area-detail',
        initialize: function(options) {
            this.template = _.template(TableTemplate);
            this.collection.bind('sync', this.render, this);
        },
        render: function() {
            console.log('CHICAGO CRIME [js/views/CommunityAreaDetailView.js]: Render community area detail table.');
            var data = this.collection.toJSON();
            this.$el.append(this.template({
                'title': this.collection.meta.community_area.name,
                'data': [ this.collection.meta.community_area ],
                'order': ["area_number", "hardship_index", "pct_crowded", "pct_no_diploma", "pct_old_and_young", "pct_poverty", "pct_unemployed", "per_capita_income", "population", "shape_area"] 
            }));
            this.$el.append(this.template({
                'title': '',
                'data': data,
                'order': ["crime_date", "arson", "assault", "battery", "burglary", "criminal_damage", "homicide", "motor_vehicle_theft", "narcotics", "prostitution", "robbery", "sexual_assault", "theft"]
            }));
            this.$el.show();
            return this;
        },
        hide: function() {
            this.$el.empty();
            return this;
        }
    });
    return CommunityAreaDetailView;
});
