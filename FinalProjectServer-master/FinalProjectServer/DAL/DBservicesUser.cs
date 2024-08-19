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


public class DBservicesUser: GeneralDBservices
{
    public DBservicesUser():base()
    {
        
    }


    //The users are created automaticly on SQL when using 'insertescort','insertparent'

    public List< object> GetUserByDetails(User user)
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

        cmd = CreateCommandWithSPWithParameters("SPproj_GetUserByDetails", con, user);  // create the command


        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            List<object> o = new List<object>();
            object u = null;
            int checkrole = user.Role;
            //check who is the user and send all is data to the client
            while (dataReader.Read())
            {

                int Role = Convert.ToInt32(dataReader["Role"]);
                if (Role == 1)
                {
                    u = new { Role = Role };
                }
                else if (Role == 2)
                {
                    u = new
                    {
                        Role = Role,
                        Esc_id = dataReader["escort_id"].ToString(),
                        fullName = dataReader["full_name"].ToString(),
                        Cellphone = dataReader["cellphone"].ToString(),
                        InstitutionId = dataReader["institution_id"].ToString(),
                        Nameschool = dataReader["institution_name"].ToString(),
                        Principal = dataReader["principal"].ToString(),
                        PrincipalCellphone = dataReader["principal_cellphone"].ToString(),
                        SecretariatPhone = dataReader["secretariat_phone"].ToString(),
                        ContactPhone = dataReader["contact_phone"].ToString(),
                        AnotherContact = dataReader["another_contact"].ToString(),
                        Lat = Convert.ToDouble(dataReader["latschool"]),
                        Lng = Convert.ToDouble(dataReader["lngschool"]),
                        Comments = dataReader["comments"].ToString(),
                        Line_car = dataReader["car_type"].ToString(),
                        Line_code = int.Parse(dataReader["line_code"].ToString())
                    };
                }
                else if (Role == 3)
                {
                    u = new
                    {
                        Role = Role,
                        student_id = dataReader["stu_id"].ToString(),
                        fullNameparent = dataReader["fullname"].ToString(),
                        fullNamestudent = dataReader["stu_fullName"].ToString(),
                        Cellphone = dataReader["cellphone"].ToString(),
                        Nameschool = dataReader["institution_name"].ToString(),
                        Principal = dataReader["principal"].ToString(),
                        PrincipalCellphone = dataReader["principal_cellphone"].ToString(),
                        SecretariatPhone = dataReader["secretariat_phone"].ToString(),
                        ContactPhone = dataReader["contact_phone"].ToString(),
                        Lat = Convert.ToDouble(dataReader["latschool"]),
                        Lng = Convert.ToDouble(dataReader["lngschool"]),
                        Comments = dataReader["comments"].ToString(),
                        Line_car = dataReader["car_type"].ToString(),
                        Line_code = int.Parse(dataReader["line_code"].ToString())
                    };

                }
                else
                {
                    u = new { Role = Role };
                }
                o.Add(u);
                    //if role = -1
                }
            if (o.Count == 0)
            {
                {
                    u = new { Role = 2};
                }
                o.Add(u);
            }
            return o;
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

    private SqlCommand CreateCommandWithSPWithParameters(String spName, SqlConnection con, User user)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@username", user.UserName);

        cmd.Parameters.AddWithValue("@password", user.Password);

        return cmd;
    }

}

