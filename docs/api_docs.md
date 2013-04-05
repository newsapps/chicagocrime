# The Chicago Crime API

## Versions

* **1.0-beta-1** - Provides daily summary, crime report, community area, 
and crime classification API endpoints.<br />**Base URL** - http://crime.chicagotribune.com/api/1.0-beta1/

## Available endpoints

* **Daily summary data** [[jump to details](#daily-summary-data)]
<br />http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=json<br />
* **Report-level crime data** [[jump to details](#crime-reports)]
<br />http://crime.chicagotribune.com/api/1.0-beta1/crime/?format=json<br />
* **Community areas** [[jump to details](#community-area)]
<br />http://crime.chicagotribune.com/api/1.0-beta1/communityarea/?format=json<br />
* **Crime classifications** [[jump to details](#crime-classifications)]
<br />http://crime.chicagotribune.com/api/1.0-beta1/crimeclassification/?format=json<br />

## Data formats

Specify data format with the `format` querystring parameter. 

**Supported formats**: `json`, `jsonp`, `xml`, `csv`

## Including fields

Specifying the `include=fieldname1,fieldname2` parameter will include only the fields specified in the querystring, 
plus any required fields (like unique identifier). Omitting the `include` parameter means all available fields will 
be returned.

## Filtering on fields
The daily summary and report-level crime endpoints support filtering by field, allowing you to restrict your search results. You can append filters to your query string to return a narrower set of results. These take the form factor `&fieldname=desired_value`. Details about which fields are filterable may be found in the description of the endpoints below.

## Endpoint details

### Daily summary data

Provides counts for every major crime type, by day and community area.

Default limit: 100 records

Maximum limit: None

Default ordering: Chronological

**The following fields can be used to restrict your search results**:

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

**The following fields will be present for every search you conduct**:

* `community_name`
* `community_number`

#### Example query

http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=jsonp&limit=1&year=2013

<div data-api-url="http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=jsonp&limit=1&year=2013"></div>


#### Related parameter

When filtering by community area, add the `related=1` parameter to 
your query to get extended community area data in the `meta` key of the 
API response.

http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=jsonp&limit=1&year=2013&community_area=16&related=1 yields:

<div data-api-url="http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=jsonp&limit=1&year=2013&community_area=16&related=1"></div>

### Report-level crime data 

**URL**: http://crime.chicagotribune.com/api/1.0-beta1/crime/?format=json

Returns a list of all crimes in the database in reverse chronological order.

Default limit: 100 records

Maximum limit: 1000 records

Default ordering: Reverse chronological order (`crime_date`)

**The following fields will be present for every search you conduct:**

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

**The following fields will be present for every search you conduct:**
* `category`
* `community_name`
* `community_number`

#### Example queries

http://crime.chicagotribune.com/api/1.0-beta1/crime/?format=jsonp&limit=1&community_area=10&crime_date__gte=2012-01-01

<div data-api-url="http://crime.chicagotribune.com/api/1.0-beta1/crime/?format=jsonp&limit=1&community_area=10&crime_date__gte=2012-01-01"></div>

#### Related parameter

When filtering by community area, add the `related=1` parameter to 
your query to get extended community area data in the `meta` key of the 
API response. See the example under the Daily Crime Summary endpoint
documentation for more detail.

### Community areas
Use this endpoint to get demographic information about all of Chicago's 77 community areas. This is useful to retrieve data about all community areas at once. To get data specific to one community area, use the `related=1` query string parameter. (See the example under the Daily Crime Summary endpoint documentation for more detail.)

Default ordering: None

**The following fields will be present for every search you conduct:**

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

#### Example query

http://crime.chicagotribune.com/api/1.0-beta1/communityarea/?format=jsonp&limit=1

<div data-api-url="http://crime.chicagotribune.com/api/1.0-beta1/communityarea/?format=jsonp&limit=1"></div>

### Crime classifications

Provides context about crime classifications and what they indicate.

Default ordering: None

**The following fields will be present for every search you conduct:**

* `category` (values indicate a violent crime, property crime, quality-of-life crime or no designation)
* `classification` (official three-letter code for crime, which could be null)
* `id`
* `index_code`
* `iucr`
* `primary_description` (crime type, corresponding to classification)
* `secondary_description` (details about primary description)

#### Example query

http://crime.chicagotribune.com/api/1.0-beta1/crimeclassification/?format=jsonp&limit=5

<div data-api-url="http://crime.chicagotribune.com/api/1.0-beta1/crimeclassification/?format=jsonp&limit=5"></div>

