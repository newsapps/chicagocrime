// Abstract base collection class that uses JSONP by default for portability
// and parses out Tastypie API format into something Backbone-ready.
define([ 'jquery', 'backbone' ], function($, Backbone) {

    var CrimeCollection = Backbone.Collection.extend({
        sync: function(method, model, options) {
            // Override default sync method to use jsonp for portability and fire
            // event
            this.trigger("fetch");
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                data: {'format': 'jsonp'},
                url: this.url,
            }, options);
            return $.ajax(params);
        },
        parse: function(data) {
            // Add Tastypie's 'meta' property as collection attribute
            this.meta = data.meta;

            // Return Tastypie's 'objects' property as collection data
            return data.objects;
        },
    });

    return CrimeCollection;

});
