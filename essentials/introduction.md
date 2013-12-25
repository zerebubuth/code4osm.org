# Introduction

    +---------+    +--------------+                    +-------------+    +-----+
    | Surveys | -> | Contributors | -+---------------> | OSM website | -> | OSM |
    +---------+    +--------------+  |                 +-------------+    | DB  |
                          ^          |   +---------+                      +-----+
                          |          |   | Editing |    +-------------+     ^  |
                          |          `-> |  tools  | -> | Editing API | ----'  |
           ,--------------+              +---------+    +-------------+        |
           |              |                                                    v
           v              |            +-------+                     +-----------+
    +-----------+         +----------- | Tiles | <----------+------- | Dumps and |
    | Data      |         |            +-------+            |        |   diffs   |
    | Consumers |         |                                 |        +-----------+
    +-----------+         |            +-----------+        |
                          +----------- | Search &  | <------+
                          |            | geocoding |        |
                          |            +-----------+        |
                          |                                 |
                          |            +-------------+      |
                          `----------- | Other tools | <----+
                                       +-------------+

This diagram is a high level summary of what the data flow looks like
around the OpenStreetMap system. Although the arrows are one-way, much
of the communication is two-way and the direction of the arrow is only
intended to show a "provides data to" relationship.

Briefly,

* Contributors collect data and information which they want to put
  into OpenStreetMap, from surveys or other sources. This is generally
  done up-front, although the increasing sophistication of smartphone
  editing tools is making in-situ contribution more practical. For
  more information, see
  [the section on data capture tools](data-capture-tools.html).
* Contributors organise the data which they want to put into
  OpenStreetMap and upload it either via the [web site](website.html),
  or using one of the [editing tools](editing-tools.html) via the
  [editing API](editing-api.html).
* The OpenStreetMap web site and editing API store the information in
  the [database](database.html), where it is available immediately via
  the editing API or via the dumps and diffs.
* OpenStreetMap makes regular, and very large, data dumps available of
  both the current state of the database and the editing history of
  the database. Due to their size (many tens of gigabytes) dumps are
  made regularly, but only periodically. For more information, please
  see the section on [data dumps](data-dumps.html). 
* Information about the updates to the data is available also as a
  stream of "diffs" which can be applied to keep external data sources
  up to date. For more information, please see the section on
  [data diffs](data-diffs.html).
* Many tools consume the data dumps and diffs and transform the
  OpenStreetMap data into other forms. For example, there are many
  tools which create geographic databases suitable for
  [rendering maps](tile-serving.html), [searching](searching.html),
  [routing](routing.html), data analysis and export to other formats.
* Closing the loop, many of these output formats are used directly by
  contributors, or in the tools they use, to help improve the map
  further.
