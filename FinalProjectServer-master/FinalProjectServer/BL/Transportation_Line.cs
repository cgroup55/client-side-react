using System.Text.Json;
using System.Text.Json.Nodes;
using System.Globalization;
using System.Reflection;
using System.Text;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Collections.Generic;
using System;

namespace final_proj.BL
{
    public class TransportationLine
    {
        static readonly HttpClient client = new HttpClient();

        private int line_code;
        private DateTime definition_date;
        private string line_car;
        private int number_of_seats;
        private string school_of_line;
        private string station_definition;
        private string escort_incharge;
        private string transportation_company;
        private string time_of_line;
        private string comments;
        private List<string> studentsId;

        public TransportationLine()
        {
        }

        public TransportationLine(int line_code, DateTime definition_date, string line_car, int number_of_seats, string school_of_line, string station_definition, string escort_incharge, string transportation_company, string time_of_line, string comments)
        {
            this.line_code = line_code;
            this.definition_date = definition_date;
            this.line_car = line_car;
            this.number_of_seats = number_of_seats;
            this.school_of_line = school_of_line;
            this.station_definition = station_definition;
            this.escort_incharge = escort_incharge;
            this.transportation_company = transportation_company;
            this.time_of_line = time_of_line;
            this.comments = comments;
            StudentsId = new List<string>();
        }


        public int Line_code { get => line_code; set => line_code = value; }
        public DateTime Definition_date { get => definition_date; set => definition_date = value; }
        public string Line_car { get => line_car; set => line_car = value; }
        public int Number_of_seats { get => number_of_seats; set => number_of_seats = value; }
        public string School_of_line { get => school_of_line; set => school_of_line = value; }
        public string Station_definition { get => station_definition; set => station_definition = value; }
        public string Escort_incharge { get => escort_incharge; set => escort_incharge = value; }
        public string Transportation_company { get => transportation_company; set => transportation_company = value; }
        public string Time_of_line { get => time_of_line; set => time_of_line = value; }
        public string Comments { get => comments; set => comments = value; }
        public List<string> StudentsId { get => studentsId; set => studentsId = value; }

        public int Insert()
        {
            DBservicesTransportation_Line dbs = new DBservicesTransportation_Line();
            return dbs.InsertTransportationLine(this);
        }

        public int Update()
        {
            DBservicesTransportation_Line dbs = new DBservicesTransportation_Line();
            return dbs.UpdateTransportationLine(this);
        }

        public static List<TransportationLine> Read()
        {
            try
            {
                DBservicesTransportation_Line dbs = new DBservicesTransportation_Line();
                List<TransportationLine> lineList = dbs.GetLines();

                foreach (TransportationLine line in lineList)
                {
                    line.StudentsId = dbs.GetStudentsInLine(line.Line_code);
                }

                return lineList;
            }
            catch (SqlException ex)
            {
                // Handle SQL exceptions
                throw new Exception("A database error occurred while retrieving the transportation lines or student IDs.", ex);
            }
            catch (Exception ex)
            {
                // Handle all other exceptions
                throw new Exception("An error occurred while retrieving the transportation lines or student IDs.", ex);
            }
        }

        //this function gets Linecode and return all details of this specific transportation line and List of this students in this transportation Line 
        public object ReadByLineCode(int linecode)
        {
            try
            {
                DBservicesTransportation_Line dbs = new DBservicesTransportation_Line();
                List<string> stuid = new List<string>();
                stuid = dbs.GetStudentsInLine(linecode);

                TransportationLine mytl = new TransportationLine();
                mytl = dbs.gettransportaiondetail(linecode);

                var studeentsofline = new { transportaionline = mytl, studentid = stuid };
                return studeentsofline;
            }
            catch (SqlException ex)
            {
                // Handle SQL exceptions
                throw new Exception("A database error occurred while retrieving the transportation line details or student IDs.", ex);
            }
            catch (Exception ex)
            {
                // Handle all other exceptions
                throw new Exception("An error occurred while retrieving the transportation line details or student IDs.", ex);
            }
        }



        //this function gets Linecode and return all students stations of this Linecode 
        public List<object> ReadRouteinfo(int linecode)
        {
            try
            {
                DBservicesTransportation_Line dbs = new DBservicesTransportation_Line();
                return dbs.getRouteinfo(linecode);
            }
            catch (SqlException ex)
            {
                // Handle SQL exceptions (e.g., connection issues, query syntax errors)
                throw new Exception("A database error occurred while retrieving route information.", ex);
            }
            catch (Exception ex)
            {
                // Handle all other exceptions
                throw new Exception("An error occurred while retrieving route information.", ex);
            }
        }



