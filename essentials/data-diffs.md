#Keep your data base up to date
A local OpenStreetMap data base can be kept up to date by way of [periodic updates](http://wiki.osm.org/wiki/Minutely_Mapnik).  

Related terms are:
* Replication files
* Minutely updates

Updates may only be applied to local data bases that were originally populated with the "--slim" option enabled.  

##Terms

###Replication interval

The replication interval limits the number of updates applied to the local data base in one update operation.  A replication interval of 1440 includes all of the edits from a 1440 minute (24 hour) period. 

An arbitrary replication interval may be selected.  Shorter intervals are less efficient due to start-up overhead.  Longer intervals are less efficient due to larger file size.  As a rule of thumb, consider a replication period of 1440 minutes as a starting point.  Replication interval should be longer than update period.

###Update period

An arbitrary update period may be selected.  Your intended application, available hardware, and other factors will inform your choice.  Try every six hours to start as a rule of thumb.


##Updating your local data base

1. Create and populate your local data base, using the "--slim" option
2. Select a state file prior to the creation time of your planet file
3. Set replication interval
4. Initialize replication
5. Use cron to run replication at your chosen update period




#Tools required

* PostgreSQL
* PostGIS
* osm2pgqsl
* osmosis
* cron
