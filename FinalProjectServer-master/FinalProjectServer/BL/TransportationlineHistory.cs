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
    public class TransportationLineHistory
    {

        private int linecode;
        private DateTime timeofstart;
        private DateTime timeofend;
        private string comments;




        public int Line_code { get; set; }
        public DateTime Time_of_start { get; set; }
        public DateTime Time_of_end { get; set; }
        public string Comments { get; set; }

        // Default constructor
        public TransportationLineHistory()
        {
        }

        // Parameterized constructor
        public TransportationLineHistory(int line_code, DateTime time_of_start, DateTime time_of_end, string comments)
        {
            Line_code = line_code;
            Time_of_start = time_of_start;
            Time_of_end = time_of_end;
            Comments = comments;
        }

        public int Insert()
        {
            DBservicesTransportationLineHistory dbs = new DBservicesTransportationLineHistory();
            return dbs.InsertTransportationLineHistory(this);
        }


        public static List<TransportationLineHistory> Read(int linecode)
        {
            DBservicesTransportationLineHistory dbs = new DBservicesTransportationLineHistory();
            return dbs.GetTransportationLineHistory(linecode);
        }

    }
}