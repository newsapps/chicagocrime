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
beat: "2122",
block: "028XX S DR MARTIN LUTHER KING JR DR",
case_number: "HT235416",
community_area: "Douglas",
community_area_number: 35,
crime_date: "2011-04-05T10:00:00",
description: "SIMPLE",
domestic: true,
fbi_code: "08A",
id: "8003659",
iucr: "0560",
latitude: 41.8426921741942,
location_description: "RESTAURANT",
longitude: -87.6170730833713,
neighborhood: "Prairie Shores",
primary_type: "ASSAULT",
ward: 4,
year: 2011

*Filterable by: all fields except community area number* [we should fix that]

##Example queries

date range:
http://localhost:8000/api/1.0/crime/?format=json&crime_date__gte=2012-06-05T10:00:00&crime_date__lt=2012-06-06T10:00:00
