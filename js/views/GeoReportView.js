define([
    'backbone',
    'collections/IndividualReportCollection',
    'text!templates/table.jst'
], function(Backbone, IndividualReportCollection, TableTemplate) {
    var GeoReportView = Backbone.View.extend({
        collection: new IndividualReportCollection(),
        id: 'geo-report',
        initialize: function(options) {
            this.template = _.template(TableTemplate);
            this.loaded = false;

            // box around Navy Pier using decimal degrees (EPSG 4326 / WGS 84)
            this.north = 41.893377;
            this.south = 41.888932;
            this.east = -87.597486;
            this.west = -87.611085;
            this.collection.bind('sync', function(){ this.loaded=true; this.render(); }, this);
            this.collection.fetch({
                data: {
                    'latitude__lte': this.north,
                    'latitude__gte': this.south,
                    'longitude__lte': this.east,
                    'longitude__gte': this.west,
                    'limit': 200
                }
            });
            this.render();
        },
        render: function() {
            this.$el.empty() //Clear out the content
            
            if (!this.loaded){ 
                return this; //Don't add anything if nothing is loaded
            }

            data = this.collection.map(function(model){
                return model.attributes;
            })

            this.$el.append(this.template({
                'title': 'Crimes inside a lat/lng area',
                'data': data,
                'order': ["crime_date", "primary_type", "description"]
            }));
            return this;
        }
    });

    return GeoReportView;

});
