namespace final_proj.BL
{
    public class Student
    {
        private string stu_fullName;
        private string stu_id;
        private DateTime stu_dateofbirth;
        private string stu_grade;
        private string stu_school;
        private DateTime stu_dateOfPlacement;
        private string stu_disability;
        private string stu_comments;
        private List<Parent> parents;

        public Student() 
        {
        }
        public Student(string stu_fullName, string stu_id, DateTime stu_dateofbirth, string stu_grade, string stu_school, DateTime stu_dateOfPlacement, string stu_disability, string stu_comments)
        {
            Stu_fullName = stu_fullName;
            Stu_id = stu_id;
            Stu_dateofbirth = stu_dateofbirth;
            Stu_grade = stu_grade;
            Stu_school = stu_school;
            Stu_dateOfPlacement = stu_dateOfPlacement;
            Stu_disability = stu_disability;
            Stu_comments = stu_comments;
            Parents = new List<Parent>();
        }

        public string Stu_fullName { get => stu_fullName; set => stu_fullName = value; }
        public string Stu_id { get => stu_id; set => stu_id = value; }
        public DateTime Stu_dateofbirth { get => stu_dateofbirth; set => stu_dateofbirth = value; }
        public string Stu_grade { get => stu_grade; set => stu_grade = value; }
        public string Stu_school { get => stu_school; set => stu_school = value; }
        public DateTime Stu_dateOfPlacement { get => stu_dateOfPlacement; set => stu_dateOfPlacement = value; }
        public string Stu_disability { get => stu_disability; set => stu_disability = value; }
        public string Stu_comments { get => stu_comments; set => stu_comments = value; }
        public List<Parent> Parents { get => parents; set => parents = value; }

        public int Insert()//insert the complexed object : student and then parent/s
        {
            DBservicesStudent dbs = new DBservicesStudent();
            int res=dbs.InsertStudent(this);
            foreach (Parent p in this.Parents)
            {
                res += p.Insert(this.Stu_id);
            }
            return res;
        }

        public static List<Student> Read()
        {
            DBservicesStudent dbs = new DBservicesStudent();
            List<Student> students =  dbs.GetStudent();

            foreach (Student s in students) {
                s.Parents = dbs.FindStudentParents(s.Stu_id);
            }

            return students;
        }

        public int Update()
        {
            DBservicesStudent dbs = new DBservicesStudent();
            int res = dbs.UpdateStudent(this);
            foreach (Parent p in this.Parents)
            {
                res += p.Update();
            }
            return res;
        }


    }
}
