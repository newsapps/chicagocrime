define([ 'underscore', 'backbone', 'collections/CommunityAreaCollection', 'text!templates/table.jst' ], function(_, Backbone, CommunityAreaCollection, TableTemplate) {
    var CommunityAreaListView = Backbone.View.extend({
        initialize: function(options) {
            this.loaded = false; //Set the loaded flag to false until the data loads
            this.template = _.template(TableTemplate);
            this.collection = new CommunityAreaCollection();
            
            this.collection.bind('sync',function(){
                this.loaded = true;
                this.render();
            },this);
            
            this.collection.fetch();
            this.render();
        },
        render: function() {
            console.log('CHICAGO CRIME [js/views/CommunityAreaListView.js]: Render community area list table.');
            this.$el.empty() //Clear out the content
            if (!this.loaded){ 
                return this; //Don't add anything if nothing is loaded
            }
            var data = this.collection.map(function(model) {
                row = model.attributes;
                row["name"] = '<a href="#community/' + model.get("area_number") + '">' + model.get("name") + '</a>';
                return row;
            });
            
            this.$el.append(this.template({ //Questionable pattern
                'title': 'Chicago Community Areas', 
                'headers': _.keys(data[0]), 
                'data': data,
                'order': ["name", "area_number", "hardship_index", "pct_crowded", "pct_no_diploma", "pct_old_and_young", "pct_poverty", "pct_unemployed", "per_capita_income", "population", "shape_area"] 
            }));
            return this;
        }
    });
    return CommunityAreaListView;
});
