// Generic collection that uses JSONP by default for portability and parses out
// Tastypie API format.

define([ 'jquery', 'backbone' ], function($, Backbone) {

    var CrimeCollection = Backbone.Collection.extend({
        sync: function(method, model, options) {
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                data: {'format': 'jsonp'},
                url: this.url,
            }, options);
            return $.ajax(params);
        },
        parse: function(data) {
            // Parse out 'meta' and return 'objects'
            this.meta = data.meta;
            return data.objects;
        },
    });

    return CrimeCollection;

});
