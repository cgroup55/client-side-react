namespace final_proj.BL
{
    public class Escort
    {
        private string esc_id;
        private string esc_fullName;
        private DateTime esc_dateOfBirth;
        private string esc_cell;
        private string esc_city;
        private string esc_street;
        private int esc_homeNum;

        public Escort(string escId, string escFullName, DateTime escDateOfBirth, string escCell, string escCity, string escStreet, int escHomeNum)
        {
            Esc_id = escId;
            Esc_fullName = escFullName;
            Esc_dateOfBirth = escDateOfBirth;
            Esc_cell = escCell;
            Esc_city = escCity;
            Esc_street = escStreet;
            Esc_homeNum = escHomeNum;
        }

        public Escort() { }

        public string Esc_id { get => esc_id; set => esc_id = value; }
        public string Esc_fullName { get => esc_fullName; set => esc_fullName = value; }
        public DateTime Esc_dateOfBirth { get => esc_dateOfBirth; set => esc_dateOfBirth = value; }
        public string Esc_cell { get => esc_cell; set => esc_cell = value; }
        public string Esc_city { get => esc_city; set => esc_city = value; }
        public string Esc_street { get => esc_street; set => esc_street = value; }
        public int Esc_homeNum { get => esc_homeNum; set => esc_homeNum = value; }


        public int Insert()
        {
            DBservicesEscort dbs = new DBservicesEscort();
            return dbs.InsertEscort(this);
        }

        public static List<Escort> Read()
        {
            DBservicesEscort dbs = new DBservicesEscort();
            return dbs.GetEscort();
        }

        public int Delete(string dd)
        {
            DBservicesEscort dbs = new DBservicesEscort();
            return dbs.DeleteEscort(dd);
        }

        public int Update()
        {
            DBservicesEscort dbs = new DBservicesEscort();
            return dbs.UpdateEscort(this);
        }
    }
}