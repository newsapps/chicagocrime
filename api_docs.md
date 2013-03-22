# Current URL

**Version**: beta-1

**URL**: http://crime.chicagotribune.com/api/1.0-beta1/

# Data formats

Specify data format with the `format` querystring parameter. 

**Supported formats**: `json`, `jsonp`, `xml`, `csv`

# Endpoints

## Crime reports

**URL**: http://crime.chicagotribune.com/api/1.0-beta1/crime/?format=json

Returns report-level crime data.

## Fields

* *primary_type*: The main type of the crime
* *description*: Provides further detail about the crime’s primary_type. There are X possible values for primary_type and X for description.
* *domestic*: Whether or not the crime was a domestic case.
* *fbi_code*:
* *iucr*:
* *location_description*: What sort of place the crime happened in.
* *neighborhood*: The name of the neighborhood. [how is this assigned?]
* *beat*: The police beat the crime occurred in
* *case_number*: The crime’s unique number in the Chicago PD’s system
* *community_area_number*: The number assigned to the community area by the city of Chicago.
* *crime_date*: Includes hours, minutes and seconds.

### Example queries

http://crime.chicagotribune.com/api/1.0-beta1/crime/?format=jsonp&limit=1&community_area=10&crime_date__gte=2012-01-01

```json
meta: {
    limit: 1
    next: "/api/1.0-beta1/crime/?limit=1&format=jsonp&community_area=10&crime_date__gte=2012-01-01&offset=1"
    offset: 0
    previous: null
    total_count: 761
}
objects: [
    {
        beat: "1613"
        block: "049XX N NEENAH AVE"
        case_number: "HV237876"
        category: "P"
        classification: "/api/1.0-beta1/crimeclassification/84/"
        community_area: "/api/1.0-beta1/communityarea/10/"
        community_number: 10
        crime_date: "2012-01-01T00:01:00"
        description: "FINANCIAL ID THEFT: OVER $300"
        domestic: false
        fbi_code: "06"
        id: "8562819"
        iucr: "0840"
        latitude: 41.970780822155
        location_description: "OTHER"
        longitude: -87.7905431601999
        neighborhood: null
        primary_type: "THEFT"
        ward: 41
        year: 2012
    }
]
```

## Summary data

### Filterable fields

* `crime_date`
* `community_area`
* `year`
* `arson`
* `assault`
* `battery`
* `burglary`
* `criminal_damage`
* `homicide`
* `motor_vehicle_theft`
* `narcotics`
* `prostitution`
* `robbery`
* `sexual_assault`
* `theft`


### Custom parameters

When filtering by community area, add the `related=1` parameter to 
your query to get extended community area data in the `meta` key of the 
API response.
