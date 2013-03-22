# Current URL

**Version**: beta-1

**URL**: http://crime.chicagotribune.com/api/1.0-beta1/

# Available endpoints

* http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=json - Daily summary data [[jump to details](https://github.com/newsapps/chicagocrime/blob/master/api_docs.md#daily-summary-data)]
* http://crime.chicagotribune.com/api/1.0-beta1/crime/?format=json - Report-level crime data [[jump to details](https://github.com/newsapps/chicagocrime/blob/master/api_docs.md#crime-reports)]
* http://crime.chicagotribune.com/api/1.0-beta1/communityarea/?format=json - Community areas [[jump to details](https://github.com/newsapps/chicagocrime/blob/master/api_docs.md#community-area)]
* http://crime.chicagotribune.com/api/1.0-beta1/crimeclassification/?format=json - Crime classifications [[jump to details](https://github.com/newsapps/chicagocrime/blob/master/api_docs.md#crime-classifications)]

# Data formats

Specify data format with the `format` querystring parameter. 

**Supported formats**: `json`, `jsonp`, `xml`, `csv`

# Including fields

Specifying the `include=fieldname1,fieldname2` parameter will include only the fields specified in the querystring, 
plus any required fields (like unique identifier). Omitting the `include` parameter means all available fields will 
be returned.

# Endpoint details

## Daily summary data

Provides counts for every major crime type, by day and community area.

### Fields

**Filterable**:

* `crime_date`
* `community_area` (filter by community area number)
* `year`
* `arson` (arson count)
* `assault` (assault count)
* `battery` (battery count)
* `burglary` (burglary count)
* `criminal_damage` (criminal damge count)
* `homicide` (homicide count)
* `motor_vehicle_theft` (motor_vehicle_theft count)
* `narcotics` (narcotics count)
* `prostitution` (prositution count)
* `robbery` (robbery county)
* `sexual_assault` (sexual assault count)
* `theft` (theft count)

**Unfilterable**:

* `community_name`
* `community_number`

### Example query

http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=jsonp&limit=1&year=2013

```json
meta: {
    limit: 1
    next: "/api/1.0-beta1/datesummary/?format=jsonp&limit=1&offset=1&year=2013"
    offset: 0
    previous: null
    total_count: 5029
}
objects: [
    {
        arson: 0
        assault: 0
        battery: 0
        burglary: 1
        community_area: "/api/1.0-beta1/communityarea/1/"
        community_name: "Rogers Park"
        community_number: 1
        crime_date: "2013-01-01"
        criminal_damage: 0
        homicide: 0
        motor_vehicle_theft: 0
        narcotics: 0
        prostitution: 0
        robbery: 2
        sexual_assault: 0
        theft: 3
        year: 2013
    }
]
```


### Related parameter

When filtering by community area, add the `related=1` parameter to 
your query to get extended community area data in the `meta` key of the 
API response.

http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=jsonp&limit=1&year=2013&community_area=16&related=1 yields:

```json
meta: {
    community_area: {
        adjacent_area_numbers: "4,5,12,14,15,19,20,21"
        area_number: 16
        hardship_index: 30
        name: "Irving Park"
        pct_crowded: "5.6"
        pct_no_diploma: "22.0"
        pct_old_and_young: "31.6"
        pct_poverty: "10.8"
        pct_unemployed: "10.3"
        per_capita_income: 26713
        population: 53359
        shape_area: "89611382.3106"
        shape_len: "49083.2240938"
        slug: "irving-park"
        wikipedia: "Irving Park, Chicago"
    }
    limit: 1
    next: "/api/1.0-beta1/datesummary/?community_area=16&limit=1&offset=1&format=jsonp&year=2013&related=1"
    offset: 0
    previous: null
    total_count: 72
},
objects: [
    {
        arson: 0
        assault: 0
        battery: 0
        burglary: 0
        community_area: "/api/1.0-beta1/communityarea/16/"
        crime_date: "2013-01-01"
        criminal_damage: 0
        homicide: 0
        motor_vehicle_theft: 1
        narcotics: 0
        prostitution: 0
        robbery: 0
        sexual_assault: 1
        theft: 0
        year: 2013
    }
]
```

## Crime reports

**URL**: http://crime.chicagotribune.com/api/1.0-beta1/crime/?format=json

Returns report-level crime data.

## Fields
**Filterable:**

* `primary_type` (the crime's main type)
* `description` (detail about the crime’s primary_type)
* `beat` (police beat the crime occurred in)
* `block`
* `case_number` (the crime’s unique number in the Chicago PD’s system)
* `community_area` (filter by community area number, returns community area detail URL)
* `crime_date` (includes hours, minutes and seconds)
* `domestic` (if the crime was a domestic case)
* `fbi_code`
* `id`
* `iucr` (Illinois Uniform Crime Report code)
* `latitude`
* `longitude`
* `location_description` (what area the crime happened in)
* `neighborhood`
* `ward`
* `year`

**Unfilterable:**
* `category`
* `community_name`
* `community_number`

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

### Related parameter

When filtering by community area, add the `related=1` parameter to 
your query to get extended community area data in the `meta` key of the 
API response. See the example under the Daily Crime Summary endpoint
documentation for more detail.

##Community areas
Use this endpoint to get demographic information about all of Chicago's 77 community areas. This is pretty much only useful to grab info about all of the communities at once. To get data specific to one community area, use the `related=1` query string parameter. (See the example under the Daily Crime Summary endpoint documentation for more detail.)

###Fields

**Unfilterable:**
* `adjacent_area_numbers`
* `area_number`
* `hardship_index`
* `name`
* `pct_crowded`
* `pct_no_diploma`
* `pct_old_and_young`
* `pct_poverty`
* `pct_unemployed`
* `per_capita_income`
* `population`
* `shape_area`
* `shape_len`
* `slug`
* `wikipedia`

###Example query
http://crime.chicagotribune.com/api/1.0-beta1/communityarea/?format=json
```json
meta: {
    limit: 100,
    next: null,
    offset: 0,
    previous: null,
    total_count: 77
},
objects: [
    {  
        adjacent_area_numbers: "2,77",
        area_number: 1,
        hardship_index: 39,
        name: "Rogers Park",
        pct_crowded: "7.9",
        pct_no_diploma: "18.1",
        pct_old_and_young: "28.8",
        pct_poverty: "22.7",
        pct_unemployed: "7.5",
        per_capita_income: 23714,
        population: 54991,
        shape_area: "51259902.4506",
        shape_len: "34052.3975757",
        slug: "rogers-park",
        wikipedia: "Rogers Park, Chicago"
    }
]
```

## Crime classifications

Provides context about crime classifications and what they indicate.

###Fields
**Unfilterable:**
* `category` (values indicate a violent crime, property crime, quality-of-life crime or no designation)
* `classification` (official three-letter code for crime, which could be null)
* `id`
* `index_code`
* `iucr`
* `primary_description` (crime type, corresponding to classification)
* `secondary_description` (details about primary description)

### Example query

http://crime.chicagotribune.com/api/1.0-beta1/crimeclassification/?format=json
```json
meta: {
    limit: 100,
    next: "/api/1.0-beta1/crimeclassification/?offset=100&limit=100&format=json",
    offset: 0,
    previous: null,
    total_count: 391
},
objects: [
    {
        category: "V",
        classification: "HOM",
        id: "1",
        index_code: "I",
        iucr: "0110",
        primary_description: "HOMICIDE",
        secondary_description: "FIRST DEGREE MURDER"
    }
]
```
