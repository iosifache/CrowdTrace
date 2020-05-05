import sys
from db_scan import Point, Cluster, st_dbscan
from generate_points import generate_points, generate_printable_clusters, plot_points_on_map

if __name__ == "__main__":

    points = generate_points(sys.argv[1]) #generate random points
    st_dbscan(points, sys.argv[2], sys.argv[3]) #cluster the points
    clusters = generate_printable_clusters(points) #retrive a list of clusters
    plot_points_on_map(clusters) #plot clusters in MapBox

