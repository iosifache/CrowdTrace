from db_scan import Retrieve_Neighbours, st_dbscan
from db_scan import Point, Cluster
from generate_dots import generate_points, conv_lat_to_km,conv_lon_to_km
import random
import numpy as np
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import plotly.express as px

import pandas as pd

fig1, ax1 = plt.subplots()

def generate_points_test_purpose(pt_number, pt_range):

    pt_list = []

    x = []
    y = []

    for i in range(1,pt_number):
        x_coord = random.randint(-pt_range,pt_range)
        y_coord = random.randint(-pt_range, pt_range)
        pt_list.append(Point(x_coord, y_coord))
        x.append(x_coord)
        y.append(y_coord)

    X = np.array(x)
    Y = np.array(y)

    plt.scatter(X,Y, color="blue")
    plt.suptitle("generarea initala")
    plt.show()
    return pt_list

def test_retrive_neighbours():
    
    pt_list = generate_points(10,200)
    point = pt_list[0]
    
    neigh_list = Retrive_Neighbours(point, 3, pt_list)

    for j in neigh_list:
        print(j.get_lat(), ' ',j.get_lon())

def test_st_dbscan(point_number, min_distance, point_min_nr):

    pt_list = generate_points(point_number)

    st_dbscan(pt_list, min_distance, point_min_nr)

    cluster_numbers = []
    array_list = []

    for i  in pt_list:
        if i.cluster not in cluster_numbers:
            cluster_numbers.append(i.cluster)

    last_val = cluster_numbers.pop()
    print(last_val)
    d = [[] for x in range(0,last_val+1)]

    for i in pt_list:
        d[i.cluster].append(i)

    array_list = []

    for j in d:

        x_list = []
        y_list = []

        for k in j:
            
            x_list.append(k.get_lat())
            y_list.append(k.get_lon())
        
        X = np.array(x_list)
        Y = np.array(y_list)

        l = []
        l.append(X)
        l.append(Y)
        array_list.append(l)

    plt.scatter(array_list[0][0],array_list[0][1],color = "black", label="noise")
    plt.suptitle("dupa clusterizare")
   
    counter = 0
    for j in array_list[1:]:
        plt.scatter(j[0],j[1],color = np.random.rand(3,),label="cluster "+str(counter) )
        counter+=1

    plt.legend(loc="upper left")
    plt.show()

