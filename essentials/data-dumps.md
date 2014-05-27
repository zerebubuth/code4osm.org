#Data dumps

Or, how to consume OpenStreetMap data.

##Planet
The canonical method of consuming OpenStreetMap data requires non-trivial hardware.  A snapshot of the current OpenStreetMap data base is acquired, loaded into a local data base, and then consumed by local tools.  

1. Download current data base called a ["Planet File"](http://planet.osm.org/)
2. Setup local data base
3. Load data into local data base with [osm2pgsql](http://wiki.openstreetmap.org/wiki/Osm2pgsql) or Osmium(?)

###Periodic updates
Once you have a local, current data base, you might choose to update the data periodically, or create a new data base from scratch. Your choice will depend on your area of interest, frequency of updates, and perhaps other factors. Learn about [Updating your data base](data-diffs.md).


##Regions
If your geographical area of interest is substantially smaller than the entire planet, consider using a "Planet extract". Various third party sources create planet extracts on various schedules.  

The process of consuming that data is the same as for the entire planet, but the files are smaller. This may reduce the requirements for hardware and for time consumed in loading the local data base.  

* [List of third party planet extract sources](http://wiki.openstreetmap.org/wiki/Planet.osm#Country_and_area_extracts)

##Cities
For geographic interests that are limited to "city sized" areas, some specialty, small extracts are available from third parties.

* [Metro area extracts](http://wiki.openstreetmap.org/wiki/Planet.osm#Country_and_area_extracts)
