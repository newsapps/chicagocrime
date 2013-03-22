# Current URL

**Version**: beta-1

**URL**: http://crime.chicagotribune.com/api/1.0-beta1/


# Available formats

Append “format=json” or “format=csv” to the end of your query string to return those formats.

# Endpoints

## Crime

**URL**: http://crime.chicagotribune.com/api/1.0-beta1/crime/?format=json

Returns report-level crime data.

A few of the less obvious fields explained:

* *primary_type*: The main type of the crime
* *description*: Provides further detail about the crime’s primary_type. There are X possible values for primary_type and X for description.
* *domestic*: Whether or not the crime was a domestic case.
* *fbi_code*:
* *id*:
* *iucr*:
* *location_description*: What sort of place the crime happened in.
* *neighborhood*: The name of the neighborhood. [how is this assigned?]
* *beat*: The police beat the crime occurred in
* *case_number*: The crime’s unique number in the Chicago PD’s system
* *community_area_number*: The number assigned to the community area by the city of Chicago.
* *crime_date*: Includes hours, minutes and seconds.

### Sample data:
```json
meta: {
    limit: 2
    next: "/api/1.0-beta1/crime/?format=jsonp&limit=2&offset=2&community_area=10"
    offset: 0
    previous: null
    total_count: 1573
}
objects: [
    {
        beat: "1611"
        block: "063XX N NAGLE AVE"
        case_number: "HV379310"
        category: "P"
        classification: "/api/1.0-beta1/crimeclassification/89/"
        community_area: "/api/1.0-beta1/communityarea/10/"
        community_number: 10
        crime_date: "2012-07-12T09:10:00"
        description: "RETAIL THEFT"
        domestic: false
        fbi_code: "06"
        id: "8703207"
        iucr: "0860"
        latitude: 41.9959560990624
        location_description: "DRUG STORE"
        longitude: -87.7876401209694
        neighborhood: null
        primary_type: "THEFT"
        ward: 41
        year: 2012
    },
]
```

*Filterable by: all fields except community area number* [we should fix that]

##Example queries

date range:
http://localhost:8000/api/1.0/crime/?format=json&crime_date__gte=2012-06-05T10:00:00&crime_date__lt=2012-06-06T10:00:00
