import random
from datetime import datetime
import json
from db_scan import Point, Cluster
import plotly.graph_objects as go

root_coordinates = [44.42733072016657, 26.103258285766596] #piata unirii BuChArEsT
lon_range = [26.07, 26.15] #rangeul Bucurestiului longitudinal
lat_range = [44.40, 44.460001] #rangeul Bucurestiului latitudinal
max_lat = 0.009 # 1 km convertit in grade latitudinale ( sper ca e corect spus)

lat = []
lon = []

def generate_points(point_number): #generate first set of points

    point_list = []
    random.seed(datetime.now())

    for _ in range(0, int(point_number)):
        lat,lon = _generate_new_coord(root_coordinates[0], root_coordinates[1])
        point = Point(lat,lon)
        point_list.append(point)

    return point_list


def new_coordinates(points_list):  #regenrate points starting from old coordinates

    for _ in points_list:
        _.lat, _.lon = _generate_new_coord(_.lat,_.lon)


def _generate_new_coord(old_lat,old_lon):

    new_lat = random.uniform(-0.00880, 0.00880) #generate new latitude point movement ( up to 1 km range)
    final_lat = new_lat + old_lat

    while final_lat > lat_range[1] or final_lat < lat_range[0]:
        new_lat = random.uniform(-0.00880, 0.00880)
        final_lat = new_lat + old_lat

    left_lat = max_lat-abs(new_lat) #calculate the distance left to 1 km in lat degrees 
    max_lon = convert_lat_to_lon(left_lat) #convert those lat degrees to lon degrees
    new_lon = random.uniform (-max_lon,max_lon) #generate new longitudinal point movement so that it's maximum distance from the starting point is 1.32 km 
    final_lon = new_lon + old_lon

    while final_lon > lon_range[1] or final_lon < lon_range[0]:
        new_lon = random.uniform (-max_lon,max_lon) 
        final_lon = new_lon + old_lon

    return final_lat, final_lon


def _get_cluster_from_list(cluster_id, cluster_list):

    for _ in cluster_list:
        if ( _.id == cluster_id):
            return _
    return False


def generate_printable_clusters(pt_list): 
    """A function that creates cluster objects and assigns them points. Calculating
    the "center" of the cluster: the center of the circle that includes all the points 
    from the cluster """

    cluster_coord = []
    cluster_list = []

    for point in pt_list:
        cl_id = point.cluster
        
        if cl_id != 0:
            cl = _get_cluster_from_list(cl_id, cluster_list)
            if cl is False:
                cl = Cluster(cl_id)
                cluster_list.append(cl)

            lat = point.get_lat()
            lon = point.get_lon()
            cl.points +=1

            if lat > cl.max_lat:
                cl.max_lat = lat
            if lat < cl.min_lat:
                cl.min_lat = lat
            if lon < cl.min_lon:
                cl.min_lon = lon
            if lon > cl.max_lon:
                cl.max_lon = lon

    for cluster in cluster_list:
        lat_dif = cluster.max_lat - cluster.min_lat
        lon_dif = cluster.max_lon - cluster.min_lon
        cluster.center_lat = cluster.min_lat + lat_dif/2
        cluster.center_lon = cluster.min_lon + lon_dif/2

    return cluster_list


def plot_points_on_map(cl_list):
    mapbox_access_token = "pk.eyJ1IjoiYXBvc3RvbGVzY3VzIiwiYSI6ImNrNjg5MXd0dDAyZ3gzbWxhaTNwOGR1b2oifQ.O-vXy2D0ZN7LUhg0IwIKTQ"

    x_array = []
    y_array = []
    z_array = []
    counter = 0 
   
    for i in cl_list:
        x_array.append(i.center_lon)
        y_array.append(i.center_lat)
        z_array.append(i.points)

    fig = go.Figure(go.Densitymapbox(lat=x_array, lon=y_array, z=z_array, 
                                 radius=z_array))
    fig.update_layout( mapbox=dict(
        accesstoken=mapbox_access_token,
        bearing=0,
        center=go.layout.mapbox.Center(
            lat=44.4268,
            lon=26.1025
        ),
        zoom=12,
    ))
    # fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})
    fig.show()


def conv_lat_to_km(lat):
    return lat*111


def conv_lon_to_km(lon):
    return lon*88


def convert_lat_to_lon(lat): #conversie lat-logitude
    return 0.796460177*lat

