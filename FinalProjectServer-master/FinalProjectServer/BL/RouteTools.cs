using System;
using System.Collections.Generic;

public class Point
{
    private double _latitude;
    private double _longitude;

    public double latitude { get => _latitude; set => _latitude = value; }
    public double longitude { get => _longitude; set => _longitude = value; }

}

public class StudentPoint : Point {
    private string _id;

    public string id { get => _id; set => _id = value; }

}

public class Waypoint
{
    private Point _point;

    public Point point { get => _point; set => _point = value; }
}

public class Options
{
    public string TravelMode { get; set; }
    public int VehicleMaxSpeed { get; set; }
}

public class Route
{
    private List<Point> _waypoints;

    private Options _options;

    public List<Point> waypoints { get => _waypoints; set => _waypoints = value; }
    public Options options { get => _options; set => _options = value; }
}

public class School
{
    public double lat { get; set; }
    public double lng { get; set; }
    public string dest { get; set; }
}