        //this function return the order of station with API to TOMTOM -the function send to TOMTOM the latitude and longitude of all student , and get the order of the stations 
        public async Task<int> CreateOptimalRoute(List<StudentPoint> studentPoints, int linecode, School school)
        {
            try
            {
                bool isSchoolStart = true;
                List<Point> waypoints = new List<Point>();
                // Add student points to waypoints
                foreach (StudentPoint st in studentPoints)
                {
                    Point p = new Point();
                    p.latitude = st.latitude;
                    p.longitude = st.longitude;
                    waypoints.Add(p);
                }

                // Create the URL for TomTom API
                string url = "https://api.tomtom.com/routing/waypointoptimization/1?key=pQ2wOkN7gW5AktUC12urg6Z2M8lkiIFH";

                // Create the waypoints to send in JSON format
                JArray waypointsToSend = new JArray();
                foreach (Point point in waypoints)
                {
                    //defines a JSON object
                    JObject o = new JObject();
                    //creates a key value sturcture in JSON according to token
                    o.Add("point", JToken.FromObject(point));
                    waypointsToSend.Add(o);
                }
               
                //Parse the school object
                Point schoolPoint = new Point
                {
                    latitude = school.lat,
                    longitude = school.lng
                };
                JObject schoolJsonObject = new JObject
                {
                    { "point", JToken.FromObject(schoolPoint) }
                };

                int originIndex = -1;
                int destinationIndex = -1;

                // Add school point as origin or destination
                if (school.dest == "מוצא")
                {
                    waypointsToSend.Insert(0, schoolJsonObject); // Add as origin (first point)
                    originIndex = 0;
                }
                else if (school.dest == "יעד")
                {
                    waypointsToSend.Add(schoolJsonObject); // Add as destination (last point)
                    destinationIndex = waypointsToSend.Count - 1;
                    isSchoolStart = false;
                }

                // Create the options object with waypoint constraints
                JObject options = new JObject();
                JObject waypointConstraints = new JObject();

                if (originIndex != -1)
                {
                    waypointConstraints.Add("originIndex", originIndex);
                    waypointConstraints.Add("destinationIndex", destinationIndex);
                }

                if (destinationIndex != -1)
                {
                    waypointConstraints.Add("originIndex", originIndex);
                    waypointConstraints.Add("destinationIndex", destinationIndex);
                }

                options.Add("waypointConstraints", waypointConstraints);

                // Create the final JSON object
                JObject obj = new JObject
                {
                    { "waypoints", waypointsToSend },
                    { "options", options }
                };         


                // Send the request to TomTom API
                HttpClient client = new HttpClient();
                var response = await client.PostAsync(url, new StringContent(obj.ToString().Replace("{{", "{").Replace("}}", "}"), Encoding.UTF8, "application/json"));
                string responseBody = await response.Content.ReadAsStringAsync();

                //parse to JSON object to reach the exact field of the optimized route
                JObject res = JObject.Parse(responseBody);

                // Check if the "optimizedOrder" property exists
                if (res.TryGetValue("optimizedOrder", out JToken optimizedOrderToken) && optimizedOrderToken != null)
                {
                    // Check if the "optimizedOrder" property has a length >= 1
                    if (optimizedOrderToken.Count() > 1)
                    {
                        // Deserialize the "optimizedOrder" property
                        List<int> order = JsonConvert.DeserializeObject<List<int>>(optimizedOrderToken.ToString());

                        //new list with fit positions
                        List<StudentPoint> newStudentPoint;
                        if (isSchoolStart)
                        {
                            // Create a new list with null at the first position and then add all studentPoints
                            newStudentPoint = new List<StudentPoint> { null };
                            newStudentPoint.AddRange(studentPoints);
                        }
                        else
                        {
                            // Directly copy studentPoints to newStudentPoint
                            newStudentPoint = new List<StudentPoint>(studentPoints);
                        }

                       
                        
                        List<StudentPoint> optimizedPoints = new List<StudentPoint>();

                        //new chng Elior
                        if (isSchoolStart) //skip first point
                        {
                            for (int i = 1; i < order.Count; i++)
                            {
                                optimizedPoints.Add(newStudentPoint[order[i]]);
                            }
                        }
                        else
                        {
                            for (int i = 0; i < order.Count - 1; i++) //skip last point
                            {
                                optimizedPoints.Add(newStudentPoint[order[i]]);
                            }
                        }

                        //send to db for storing the order
                        string saveToDB = "";
                        for (int i = 0; i < optimizedPoints.Count; i++)
                        {
                            saveToDB += $"{linecode},{i},{optimizedPoints[i].id}|";
                        }

                        saveToDB = saveToDB.Remove(saveToDB.Length - 1);
                        TransportationLine mytl = new TransportationLine();
                        int result = mytl.SaveStudentsPositionInRoute(saveToDB);

                        return result;
                    }
                    else
                    {
                        throw new Exception("The 'optimizedOrder' property has a length less than 2 in the JSON response.");
                    }
                }
                else
                {
                    // Handle the case where "optimizedOrder" property is missing or null
                    throw new Exception("The 'optimizedOrder' property is missing or null in the JSON response.");
                }
            }
            catch (Exception ex)
            {
                // Handle other exceptions
                throw new Exception("Error processing the response: " + ex.Message, ex);
            }
        }

        public async Task<int> InsertStudentsAndGetOptimalRoute(string students, int linecode)
        {
            DBservicesTransportation_Line dbs = new DBservicesTransportation_Line();
            //add all students to line
            int numaffected = dbs.InsertStudentsToLine(students, linecode);

            //get all adresses of students in line
            List<StudentPoint> waypoints = dbs.GetAdressfromParent(linecode);

            //get school line info
            School school = getschool(linecode);

            int result = await CreateOptimalRoute(waypoints, linecode, school);
            return result;
        }


        //save the order of the students in the database-position 
        public int SaveStudentsPositionInRoute(string save)
        {
            try
            {
                DBservicesTransportation_Line dbs = new DBservicesTransportation_Line();
                int numaffected = dbs.saveindb(save);
                return numaffected;
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                // Log the error or handle it appropriately
                throw new Exception("Foreign key constraint violation: transportation company or escort not found.", ex);
            }
            catch (SqlException ex)
            {
                // Log the error or handle it appropriately
                throw new Exception("Database error: " + ex.Message, ex);
            }
            catch (Exception ex)
            {
                // Log the error or handle it appropriately
                throw new Exception("Error saving to database: " + ex.Message, ex);
            }
        }



        public School getschool(int linecode)
        {
            DBservicesTransportation_Line dbs = new DBservicesTransportation_Line();
            School school = dbs.getschoolinfo(linecode);
            return school;
        }
    }
}
