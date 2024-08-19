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

public class DBservicesStudent: GeneralDBservices
{
    public DBservicesStudent():base()
    {
        
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a Student to the Student table 
    //--------------------------------------------------------------------------------------------------


    public int InsertStudent(Student student)
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

        cmd = CreateStudentInsertCommandWithStoredProcedure("SPproj_InsertStudent", con, student);

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

    public List<Student> GetStudent()
    {
        SqlConnection con;
        SqlCommand cmd;
        List<Student> studentList = new List<Student>();

        try
        {
            con = connect("myProjDB");
        }
        catch (Exception ex)
        {
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("SPproj_GetStudent", con);

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Student student = new Student();
                student.Stu_fullName = dataReader["stu_fullName"].ToString();
                student.Stu_id = dataReader["stu_id"].ToString();
                student.Stu_dateofbirth = Convert.ToDateTime(dataReader["stu_dateofbirth"]);
                student.Stu_grade = dataReader["stu_grade"].ToString();
                student.Stu_school = dataReader["stu_school"].ToString();
                student.Stu_dateOfPlacement = Convert.ToDateTime(dataReader["Stu_dateOfPlacement"]);
                student.Stu_disability = dataReader["stu_disability"].ToString();
                student.Stu_comments = dataReader["stu_comments"].ToString();
                studentList.Add(student);
            }



            return studentList;
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


    // this method returns the parent/s of a specific student from the student table through the connections on the connectionTable "ParentOfStudent".

    public List<Parent> FindStudentParents(string stu_id)
    {
        SqlConnection con;
        SqlCommand cmd;
        List<Parent> parents = new List<Parent>();

        try
        {
            con = connect("myProjDB");
        }
        catch (Exception ex)
        {
            throw (ex);
        }

        try
        {

            cmd = FindStudentParentProc("FindMyParents", con, stu_id);

            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Parent p = new Parent();
                p.Stu_parentCell = dataReader["cellphone"].ToString();
                p.Stu_parentName = dataReader["fullname"].ToString();
                p.Stu_parentCity = dataReader["city"].ToString();
                p.Stu_parentStreet = dataReader["street"].ToString();
                p.Stu_parentHomeNum = Convert.ToInt32(dataReader["house_number"]);
                p.Lng = Convert.ToDouble(dataReader["lng"]);
                p.Lat = Convert.ToDouble(dataReader["lat"]);
                parents.Add(p);
            }

            return parents;
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
    // This method Update a Student from the Student table


    public int UpdateStudent(Student student)
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

        cmd = UpdateStudentCommandWithStoredProcedure("SPproj_UpdateStudent", con, student);

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
    private SqlCommand UpdateStudentCommandWithStoredProcedure(string spName, SqlConnection con, Student student)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = con;
        cmd.CommandText = spName;
        cmd.CommandTimeout = 10;
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@stu_fullName", student.Stu_fullName);
        cmd.Parameters.AddWithValue("@stu_id", student.Stu_id);
        cmd.Parameters.AddWithValue("@stu_dateofbirth", student.Stu_dateofbirth);
        cmd.Parameters.AddWithValue("@stu_grade", student.Stu_grade);
        cmd.Parameters.AddWithValue("@stu_school", student.Stu_school);
        cmd.Parameters.AddWithValue("@stu_dateOfPlacement", student.Stu_dateOfPlacement);
        cmd.Parameters.AddWithValue("@stu_disability", student.Stu_disability);
        cmd.Parameters.AddWithValue("@stu_comments", student.Stu_comments);
        return cmd;
    }

    private SqlCommand FindStudentParentProc(string spName, SqlConnection con, string id)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = con;
        cmd.CommandText = spName;
        cmd.CommandTimeout = 10;
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@stu_id", id);

        return cmd;
    }

    private SqlCommand CreateStudentInsertCommandWithStoredProcedure(string spName, SqlConnection con, Student student)
    {
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = con;
        cmd.CommandText = spName;
        cmd.CommandTimeout = 10;
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@stu_fullName", student.Stu_fullName);
        cmd.Parameters.AddWithValue("@stu_id", student.Stu_id);
        cmd.Parameters.AddWithValue("@stu_dateofbirth", student.Stu_dateofbirth);
        cmd.Parameters.AddWithValue("@stu_grade", student.Stu_grade);
        cmd.Parameters.AddWithValue("@stu_school", student.Stu_school);
        cmd.Parameters.AddWithValue("@stu_dateOfPlacement", student.Stu_dateOfPlacement);
        cmd.Parameters.AddWithValue("@stu_disability", student.Stu_disability);
        cmd.Parameters.AddWithValue("@stu_comments", student.Stu_comments);
        return cmd;
    }


}
