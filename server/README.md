## How to run :running:
* source ./workenv/bin/activate ( e cam degeaba workenv asta oricum :D) 
* python ./db_scan_test.py 100 0.0008 3

### db_scan_test arguments:

1. number of points to be generated
2. distance between two points to be consider in the same cluster ( it's a strange longitude-latitude degrees combination so far so take it is)
3. minimum number of points to form a cluster

## Algorithm explained
1. generates/pull sets of points
2. applies st-dbscan and assigns each point a cluster id; if the point represents<br> noise it will have cluster id "0"
3. cluster objects are created by parsing to points list<br>
each cluster stores the total number of points and it's extreme coordinates 
<br> (maximum and minimum values of latitude/longitude )
4. cluster pseudo-centers are calculated based on their extreme points in the following way :<br>
    * finds the biggest distance in km beetween extreme points ( max_lat - min_lat, max_lon - min_lon)
    * the biggest distance it's going to be the diameter of the circle ( relevant for future upgrades )
    * center of the circle is fixed at the middle of distance between extreme points
5. plot each cluster on Mapbox map in it's center point

### !! The cluster shape from the map has nothing to do with it's real shape, it represents <br> only the geographical center of the whole clusters points !!
