define([ 'backbone', 'collections/CrimeCollection' ], function(Backbone, CrimeCollection) {
    var CommunityAreaCollection = CrimeCollection.extend({
        url: CRIME_API_BASE_URL + 'communityarea/' 
    });
    return CommunityAreaCollection;
});
