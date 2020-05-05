import math
from scipy.spatial import cKDTree
from scipy import inf

class Cluster(object):
    
    def __init__(self, id):
        self.id = id
        self.points = 0
        self.max_lon = 0
        self.min_lon = 999
        self.max_lat = 0
        self.min_lat = 999
    
class Point(object):
    
    cluster_label = 0 #static variable

    def __init__(self,lon,lat):
        self.lon = lon
        self.lat = lat
        self.cluster = 0 # 0-the point doesn't belong to any cluster
        self.noise = False
            
    def set_cluster(self, cluster):
        self.cluster = cluster

    def get_lat(self):
        return self.lat
    
    def get_lon(self):
        return self.lon

    def get_cluster(self):
        return self.cluster

    def update(self, lat, lon):
        self.lat = lat
        self.lon = lon

def Retrieve_Neighbours(point, E, Points): #returns list of objects
    
    counter = 0
    stack = []
    neighbour_list = []
    stack.append(point)
    neighbour_list.append(point)

    while len(stack) !=0: 
        counter+=1
        center = stack.pop()
        x_coord = center.get_lat()
        y_coord = center.get_lon()

        for po in Points:
            if po not in neighbour_list:

                x1_coord = po.get_lat()
                y1_coord = po.get_lon()

                r = abs(x_coord - x1_coord)**2 + abs(y_coord - y1_coord)**2
                r = math.sqrt(r)

                if r < float(E):
                    stack.append(po)
                    neighbour_list.append(po)
 
    return neighbour_list

def st_dbscan(D, E, Min_pts):

    for point in D:
        if point.cluster == 0:
            neightbours_list = Retrieve_Neighbours(point, E, D)

            if len(neightbours_list) < int(Min_pts):
                point.noise = True # -1 represents noise
            else:
                Point.cluster_label = Point.cluster_label + 1
              
                current_cluster_label = Point.cluster_label

                for neighbour in neightbours_list:
                    neighbour.cluster = current_cluster_label
                    
                neightbours_list.remove(point)
                stack = neightbours_list.copy()
                

                while len(stack)>0:
                    cur_obj = stack.pop()
                    cur_neighbours_list = Retrieve_Neighbours(cur_obj, E, D)

                    if len(cur_neighbours_list) >= int(Min_pts):

                        for obj in cur_neighbours_list:
                            if obj.noise is False and obj.cluster == 0: #verificare cluster avg
                                obj.cluster = current_cluster_label
                                stack.append(obj)