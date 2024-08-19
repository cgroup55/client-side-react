using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using final_proj;
using final_proj.BL;
using final_proj.Controllers;
using System.Text.Json;
using System.Xml.Linq;
public class DBservicesTransportationLineHistory : GeneralDBservices
    {
        public DBservicesTransportationLineHistory() : base()
        {

        }
        public int InsertTransportationLineHistory(TransportationLineHistory tlh)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateTransportation_LineHistoryInsertCommandWithStoredProcedure("SPproj_insertlinehistory", con, tlh);// create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        public List<TransportationLineHistory> GetTransportationLineHistory(int linecode)
    {

        SqlConnection con;
        SqlCommand cmd;
        List<TransportationLineHistory> tcu = new List<TransportationLineHistory>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = GetTransportationlineHistoryCommandWithStoredProcedure("SPproj_getTransportationLineHistory", con, linecode);             // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                TransportationLineHistory tc = new TransportationLineHistory();
                tc.Line_code = Convert.ToInt32(dataReader["line_code"]);
                tc.Time_of_start = Convert.ToDateTime(dataReader["time_of_start"]);
                tc.Time_of_end = Convert.ToDateTime(dataReader["time_of_end"]);
                tc.Comments = dataReader["comment"].ToString();

                tcu.Add(tc);
            }
            return tcu;

        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }




    private SqlCommand CreateTransportation_LineHistoryInsertCommandWithStoredProcedure(String spName, SqlConnection con, TransportationLineHistory tl)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@line_code", tl.Line_code);
            cmd.Parameters.AddWithValue("@time_of_start", tl.Time_of_start);
            cmd.Parameters.AddWithValue("@time_of_end", tl.Time_of_end);
            cmd.Parameters.AddWithValue("@comments", tl.Comments);


            return cmd;

        }





    private SqlCommand GetTransportationlineHistoryCommandWithStoredProcedure(String spName, SqlConnection con, int linecode)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@line_code", linecode);


        return cmd;
    }









}

