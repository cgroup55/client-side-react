using final_proj.DAL;

namespace final_proj.BL
{
    public class Student_disabilities_type
    { 
        private string typeCode;
        private string typeDescription;

        public Student_disabilities_type(string typeCode, string typeDescription)
        {
            TypeCode = typeCode;
            TypeDescription = typeDescription;
        }

        public Student_disabilities_type() { }

        public string TypeCode { get => typeCode; set => typeCode = value; }
        public string TypeDescription { get => typeDescription; set => typeDescription = value; }



        public static List<Student_disabilities_type> Read()
        {
            DBservicesStudent_disabilities_type dbs = new DBservicesStudent_disabilities_type();
            return dbs.GetStudent_disabilities_type();
        }
    }

}
