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


public class DBservicesTransportation_company: GeneralDBservices
{

    public DBservicesTransportation_company():base()
    {
        
    }

    public int InsertTransportationCompany(TransportationCompany tc)
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

        cmd = CreateTransportationCompanyInsertCommandWithStoredProcedure("SPproj_InsertTransportationCompany", con, tc);        // create the command

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
    // This method get a TransportationCompany from the TransportationCompany table

    public List<TransportationCompany> GetTransportationCompanies()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<TransportationCompany> tcu = new List<TransportationCompany>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("SPproj_GetTransportationCompany", con);             // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                TransportationCompany tc = new TransportationCompany();
                tc.Company_Code = dataReader["company_code"].ToString();
                tc.Company_Name = dataReader["company_name"].ToString();
                tc.Company_Email = dataReader["company_mail"].ToString();
                tc.Company_Phone = dataReader["office_phone"].ToString();
                tc.Manager_Name = dataReader["manager_name"].ToString();
                tc.Manager_Phone = dataReader["manager_phone"].ToString();
                tc.Company_Street = dataReader["street"].ToString();
                tc.Company_HomeNum = Convert.ToInt32(dataReader["house_number"]);
                tc.Company_City = dataReader["city_name"].ToString();
                tc.Company_Comments = dataReader["comment"].ToString();

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
    public int DeleteTransportationCompany(string TransportationCompany_id)
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

        cmd = DeleteTransportationCompanyCommandWithStoredProcedure("SPproj_DeleteTransportationCompany", con, TransportationCompany_id);        // create the command

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
    public int UpdateTransportationCompany(TransportationCompany tcu)
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

        cmd = UpdateTransportationCompanyCommandWithStoredProcedure("SPproj_UpdateTransportationCompany", con, tcu);        // create the command

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

    //---------------------------------------------------------------------------------
    // Create TransportationCompany SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------

    private SqlCommand DeleteTransportationCompanyCommandWithStoredProcedure(String spName, SqlConnection con, string TransportationCompany_id)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@company_code", TransportationCompany_id);


        return cmd;
    }


    private SqlCommand CreateTransportationCompanyInsertCommandWithStoredProcedure(String spName, SqlConnection con, TransportationCompany tc)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@company_code", tc.Company_Code);
        cmd.Parameters.AddWithValue("@company_name", tc.Company_Name);
        cmd.Parameters.AddWithValue("@company_mail", tc.Company_Email);
        cmd.Parameters.AddWithValue("@office_phone", tc.Company_Phone);
        cmd.Parameters.AddWithValue("@manager_name", tc.Manager_Name);
        cmd.Parameters.AddWithValue("@manager_phone", tc.Manager_Phone);
        cmd.Parameters.AddWithValue("@street", tc.Company_Street);
        cmd.Parameters.AddWithValue("@house_number", tc.Company_HomeNum);
        cmd.Parameters.AddWithValue("@city_name", tc.Company_City);
        cmd.Parameters.AddWithValue("@comment", tc.Company_Comments);


        return cmd;
    }

    private SqlCommand UpdateTransportationCompanyCommandWithStoredProcedure(String spName, SqlConnection con, TransportationCompany tc)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@company_code", tc.Company_Code);
        cmd.Parameters.AddWithValue("@company_name", tc.Company_Name);
        cmd.Parameters.AddWithValue("@company_mail", tc.Company_Email);
        cmd.Parameters.AddWithValue("@office_phone", tc.Company_Phone);
        cmd.Parameters.AddWithValue("@manager_name", tc.Manager_Name);
        cmd.Parameters.AddWithValue("@manager_phone", tc.Manager_Phone);
        cmd.Parameters.AddWithValue("@street", tc.Company_Street);
        cmd.Parameters.AddWithValue("@house_number", tc.Company_HomeNum);
        cmd.Parameters.AddWithValue("@city_name", tc.Company_City);
        cmd.Parameters.AddWithValue("@comment", tc.Company_Comments);

        return cmd;
    }


}