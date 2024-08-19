using final_proj.BL;
using System.Data;
using System.Data.SqlClient;

namespace final_proj.DAL
{
    public class DBservicesStudent_disabilities_type: GeneralDBservices
    {
        public DBservicesStudent_disabilities_type():base()
        {
           
        }

        public List<Student_disabilities_type> GetStudent_disabilities_type()

        {
            SqlConnection con;
            SqlCommand cmd;
            List<Student_disabilities_type> disabilitiesTypeList = new List<Student_disabilities_type>();

            try
            {
                con = connect("myProjDB");
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            cmd = CreateCommandWithSPWithoutParameters("SPproj_GetStudentType", con);

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Student_disabilities_type disabilitiesType = new Student_disabilities_type();
                    disabilitiesType.TypeCode = dataReader["type_code"].ToString();
                    disabilitiesType.TypeDescription = dataReader["type_description"].ToString();

                    disabilitiesTypeList.Add(disabilitiesType);
                }
                return disabilitiesTypeList;
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
        


    }
}
