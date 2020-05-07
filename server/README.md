## How to run :running:
* source ./workenv/bin/activate ( e cam degeaba workenv asta oricum :D) 
* python ./db_scan_test.py 100 0.0008 3 (should plot clusters on a map)
* python ./databse.py 3  0.0008 3 0 (updates points and cluster in firebase) :fire:
<br>database.py arguments:
    - first : refresh database rate in seconds
    - second : distance between two points to be consider in the same cluster
    - third : minimum number of points from a cluster
    - forth: !Optional!  set to 1 if you don't want to regenerate points using our algorithm<br>
    set to any other value to regenerate points coordinates

## Small documentation: :page_with_curl:
### database: 
1. start_server (update_time, regenerate_points, max_dist, min_point_nr)<br>
    * update_time - time interval between two firebase interogations
    * regenerate_points -  set to True if you want to simulate the movement of points on a map<br>
                                    set to False if you update your db from other sources
    * max_dist - maximum distance between two points to be consider in the same cluster (ambiguos measure unit so far)
    * min_points_nr - minimum points number to consider a cluser

2.  upload_initial_points (points_number)<br>
    * Generates <b>points_number</b> and uploads them to firebase

3. update_points () <br>
    * Uploads <b> point_list</b> to firebase

4. update_cluster(cl_list)
    * Uploads each Cluster from <b> cl_list </b> to firebase

5. fetch_points():
    * Retrievs all points from firebase in <b> point_list </b>
### generate_points:
* root_coordinates - coordinates of a base point from where all the other will be generated
* lon_range - points will be generated between these longitudes
* lat_range - points will be generated between these latitudes
* max_lat - the maximum distance from the base point the new point will be generated

1. generate_points (point_number )
    * generates <b>point_number Point</b> objects based on root_coordinates between lon_range, lat_range and max_lat 
    * returns a list of <b>Points</b>

2. new_coordinates ( point_list )
    * upgrades coordinates for each <b>Point</b> in point_list

3. generate_printable_cluster ( pt_list )
    * generates clusters based on <b>Points</b> from pt_list
    * returns list of <b>Cluster</b> objects

### db_scan:
1. st_dbscan(D, E, Min_pts)
    * <b>D</b> represents a list of <b>Point</b> objects
    * <b>E</b> represents the distance between to points to be in the same cluster
    * <b>Min_pts</b> minimum points to be consider a cluster

## Algorithm explained
1. generates/pull sets of points from firebase
2. applies st-dbscan and assigns each point a cluster id; if the point represents<br> noise it will have cluster id "0"
3. cluster objects are created by parsing the points list<br>
each cluster stores the total number of points and it's extreme coordinates 
<br> (maximum and minimum values of latitude/longitude )
4. cluster pseudo-centers are calculated based on their extreme points in the following way :<br>
    * finds the biggest distance in km beetween extreme points ( max_lat - min_lat, max_lon - min_lon)
    * the biggest distance it's going to be the diameter of the circle ( relevant for future upgrades )
    * center of the circle is fixed at the middle of distance between extreme points
5. plot each cluster on Mapbox map in it's center point or update them to firebase

### !! The cluster shape from the map has nothing to do with it's real shape, it represents <br> only the geographical center of the whole clusters points !!
