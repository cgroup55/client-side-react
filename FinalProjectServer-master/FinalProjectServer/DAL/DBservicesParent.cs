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

public class DBservicesParent: GeneralDBservices
{
    public DBservicesParent():base()
    {
       
    }

    // This method Inserts a Parent to the Parent table 
    public int InsertParent(Parent parent,string stu_id)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB");
        }
        catch (Exception ex)
        {
            throw (ex);
        }

        cmd = CreateParentInsertCommandWithStoredProcedure("SPproj_InsertParent", con, parent, stu_id);

        try
        {
            int numEffected = cmd.ExecuteNonQuery();
            return numEffected;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }
        }
    }
    // This method get a Parent from the Parent table
    public List<Parent> GetParent()
    {
        SqlConnection con;
        SqlCommand cmd;
        List<Parent> parentList = new List<Parent>();

        try
        {
            con = connect("myProjDB");
        }
        catch (Exception ex)
        {
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("SPproj_GetParent", con);

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Parent parent = new Parent();
                parent.Stu_parentName = dataReader["fullname"].ToString();
                parent.Stu_parentCell = dataReader["cellphone"].ToString();
                parent.Stu_parentCity = dataReader["city"].ToString();
                parent.Stu_parentStreet = dataReader["street"].ToString();
                parent.Stu_parentHomeNum = Convert.ToInt32(dataReader["house_number"]);
                parent.Lat = Convert.ToDouble(dataReader["lat"]);
                parent.Lng = Convert.ToDouble(dataReader["lng"]);

                parentList.Add(parent);
            }
            return parentList;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }
        }
    }


    // This method Update a Parent from the Parent table
    public int UpdateParent(Parent parent)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB");
        }
        catch (Exception ex)
        {
            throw (ex);
        }

        cmd = UpdateParentCommandWithStoredProcedure("SPproj_UpdateParent", con, parent);

        try
        {
            int numEffected = cmd.ExecuteNonQuery();
            return numEffected;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }
        }
    }

  

    private SqlCommand CreateParentInsertCommandWithStoredProcedure(string spName, SqlConnection con, Parent parent,string stu_id)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = con;
        cmd.CommandText = spName;
        cmd.CommandTimeout = 10;
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@cellphone", parent.Stu_parentCell);
        cmd.Parameters.AddWithValue("@fullname", parent.Stu_parentName);
        cmd.Parameters.AddWithValue("@street", parent.Stu_parentStreet);
        cmd.Parameters.AddWithValue("@house_number", parent.Stu_parentHomeNum);
        cmd.Parameters.AddWithValue("@city", parent.Stu_parentCity);
        cmd.Parameters.AddWithValue("@lat", parent.Lat);
        cmd.Parameters.AddWithValue("@lng", parent.Lng);
        cmd.Parameters.AddWithValue("@stu_id", stu_id);

        return cmd;
    }

    private SqlCommand UpdateParentCommandWithStoredProcedure(string spName, SqlConnection con, Parent parent)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = con;
        cmd.CommandText = spName;
        cmd.CommandTimeout = 10;
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@cellphone", parent.Stu_parentCell);
        cmd.Parameters.AddWithValue("@fullname", parent.Stu_parentName);
        cmd.Parameters.AddWithValue("@street", parent.Stu_parentStreet);
        cmd.Parameters.AddWithValue("@house_number", parent.Stu_parentHomeNum);
        cmd.Parameters.AddWithValue("@city", parent.Stu_parentCity);
        cmd.Parameters.AddWithValue("@lat", parent.Lat);
        cmd.Parameters.AddWithValue("@lng", parent.Lng);
        return cmd;
    }


}

