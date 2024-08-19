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

/// <summary>
/// </summary>
public class DBservicesEducationalInstitution: GeneralDBservices
{

    public DBservicesEducationalInstitution():base()
    {
       
    }

   
    

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a EducationalInstitution to the EducationalInstitution table 
    //--------------------------------------------------------------------------------------------------
    public int InsertEducationalInstitution(EducationalInstitution ed)
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

        cmd = CreateEducationalInstitutionInsertCommandWithStoredProcedure("SPproj_InsertEducationalInstitution", con, ed);        // create the command

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
    // This method get a EducationalInstitution from the EducationalInstitution table

    public List<EducationalInstitution> GetEducationalInstitutions()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<EducationalInstitution> edlist = new List<EducationalInstitution>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("SPproj_GetEducationalInstitution", con);             // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                EducationalInstitution edu = new EducationalInstitution();
                edu.InstitutionId = dataReader["institution_id"].ToString();
                edu.Street = dataReader["street"].ToString();
                edu.HouseNumber = Convert.ToInt32(dataReader["house_number"]);
                edu.City = dataReader["city"].ToString();
                edu.Principal = dataReader["principal"].ToString();
                edu.PrincipalCellphone = dataReader["principal_cellphone"].ToString();
                edu.SecretariatPhone = dataReader["secretariat_phone"].ToString();
                edu.SecretariatMail = dataReader["secretariat_mail"].ToString();
                edu.AnotherContact = dataReader["another_contact"].ToString();
                edu.ContactPhone = dataReader["contact_phone"].ToString();
                edu.Name = dataReader["institution_name"].ToString();
                edu.Lat = Convert.ToDouble(dataReader["latschool"]);
                edu.Lng = Convert.ToDouble(dataReader["lngschool"]);

                edlist.Add(edu);
            }
            return edlist;

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
    // This method Delete a EducationalInstitution from the EducationalInstitution table

    public int DeleteEducation(string institution_id)
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

        cmd = DeleteEducationalInstitutionCommandWithStoredProcedure("SPproj_DeleteEducationalInstitution", con, institution_id);        // create the command

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
    // This method Update a EducationalInstitution from the EducationalInstitution table


    public int insertUpdateEducation(EducationalInstitution edu)
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

        cmd = UpdateEducationalInstitutionInsertCommandWithStoredProcedure("SPproj_UpdateEducationalInstitution", con, edu);        // create the command

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
    // Create EducationalInstitution SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------

    private SqlCommand DeleteEducationalInstitutionCommandWithStoredProcedure(String spName, SqlConnection con, string institution_id)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@institution_id", institution_id);


        return cmd;
    }





    private SqlCommand CreateEducationalInstitutionInsertCommandWithStoredProcedure(String spName, SqlConnection con, EducationalInstitution ed)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@institution_id", ed.InstitutionId);
        cmd.Parameters.AddWithValue("@street", ed.Street);
        cmd.Parameters.AddWithValue("@house_number", ed.HouseNumber);
        cmd.Parameters.AddWithValue("@city", ed.City);
        cmd.Parameters.AddWithValue("@principal", ed.Principal);
        cmd.Parameters.AddWithValue("@principal_cellphone", ed.PrincipalCellphone);
        cmd.Parameters.AddWithValue("@secretariat_phone", ed.SecretariatPhone);
        cmd.Parameters.AddWithValue("@secretariat_mail", ed.SecretariatMail);
        cmd.Parameters.AddWithValue("@another_contact", ed.AnotherContact);
        cmd.Parameters.AddWithValue("@contact_phone", ed.ContactPhone);
        cmd.Parameters.AddWithValue("@institution_name", ed.Name);
        cmd.Parameters.AddWithValue("@latschool", ed.Lat);
        cmd.Parameters.AddWithValue("@lngschool", ed.Lng);


        return cmd;
    }

    private SqlCommand UpdateEducationalInstitutionInsertCommandWithStoredProcedure(String spName, SqlConnection con, EducationalInstitution ed)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@institution_id", ed.InstitutionId);
        cmd.Parameters.AddWithValue("@street", ed.Street);
        cmd.Parameters.AddWithValue("@house_number", ed.HouseNumber);
        cmd.Parameters.AddWithValue("@city", ed.City);
        cmd.Parameters.AddWithValue("@principal", ed.Principal);
        cmd.Parameters.AddWithValue("@principal_cellphone", ed.PrincipalCellphone);
        cmd.Parameters.AddWithValue("@secretariat_phone", ed.SecretariatPhone);
        cmd.Parameters.AddWithValue("@secretariat_mail", ed.SecretariatMail);
        cmd.Parameters.AddWithValue("@another_contact", ed.AnotherContact);
        cmd.Parameters.AddWithValue("@contact_phone", ed.ContactPhone);
        cmd.Parameters.AddWithValue("@institution_name", ed.Name);
        cmd.Parameters.AddWithValue("@latschool", ed.Lat);
        cmd.Parameters.AddWithValue("@lngschool", ed.Lng);

        return cmd;
    }

}