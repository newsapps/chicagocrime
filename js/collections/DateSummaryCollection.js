// Note the use of CrimeCollection instead of standard Backbone collection
define([ 'backbone', 'collections/CrimeCollection' ], function(Backbone, CrimeCollection) {
    var DateSummaryCollection = CrimeCollection.extend({
        url: CRIME_API_BASE_URL + 'datesummary/' 
    });
    return DateSummaryCollection;
});
