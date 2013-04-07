define([ 'backbone', 'collections/CrimeCollection' ], function(Backbone, CrimeCollection) {
    var IndividualReportCollection = CrimeCollection.extend({
        url: CRIME_API_BASE_URL + 'crime/' 
    });
    return IndividualReportCollection;
});
