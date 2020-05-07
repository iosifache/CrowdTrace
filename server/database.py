from firebase import firebase
from generate_points import *
from db_scan import *
import time


fire = firebase.FirebaseApplication('https://crowdtrace-database.firebaseio.com/', None)


point_list = []
cluster_list = []

def _search_by_id(point_list, id):
    
    for _ in point_list:
        if _.uuid == id:
            return _
    return False

def upload_initial_points(points_number):
    
    point_list = generate_points(points_number)
    
    for point in point_list:

        fire.put('features/',point.uuid,
            {   
             
                'geometry':
                        {'coordinates':
                            {
                                '0':point.lat,'1':point.lon
                            }
                        }
                ,
                'proprieties':
                        {
                        'id':point.uuid,
                        'timestamp':point.timestamp
                        }
                ,
                'type':'Feature'
            }
          )
    
def fetch_points():
    
    points = fire.get('features/', None)

    for point in points.values():
        coords = point['geometry']['coordinates']
        point_id = point['proprieties']['id']
        
        pt = _search_by_id(point_list, point_id)
        
        if pt is False:
            timestamp = point['proprieties']['timestamp']
            pt = Point(coords[0], coords[1])
            pt.set_point_uuid(point_id)
            pt.set_point_timestamp(timestamp)
            point_list.append(pt)
        
    return True
    
def update_points():
    
   for point in point_list:

        fire.put('features/',point.uuid,
            {   
             
                'geometry':
                        {'coordinates':
                            {
                                '0':point.lat,'1':point.lon
                            }
                        }
                ,
                'proprieties':
                        {
                        'id':point.uuid,
                        'timestamp':point.timestamp
                        }
                ,
                'type':'Feature'
            }
          )
   
def update_cluster(cl_list):

    for cl in cl_list:)
        fire.put('clusters/',cl.id,
            {   
                'center':
                        {
                            'lat':cl.center_lat,
                            'lon':cl.center_lon
                        }
                ,
                'elements': cl.points
                
            }
          )

def start_server(update_time, regenerate_points, max_dist, min_point_nr):
    
    fetch_points()
    
    
    while True:

        if regenerate_points is True:   

            print('generating new coords')
            new_coordinates(point_list)
            
            print('starting point update ...')
            update_points()
            
            print('points succesfully updated')
        else:
            fetch_points()
        
        st_dbscan(point_list, max_dist, min_point_nr)
        
        fire.delete('clusters/', None)
        cluster_list = generate_printable_clusters(point_list).copy()
        
        print('updating clusters ...')
        update_cluster(cluster_list)
        print('cluster updated')
        
        print('sleeping ' + str(update_time) + ' sec')
        time.sleep(update_time)
        
        cluster_list.clear()
  
# execute at the begining to generate new points

# fire.delete('features/', None)
# upload_initial_points(100)

start_server(3,True, 0.0008, 3)
